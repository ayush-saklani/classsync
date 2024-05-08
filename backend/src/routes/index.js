import express from "express";
const router = express.Router();

import tableRouter from "./table.js";
import listRouter from "./list.js";

router.use("/table", tableRouter);
router.use("/list", listRouter);

export default router;
