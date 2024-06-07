import { Router } from "express";
import {
    getall,
    addfaculty,
    removefaculty,
    updatefaculties,
} from "../controllers/facultyController.js";

const router = Router();

router.get("/getall", getall);
router.get("/add", addfaculty);
router.delete("/remove", removefaculty);
router.post("/update", updatefaculties);

export default router;
