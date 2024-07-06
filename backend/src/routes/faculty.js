import { Router } from "express";
import {
    getall,
    addfaculty,
    removefaculty,
    updatefaculties,
    getspecified,
} from "../controllers/facultyController.js";
import { verifyJWT } from "../middleware/authmiddleware.js";

const router = Router();

router.post("/get", getspecified);
router.get("/getall", getall);

// secured routes
router.get("/add", verifyJWT, addfaculty);
router.delete("/remove", verifyJWT, removefaculty);
router.post("/update", verifyJWT, updatefaculties);

export default router;
