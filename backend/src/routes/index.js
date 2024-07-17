import express from "express";
const router = express.Router();

import tableRouter from "./table.js";
import roomRouter from "./room.js";
import facultyRouter from "./faculty.js";
import subjecttableRouter from "./subjecttable.js";
import userRouter from "./user.js";

router.use("/table", tableRouter);
router.use("/room", roomRouter);
router.use("/faculty", facultyRouter);
router.use("/subjecttable", subjecttableRouter);
router.use("/user", userRouter);

export default router;
