import { Router } from "express";
import { get_list, save_list } from "../controllers/list.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/get-list", get_list);

// secured routes
router.post("/save-list", verifyJWT, save_list);

export default router;
