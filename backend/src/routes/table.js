import { Router } from "express";
import {
    get_timetable,
    post_teachertable,
    save_timetable,
} from "../controllers/tableController.js";
import { verifyJWT } from "../middleware/authmiddleware.js";

const router = Router();

router.get("/get-timetable", get_timetable);

// secured routes
router.post("/post-teachertable", verifyJWT, post_teachertable);
router.post("/save-timetable", verifyJWT, save_timetable);

export default router;
