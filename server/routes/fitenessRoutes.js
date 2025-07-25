import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import { createClub, getAllClubs, updateClub, deleteClub, getsignleClub } from '../controller/fitnessController.js';
const router = express.Router();

router.post('/add', authMiddleware, createClub);
router.get('/', authMiddleware, getAllClubs);
router.get('/:id', authMiddleware, getsignleClub);
router.put('/:id', authMiddleware, updateClub);
router.delete('/:id', authMiddleware, deleteClub);

export default router;



