import { Router } from "express";
import {
    getall,
    addfaculties,
    updatefaculties,
} from "../controllers/facultyController.js";

const router = Router();

router.get("/getall", getall);
router.post("/add", addfaculties);
router.post("/update", updatefaculties);

export default router;
