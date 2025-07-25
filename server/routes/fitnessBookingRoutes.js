// routes/fitnessBookingRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { createFitnessBooking, getBookingsByUserId, getAllClubsBooking } from "../controller/fitnessBookingController.js";

const router = express.Router();

router.post("/add", authMiddleware, createFitnessBooking);
router.get("/:userId", authMiddleware, getBookingsByUserId);
router.get("/", authMiddleware, getAllClubsBooking)

export default router;
