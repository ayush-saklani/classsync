import express from "express";
const router = express.Router();

import tableRouter from "./table.js";
import listRouter from "./list.js";
import facultyRouter from "./faculty.js";

router.use("/table", tableRouter);
router.use("/list", listRouter);
router.use("/faculty", facultyRouter);

export default router;
