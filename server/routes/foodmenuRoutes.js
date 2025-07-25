

import authMiddleware from "../middleware/authMiddleware.js";
import { addFoodMenu, getfoodMenu, editfoodMenu, updatefoodMenu, deletefoodMenu } from "../controller/foodMenuController.js"

import express from "express";


const router = express.Router();

//Post || Create
router.post("/addmenu", authMiddleware, addFoodMenu)

router.get("/", authMiddleware, getfoodMenu);
router.post("/add", authMiddleware, addFoodMenu);
router.get("/:id", authMiddleware, editfoodMenu);
router.put("/:id", authMiddleware, updatefoodMenu);
router.delete("/:id", authMiddleware, deletefoodMenu);


export default router;