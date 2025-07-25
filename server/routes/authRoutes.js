import express from "express";
import {
  Login,
  Logout,
  Register,
  verify,
} from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/verify", authMiddleware, verify);
router.post("/logout", Logout);

export default router;
