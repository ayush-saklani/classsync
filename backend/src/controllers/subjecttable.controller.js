import Tables from "../models/table.model.js";
import SubjectTable from "../models/subjecttable.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const get_subjecttable = asyncHandler(async (req, res, next) => {
    const course_name = req.query.course;
    const semester = req.query.semester;
    if (!course_name || !semester) {
        throw new ApiError(400, "Missing one or more required parameters");
    }
    const subjecttable = await SubjectTable.findOne({
        course: course_name,
        semester: semester,
    });

    if (!subjecttable) {
        throw new ApiError(404, "Subject table not found");
    }

    res.status(200).json(new ApiResponse(200, subjecttable));
});

const save_subjecttable = asyncHandler(async (req, res, next) => {
    const course_name = req.body.course;
    const semester = req.body.semester;
    const teacher_subject_data = req.body.teacher_subject_data;

    const check_table = await SubjectTable.findOne({
        course: course_name,
        semester: semester,
    });

    if (check_table) {
        await SubjectTable.findOneAndUpdate(
            {
                course: course_name,
                semester: semester,
            },
            {
                $set: {
                    teacher_subject_data: teacher_subject_data,
                },
            }
        );

        res.status(200).json(
            new ApiResponse(
                200,
                "Subject table already exists!! updated successfully"
            )
        );
    } else {
        const new_subjecttable = await SubjectTable.create({
            course: course_name,
            semester: semester,
            teacher_subject_data: teacher_subject_data,
        });
        await new_subjecttable.save();
        res.status(200).json(
            new ApiResponse(200, "Subject table created successfully")
        );
    }
});

const update_subjecttable = asyncHandler(async (req, res, next) => {
    const course_name = req.query.course;
    const semester = req.query.semester;

    const data = await SubjectTable.findOne({
        course: course_name,
        semester: semester,
    }).select("teacher_subject_data");

    if (data === null) {
        throw new ApiError(
            404,
            "no generic table with matching course and semester found"
        );
    }

    const all_updates = await Tables.updateMany(
        {
            course: course_name,
            semester: semester,
        },
        {
            $set: {
                teacher_subject_data: data.teacher_subject_data,
            },
        }
    );

    if (all_updates.acknowledged === false) {
        if (all_updates.matchedCount === 0) {
            throw new ApiError(
                404,
                "no section with matching course and semester found"
            );
        } else {
            throw new ApiError(404, "unable to update");
        }
    }
    res.status(200).json(
        new ApiResponse(
            200,
            `${all_updates.modifiedCount} table(s) updated successfully`
        )
    );
});

export { get_subjecttable, save_subjecttable, update_subjecttable };
