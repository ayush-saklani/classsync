import { Router } from "express";
import {
    getall,
    addfaculty,
    removefaculty,
    updatefaculties,
    getspecified,
} from "../controllers/facultyController.js";

const router = Router();

router.post("/get", getspecified);
router.get("/getall", getall);
router.get("/add", addfaculty);
router.delete("/remove", removefaculty);
router.post("/update", updatefaculties);

export default router;
