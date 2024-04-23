const get_timetable = async (req, res, next) => {
  console.log(req.query);
  res.status(200).json({
    status: "success",
    message: "fetched tt",
  });
};

export { get_timetable };
