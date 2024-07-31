import Tables from "../models/table.model.js";
import Rooms from "../models/room.model.js";
import Faculties from "../models/faculty.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const clearFromTimetable = async (
    course,
    semester,
    section,
    teacherid,
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

    if (table.teacher_subject_data.length === 0) {
        throw new ApiError(404, "Timetable not found");
    }

    table.schedule[day][slot] = {
        class_id: "0",
        subjectcode: "",
        slotdata: "",
    };

    table.teacher_subject_data.forEach((subject) => {
        if (subject.teacherid === teacherid) {
            subject.teacherid = "0";
            subject.teachername = "";
        }
    });

    table.save();
};
const clearFromRoom = async (room, day, slot) => {
    room.schedule[day][slot] = {
        course: "",
        semester: "",
        section: [],
        teacherid: "0",
        subjectcode: "",
    };

    room.save();
};

const iterateTimetable = async (facultyTable, teacherid) => {
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

    const timetable = facultyTable.schedule;

    days.forEach((day) => {
        timeSlots.forEach(async (slot) => {
            const slotInfo = timetable[day][slot];
            if (slotInfo.course) {
                const room = await Rooms.findOne({
                    roomid: slotInfo.roomid,
                });
                clearFromRoom(room, day, slot);

                slotInfo.section.forEach((section) => {
                    clearFromTimetable(
                        slotInfo.course,
                        slotInfo.semester,
                        section,
                        teacherid,
                        day,
                        slot
                    );
                });
            }
        });
    });
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
        teacherid: teacherid,
        name: name,
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
        iterateTimetable(faculty, teacherid);
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

export { getall, addfaculty, removefaculty, updatefaculties, getspecified };
