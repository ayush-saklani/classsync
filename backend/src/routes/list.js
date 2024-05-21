import { Router } from "express";
import { get_list, save_list } from "../controllers/listController.js";

const router = Router();

router.get("/get-list", get_list);
router.post("/save-list", save_list);

export default router;
