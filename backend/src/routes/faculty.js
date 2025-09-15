import { Router } from "express";
import {
    getall,
    addfaculty,
    removefaculty,
    resetFromSection,
    updatefaculties,
    getspecified,
    updateone,
} from "../controllers/faculty.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/get", getspecified);
router.get("/getall", getall);

// secured routes
router.get("/add", verifyJWT, addfaculty);
router.get("/reset", verifyJWT, resetFromSection);
router.delete("/remove", verifyJWT, removefaculty);
router.post("/update", verifyJWT, updatefaculties);
router.post("/updateOne", verifyJWT, updateone);

export default router;
