// routes/partyBookingRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { createPartyBooking, getUserPartyBookings, getAllPartyBookings } from "../controller/partyBookingController.js";
const router = express.Router();
router.post("/booking", authMiddleware, createPartyBooking);
router.get("/:userId", authMiddleware, getUserPartyBookings);
router.get("/", authMiddleware, getAllPartyBookings);
export default router;
