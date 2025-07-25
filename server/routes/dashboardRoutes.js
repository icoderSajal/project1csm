import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSummary,
  countEmployeesByDepartment,
  getallTasks,
} from "../controller/dashboardController.js";

const router = express.Router();

router.get("/summary", authMiddleware, getSummary);
router.get("/employee-summary", authMiddleware, getallTasks);

router.get(
  "/employees-by-department",

  countEmployeesByDepartment
);

export default router;
