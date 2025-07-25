
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import {
    createSalon,
    getAllSalons,
    getSingleSalon,
    updateSalon, deleteSalon
} from "../controller/salonController.js"

const router = express.Router();

router.post("/add", authMiddleware, createSalon);
router.get("/", authMiddleware, getAllSalons);
router.get("/:id", authMiddleware, getSingleSalon);
router.put("/:id", authMiddleware, updateSalon);
router.delete('/:id', authMiddleware, deleteSalon);

export default router;



