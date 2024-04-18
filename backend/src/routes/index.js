import express from "express";
const router = express.Router();

import tableRouter from "./table.js";

router.use("/table", tableRouter);

export default router;
