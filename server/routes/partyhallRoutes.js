import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import { createPartyHall, getAllPartyHalls, getSinglePartyHall, updatePartyHall, deletePartyHall } from '../controller/partyHallController.js';
const router = express.Router();

router.post('/add', authMiddleware, createPartyHall);
router.get('/', authMiddleware, getAllPartyHalls);
router.get('/:id', authMiddleware, getSinglePartyHall);
router.put('/:id', authMiddleware, updatePartyHall);
router.delete('/:id', authMiddleware, deletePartyHall);

export default router;



