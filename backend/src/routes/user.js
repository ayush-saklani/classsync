import { Router } from "express";
import { addUser } from "../controllers/userController.js";

const router = Router();

router.post("/add", addUser);

export default router;
