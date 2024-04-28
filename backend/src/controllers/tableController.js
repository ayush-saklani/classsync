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

export { get_timetable };
