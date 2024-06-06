import Faculties from "../models/facultymodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GENERIC_TEACHER_SCHEDULE } from "../constants.js";

const getall = asyncHandler(async (req, res, next) => {
    const allfacultylist = await Faculties.find();

    if (allfacultylist) {
        res.status(200).json(new ApiResponse(200, allfacultylist, "success"));
    } else {
        throw new ApiError(404, "Error fetching data");
    }
});

const addfaculties = asyncHandler(async (req, res, next) => {
    const facultyList = req.body.facultyList;
    facultyList.forEach(async (faculty) => {
        const check_faculty = await Faculties.findOne({
            teacherid: faculty.teacherid,
        });

        if (check_faculty === null) {
            const new_faculty = await Faculties.create({
                teacherid: faculty.teacherid,
                name: faculty.name,
                schedule: GENERIC_TEACHER_SCHEDULE,
            });
            await new_faculty.save();
        } else {
            // TODO::-> if teacher already exists give a reponse
            // of existing doc to user
        }
    });

    res.status(200).json({
        success: true,
        message: "faculties added successfully",
    });
});

const updatefaculties = asyncHandler(async (req, res, next) => {
    const facultyList = req.body.facultyList;

    facultyList.forEach(async (faculty) => {
        const faculty_name = faculty.name;
        const faculty_id = faculty.teacherid;
        const schedule = faculty.schedule;

        await Faculties.findOneAndUpdate(
            {
                name: faculty_name,
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

export { getall, addfaculties, updatefaculties };
