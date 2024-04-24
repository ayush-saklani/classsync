import data from "../assets/structured_timetable.json" assert { type: "json" };
const get_timetable = async (req, res, next) => {
  console.log(req.query);
  const course_name = req.query.course;
  const semester = req.query.semester;
  const section = req.query.section;

  const time_table = data.courses[course_name][semester][section];
  res.status(200).json(time_table);
};

export { get_timetable };
