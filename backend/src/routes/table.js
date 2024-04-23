import { Router } from "express";
import { get_timetable } from "../controllers/tableController.js";

const router = Router();

router.get("/get-timetable", get_timetable);

export default router;
