import { Router } from "express";
import {
    get_timetable,
    post_teachertable,
    save_timetable,
    save_generic_teachertable,
} from "../controllers/tableController.js";

const router = Router();

router.get("/get-timetable", get_timetable);
router.post("/post-teachertable", post_teachertable);
router.post("/save-timetable", save_timetable);
router.post("/save-generic-teachertable", save_generic_teachertable);

export default router;
