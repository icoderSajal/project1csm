import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addemployee,
  upload,
  getallemployees,
  getEmployee,
  updateEmployee,
  getEmployeeByDepId,
} from "../controller/employeeController.js";
const router = express.Router();
router.get("/", authMiddleware, getallemployees);
router.get("/:id", authMiddleware, getEmployee);
router.get("/department/:id", authMiddleware, getEmployeeByDepId);
router.post("/add", authMiddleware, upload.single("image"), addemployee);
router.put("/:id", authMiddleware, updateEmployee);

export default router;
