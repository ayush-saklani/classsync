import { Router } from "express";
import {
    getAll,
    saveRoom,
    saveMultipleRooms,
    removeRoom,
    removeAllRooms,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/getall", getAll);

// secured routes
router.post("/save", verifyJWT, saveRoom);
router.post("/savemultiple", verifyJWT, saveMultipleRooms);
router.delete("/remove", verifyJWT, removeRoom);
router.delete("/removeall", verifyJWT, removeAllRooms);

export default router;
