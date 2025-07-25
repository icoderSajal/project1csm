import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getSata, showReports } from "../controller/adminreportController.js";
const router = express.Router();

router.post("/show", authMiddleware, showReports);

router.get("/get", authMiddleware, getSata);

export default router;
