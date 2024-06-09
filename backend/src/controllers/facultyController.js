import Faculties from "../models/facultymodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GENERIC_TEACHER_SCHEDULE } from "../constants.js";

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

    await Faculties.findOneAndDelete({
        teacherid: teacherid,
    });
    res.status(200).json({
        success: true,
        message: "faculty deleted successfully",
    });
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
    res.status(200).json({
        success: true,
        message: "faculties updated successfully",
    });
});

export { getall, addfaculty, removefaculty, updatefaculties, getspecified };
