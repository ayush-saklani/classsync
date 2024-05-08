import Tables from "../models/tablemodel.js";

const get_timetable = async (req, res, next) => {
    const course_name = req.query.course;
    const semester = req.query.semester;
    const section = req.query.section;

    const schedule = await Tables.findOne({
        course: course_name,
        semester: semester,
        section: section,
    });

    res.status(200).json(schedule);
};

const post_teachertable = async (req, res, next) => {
    const course_name = req.body.course;
    const semester = req.body.semester;
    const section = req.body.section;
    const teacher_table = req.body.teacher_subject_data;

    await Tables.findOneAndUpdate(
        {
            course: course_name,
            semester: semester,
            section: section,
        },
        {
            $set: {
                teacher_subject_data: teacher_table,
            },
        }
    );

    res.status(200).json({ message: "success" });
};

export { get_timetable, post_teachertable };
