
import express from 'express';
import { createBooking, getBookingsByUser, getAllBookings } from "../controller/salonBookingController.js"
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/booking', authMiddleware, createBooking);
router.get('/user/:userId', authMiddleware, getBookingsByUser);
router.get('/', authMiddleware, getAllBookings)

export default router;
