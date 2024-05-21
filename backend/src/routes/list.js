import { Router } from "express";
import {
    get_rooms,
    get_faculties,
    get_subjects,
    save_list,
} from "../controllers/listController.js";

const router = Router();

router.get("/get-rooms", get_rooms);
router.get("/get-faculties", get_faculties);
router.get("/get-subjects", get_subjects);
router.post("/save-list", save_list);

export default router;
