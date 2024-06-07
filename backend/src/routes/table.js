import { Router } from "express";
import {
    get_timetable,
    post_teachertable,
    save_timetable,
} from "../controllers/tableController.js";

const router = Router();

router.get("/get-timetable", get_timetable);
router.post("/post-teachertable", post_teachertable);
router.post("/save-timetable", save_timetable);

export default router;
