import { Router } from "express";
import {
    addUser,
    loginUser,
    logoutUser,
} from "../controllers/userController.js";
import { verifyJWT } from "../middleware/authmiddleware.js";

const router = Router();

router.post("/add", addUser);
router.post("/login", loginUser);

// secured routes
router.post("/logout", verifyJWT, logoutUser);

export default router;
