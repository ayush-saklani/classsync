import { Router } from "express";
import {
    get_subjecttable,
    save_subjecttable,
    update_subjecttable,
} from "../controllers/subjecttableController.js";
import { verifyJWT } from "../middleware/authmiddleware.js";

const router = Router();

router.get("/get", get_subjecttable);

// secured routes
router.post("/save", verifyJWT, save_subjecttable);
router.get("/update", verifyJWT, update_subjecttable);

export default router;
