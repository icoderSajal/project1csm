// routes/bookingRoutes.js
import express from "express";
import { bookTicket, getUserBookings, getAllBookings } from "../controller/bookingController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
// POST: Book a ticket
router.post("/book", authMiddleware, bookTicket);
// GET: Get all bookings by user
router.get("/:id", authMiddleware, getUserBookings);
router.get("/", authMiddleware, getAllBookings);

export default router;
