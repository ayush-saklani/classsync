import { Router } from "express";
import {
    get_subjecttable,
    save_subjecttable,
    update_subjecttable,
} from "../controllers/subjecttableController.js";

const router = Router();

router.get("/get", get_subjecttable);
router.post("/save", save_subjecttable);
router.get("/update", update_subjecttable);

export default router;
