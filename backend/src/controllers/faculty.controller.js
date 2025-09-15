import Tables from "../models/table.model.js";
import Rooms from "../models/room.model.js";
import Faculties from "../models/faculty.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GENERIC_TEACHER_SCHEDULE } from "../constants.js";
const clearFromTimetable = async (
    course,
    semester,
    section,
    subjectcode,
    day,
    slot
) => {
    const table = await Tables.findOne({
        course: course,
        semester: semester,
        section: section,
    });

    if (!table) {
        throw new ApiError(404, "Timetable not found");
    }

    console.log(table.schedule[day][slot].subjectcode, subjectcode);

    if (table.schedule[day][slot].subjectcode === subjectcode) {
        table.schedule[day][slot] = {
            class_id: "0",
            subjectcode: "",
            slotdata: "",
        };
    }

    table.save();
};

const clearTeacherSubjectData = async (
    teacherid,
    course,
    semester,
    section,
    subjectcode
) => {
    const table = await Tables.findOne({
        course: course,
        semester: semester,
        section: section,
    });

    if (!table) {
        throw new ApiError(404, "Timetable not found");
    }
    table.teacher_subject_data.forEach((subject) => {
        if (
            subject.teacherid === teacherid &&
            subject.subjectcode === subjectcode
        ) {
            subject.teacherid = "0";
            subject.teachername = "";
        }
    });
    table.save();
};

const clearFromRoom = async (roomid, day, slot, removeCalled, reqSection) => {
    const room = await Rooms.findOne({ roomid: roomid });

    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    let roomSlot = room.schedule[day][slot];
    if (
        removeCalled ||
        (roomSlot.section.length === 1 && roomSlot.section.includes(reqSection))
    ) {
        roomSlot = {
            course: "",
            semester: "",
            section: [],
            teacherid: "0",
            subjectcode: "",
        };
    } else {
        roomSlot.section = roomSlot.section.filter((section) => {
            return section !== reqSection;
        });
    }
    await Rooms.updateOne(
        { roomid: roomid },
        { $set: { [`schedule.${day}.${slot}`]: roomSlot } }
    );
};

const iterateTimetable = async (
    facultyTable,
    reqteacherid,
    removeCalled,
    reqSection,
    reqCourse,
    reqSemester,
    reqSubjectcode
) => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const timeSlots = [
        "08-09",
        "09-10",
        "10-11",
        "11-12",
        "12-01",
        "01-02",
        "02-03",
        "03-04",
        "04-05",
        "05-06",
    ];

    await clearTeacherSubjectData(
        reqteacherid,
        reqCourse,
        reqSemester,
        reqSection,
        reqSubjectcode
    );

    for (const day of days) {
        for (const slot of timeSlots) {
            let slotInfo = facultyTable.schedule[day][slot];
            if (
                (removeCalled && slotInfo.course) ||
                (!removeCalled &&
                    slotInfo.course === reqCourse &&
                    slotInfo.semester === reqSemester)
            ) {
                await clearFromRoom(
                    slotInfo.roomid,
                    day,
                    slot,
                    removeCalled,
                    reqSection
                );

                if (removeCalled) {
                    for (const section of slotInfo.section) {
                        await clearFromTimetable(
                            slotInfo.course,
                            slotInfo.semester,
                            section,
                            slotInfo.subjectcode,
                            day,
                            slot
                        );
                    }
                    facultyTable.schedule[day][slot] = {
                        course: "",
                        semester: "",
                        section: [],
                        roomid: [],
                        subjectcode: "",
                    };
                } else {
                    await clearFromTimetable(
                        slotInfo.course,
                        slotInfo.semester,
                        reqSection,
                        reqSubjectcode,
                        day,
                        slot
                    );
                    if (
                        slotInfo.section.includes(reqSection) &&
                        slotInfo.section.length === 1
                    ) {
                        facultyTable.schedule[day][slot] = {
                            course: "",
                            semester: "",
                            section: [],
                            roomid: [],
                            subjectcode: "",
                        };
                    } else {
                        facultyTable.schedule[day][slot].section =
                            slotInfo.section.filter(
                                (section) => section !== reqSection
                            );
                    }
                }
                facultyTable.markModified(`schedule.${day}.${slot}`);
            }
        }
    }
    console.log("Modified paths:", facultyTable.modifiedPaths());

    // Save the changes to the database
    try {
        await facultyTable.save();
        console.log("Faculty table saved successfully");
    } catch (error) {
        console.error("Error saving faculty table:", error);
    }
};

const getspecified = asyncHandler(async (req, res, next) => {
    const facultyList = req.body.facultyList;
    if (facultyList === undefined) {
        throw new ApiError(400, "Missing required facultyList parameter");
    }

    const aggregationPipeline = [
        {
            $match: {
                teacherid: { $in: facultyList },
            },
        },
    ];

    const result = await Faculties.aggregate(aggregationPipeline);
    if (result.length === 0) {
        throw new ApiError(404, "No teachers found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            result,
            `${result.length} teacher(s) found and returned successfully!`
        )
    );
});

const getall = asyncHandler(async (req, res, next) => {
    const allfacultylist = await Faculties.find();

    if (allfacultylist) {
        res.status(200).json(new ApiResponse(200, allfacultylist, "success"));
    } else {
        throw new ApiError(404, "Error fetching data");
    }
});

const addfaculty = asyncHandler(async (req, res, next) => {
    const teacherid = req.query.teacherid;
    const name = req.query.name;
    const check_faculty = await Faculties.findOne({
        teacherid: teacherid
    });

    if (check_faculty === null) {
        const new_faculty = await Faculties.create({
            teacherid: teacherid,
            name: name,
            schedule: GENERIC_TEACHER_SCHEDULE,
        });
        await new_faculty.save();
    } else {
        throw new ApiError(403, "Teacher already exists");
    }

    res.status(200).json({
        success: true,
        message: "faculty added successfully",
    });
});

const removefaculty = asyncHandler(async (req, res, next) => {
    const teacherid = req.query.teacherid;

    const faculty = await Faculties.findOne({
        teacherid: teacherid,
    });

    if (faculty === null) {
        throw new ApiError(404, "No such teacher exists");
    }

    try {
        // iterateTimetable(faculty, teacherid, true); //
        await Faculties.findByIdAndDelete(faculty._id);
    } catch (error) {
        new ApiError(500, error.message);
    }

    res.status(200).json(new ApiResponse(200, "faculty deleted successfully"));
});

const updatefaculties = asyncHandler(async (req, res, next) => {
    const facultyList = req.body.facultyList;

    facultyList.forEach(async (faculty) => {
        const faculty_id = faculty.teacherid;
        const schedule = faculty.schedule;

        await Faculties.findOneAndUpdate(
            {
                teacherid: faculty_id,
            },
            {
                $set: {
                    schedule: schedule,
                },
            }
        );
    });
    res.status(200).json(new ApiResponse(200, "faculty updated successfully"));
});

const updateone = asyncHandler(async (req, res, next) => {
    const faculty = req.body;
    await Faculties.findOneAndUpdate(
        {
            teacherid: faculty.teacherid,
        },
        {
            $set: {
                name: faculty.name,
                schedule: faculty.schedule,
            },
        }
    );
    res.status(200).json(new ApiResponse(200, "faculty updated successfully"));
});

const resetFromSection = asyncHandler(async (req, res, next) => {
    const teacherid = req.query.teacherid;
    const section = req.query.section;
    const course = req.query.course;
    const semester = req.query.semester;
    const subjectcode = req.query.subjectcode;

    if (!teacherid || !section || !course || !semester || !subjectcode) {
        throw new ApiError(400, "Missing one or more required parameters");
    }

    const faculty = await Faculties.findOne({
        teacherid: teacherid,
    });

    if (faculty === null) {
        throw new ApiError(404, "No such teacher exists");
    }

    try {
        iterateTimetable(
            faculty,
            teacherid,
            false,
            section,
            course,
            semester,
            subjectcode
        );
    } catch (error) {
        new ApiError(500, error.message);
    }
    res.status(200).json(new ApiResponse(200, "faculty reset successful"));
});

export {
    getall,
    addfaculty,
    removefaculty,
    updatefaculties,
    updateone,
    getspecified,
    resetFromSection,
};
