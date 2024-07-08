import { Router } from "express";
import {
    getAll,
    getSpecified,
    saveRoom,
    removeRoom,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/getall", getAll);
router.get("/get", getSpecified);

// secured routes
router.post("/save", verifyJWT, saveRoom);
router.delete("/remove", verifyJWT, removeRoom);

export default router;
