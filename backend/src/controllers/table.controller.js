import Tables from "../models/table.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { startSession } from "mongoose";
import Rooms from "../models/room.model.js";
import Faculties from "../models/faculty.model.js";

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const timeSlots = ['08-09', '09-10', '10-11', '11-12', '12-01', '01-02', '02-03', '03-04', '04-05', '05-06'];

const get_timetable = asyncHandler(async (req, res, next) => {
    const course_name = req.query.course;
    const semester = req.query.semester;
    const section = req.query.section;
    if (!course_name || !semester || !section) {
        throw new ApiError(400, "Missing one or more required parameters");
    }
    const timetable = await Tables.findOne({
        course: course_name,
        semester: semester,
        section: section,
    });

    if (!timetable) {
        throw new ApiError(404, "Timetable not found");
    }

    res.status(200).json(new ApiResponse(200, timetable));
});

const post_teachertable = asyncHandler(async (req, res, next) => {
    const course_name = req.body.course;
    const semester = req.body.semester;
    const section = req.body.section;
    const teacher_subject_data = req.body.teacher_subject_data;

    const update_table = await Tables.findOneAndUpdate(
        {
            course: course_name,
            semester: semester,
            section: section,
        },
        {
            $set: {
                teacher_subject_data: teacher_subject_data,
            },
        }
    );

    if (!update_table) {
        throw new ApiError(
            404,
            "no matching course, semester and section found"
        );
    }
    res.status(200).json(new ApiResponse(200, "Teacher table updated"));
});

const save_timetable_editor_automation = asyncHandler(async (req, res, next) => {
    const course_name = req.body.course;
    const semester = req.body.semester;
    const section = req.body.section;
    const schedule = req.body.schedule;
    const teacher_table = req.body.teacher_subject_data;

    const session = await startSession();
    session.startTransaction();
    try {
        const section_data = await Tables.findOne({
            course: course_name,
            semester: semester,
            section: section,
        }).session(session);

        if (!section_data) {
            await session.abortTransaction();
            session.endSession();
            throw new ApiError(404, "no matching course, semester and section found");
        }

        const roomList = await Rooms.find({ allowed_course: { $all: course_name }, }).session(session);
        const facultyData = await Faculties.find().session(session);

        let newSchedule = JSON.parse(JSON.stringify(schedule));
        let oldSchedule = section_data.schedule;
        let newRoomList = JSON.parse(JSON.stringify(roomList));
        let newFacultyData = JSON.parse(JSON.stringify(facultyData));

        // === Phase 1: Remove previous section/subject/teacher assignments ===
        for (const dayvar of days) {
            for (const slot of timeSlots) {
                const day = dayvar.toLocaleLowerCase();
                const cell = oldSchedule[day][slot];
                const subjectCode = cell.subjectcode;
                const roomId = cell.class_id;

                // Remove section from room schedule
                if (roomId !== '0') {
                    const room = newRoomList.find(r => r.roomid === roomId);
                    if (room) {
                        const roomSchedule = room.schedule[day][slot];
                        if (roomSchedule.section.length > 0) {
                            if (roomSchedule.section.length === 1 && roomSchedule.section.includes(section)) {
                                roomSchedule.course = "";
                                roomSchedule.semester = "";
                                roomSchedule.subjectcode = "";
                                roomSchedule.teacherid = "";
                                roomSchedule.section = [];
                            } else if (roomSchedule.section.length > 1) {
                                roomSchedule.section = roomSchedule.section.filter(sec => sec !== section);
                            }
                        }
                    }
                }

                // Remove section from faculty schedule
                if (subjectCode !== '') {
                    const teacherId = teacher_table.find(t => t.subjectcode === subjectCode)?.teacherid;
                    if (teacherId) {
                        const faculty = newFacultyData.find(f => f.teacherid === teacherId);
                        if (faculty) {
                            const teacherSchedule = faculty.schedule[day][slot];
                            if (teacherSchedule.section.length > 0) {
                                if (teacherSchedule.section.length === 1 && teacherSchedule.section.includes(section)) {
                                    teacherSchedule.section = [];
                                    teacherSchedule.subjectcode = "";
                                    teacherSchedule.course = "";
                                    teacherSchedule.semester = "";
                                    teacherSchedule.roomid = [];
                                } else if (teacherSchedule.section.length > 1) {
                                    teacherSchedule.section = teacherSchedule.section.filter(sec => sec !== section);
                                }
                            }
                        }
                    }
                }
            }
        }
        // === Phase 2: Add new assignments for this section ===
        for (const dayvar of days) {
            for (const slot of timeSlots) {
                const day = dayvar.toLocaleLowerCase();
                const cell = newSchedule[day][slot];
                const subjectCode = cell.subjectcode;
                const roomId = cell.class_id;

                // Assign section to room schedule
                if (roomId !== '0') {
                    const room = newRoomList.find(r => r.roomid === roomId);
                    if (room) {
                        const roomSchedule = room.schedule[day][slot];
                        if (roomSchedule.section.length === 0) {
                            roomSchedule.teacherid = teacher_table.find(x => x.subjectcode === subjectCode)?.teacherid || "";
                            roomSchedule.subjectcode = subjectCode;
                            roomSchedule.section = [section];
                            roomSchedule.semester = semester;
                            roomSchedule.course = course_name;
                        } else if (!roomSchedule.section.includes(section)) {
                            roomSchedule.section.push(section);
                        }
                    }
                }

                // Assign section to faculty schedule
                if (subjectCode !== '') {
                    const teacherId = teacher_table.find(t => t.subjectcode === subjectCode)?.teacherid;
                    if (teacherId) {
                        const faculty = newFacultyData.find(f => f.teacherid === teacherId);
                        if (faculty) {
                            const teacherSchedule = faculty.schedule[day][slot];
                            if (teacherSchedule.section.length === 0) {
                                teacherSchedule.section = [section];
                                teacherSchedule.subjectcode = subjectCode;
                                teacherSchedule.course = course_name;
                                teacherSchedule.semester = semester;
                                teacherSchedule.roomid = [roomId];
                            } else if (!teacherSchedule.section.includes(section)) {
                                teacherSchedule.section.push(section);
                            }
                        }
                    }
                }
            }
        }

        // Save or update timetable as before
        await Tables.findOneAndUpdate(
            {
                course: course_name,
                semester: semester,
                section: section,
            },
            {
                $set: {
                    schedule: newSchedule,
                    teacher_subject_data: teacher_table,
                },
            },
            { session }
        );
        for (const room of newRoomList) {
            await Rooms.findOneAndUpdate(
                { roomid: room.roomid },
                { $set: { schedule: room.schedule } },
                { session }
            );
        }
        for (const faculty of newFacultyData) {
            await Faculties.findOneAndUpdate(
                { teacherid: faculty.teacherid },
                { $set: { schedule: faculty.schedule } },
                { session }
            );
        }
        await session.commitTransaction();
        session.endSession();
        const updatedtimetable = await Tables.findOne({ course: course_name, semester: semester, section: section, });
        const updatedrooms = await Rooms.find({ allowed_course: { $all: course_name }, });
        const updatedfaculty = await Faculties.find();
        res.status(200).json(
            new ApiResponse(200,
                {
                    schedule: updatedtimetable.schedule,
                    teacher_subject_data: updatedtimetable.teacher_subject_data,
                    updatedRooms: updatedrooms,
                    updatedFaculty: updatedfaculty
                },
                "time table updated successfully"
            )
        );
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
});

const save_timetable = asyncHandler(async (req, res, next) => {
    const course_name = req.body.course;
    const semester = req.body.semester;
    const section = req.body.section;
    const schedule = req.body.schedule;
    const teacher_table = req.body.teacher_subject_data;

    const section_data = await Tables.findOne({
        course: course_name,
        semester: semester,
        section: section,
    });
    if (section_data) {
        await Tables.findOneAndUpdate(
            {
                course: course_name,
                semester: semester,
                section: section,
            },
            {
                $set: {
                    schedule: schedule,
                    teacher_subject_data: teacher_table,
                },
            }
        );
        res.status(200).json(
            new ApiResponse(200, "time table updated succefully")
        );
    } else {
        const new_section_data = await Tables.create({
            course: course_name,
            semester: semester,
            section: section,
            schedule: schedule,
            teacher_subject_data: teacher_table,
        });
        await new_section_data.save();
        res.status(201).json(
            new ApiResponse(
                201,
                "time table of new section created successfully"
            )
        );
    }
});

const removetable = asyncHandler(async (req, res, next) => {
    const course_name = req.body.course;
    const semester = req.body.semester;
    const section = req.body.section;

    await Tables.findOneAndDelete({
        course: course_name,
        semester: semester,
        section: section,
    });

    res.status(200).json({
        success: true,
        message: "faculty deleted successfully",
    });
});

export { get_timetable, post_teachertable, save_timetable, removetable, save_timetable_editor_automation };