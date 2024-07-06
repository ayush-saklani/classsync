import { Router } from "express";
import {
    get_timetable,
    post_teachertable,
    save_timetable,
    removetable,
} from "../controllers/table.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/get-timetable", get_timetable);

// secured routes
router.post("/post-teachertable", verifyJWT, post_teachertable);
router.post("/save-timetable", verifyJWT, save_timetable);
router.delete("/remove", verifyJWT, removetable);

export default router;
