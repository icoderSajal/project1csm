import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import { createItem, getAllItems, updateItem, deleteItem } from '../controller/itemController.js';
const router = express.Router();

router.post('/add', authMiddleware, createItem);
router.get('/', authMiddleware, getAllItems);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

export default router;