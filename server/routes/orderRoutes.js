import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import { createOrder, getOrdersByUserId, getAllUserOrders, getCateringOrders, getOrdersByMenuId } from '../controller/orderController.js';
const router = express.Router();

router.post('/add', authMiddleware, createOrder);
router.get("/:userId", authMiddleware, getOrdersByUserId);
router.get("/", authMiddleware, getAllUserOrders);
router.get("/catering", authMiddleware, getCateringOrders)
// GET /api/orders/menu/:menuId
router.get("/menu/:menuId", authMiddleware, getOrdersByMenuId);

export default router;