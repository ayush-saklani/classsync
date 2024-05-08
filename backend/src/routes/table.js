import { Router } from "express";
import {
    get_timetable,
    post_teachertable,
} from "../controllers/tableController.js";

const router = Router();

router.get("/get-timetable", get_timetable);
router.post("/post-teachertable", post_teachertable);

export default router;
