
import Foodmenu from "../models/Foodmenu.js"

// GET all food menus
export const getfoodMenu = async (req, res) => {
    try {
        const menus = await Foodmenu.find();
        return res.status(200).json({ success: true, menus });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// POST create a new menu
export const addFoodMenu = async (req, res) => {
    try {
        const { fooodmenu_name, description } = req.body;

        if (!fooodmenu_name || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMenu = new Foodmenu({ fooodmenu_name, description });
        await newMenu.save();

        return res.status(201).json({ success: true, message: "Menu added successfully", menu: newMenu });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// GET one menu by ID
export const editfoodMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Foodmenu.findById(id);

        if (!menu) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        return res.status(200).json({ success: true, menu });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// PUT update menu by ID
export const updatefoodMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { fooodmenu_name, description } = req.body;

        if (!fooodmenu_name || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const updatedMenu = await Foodmenu.findByIdAndUpdate(
            id,
            { fooodmenu_name, description },
            { new: true, runValidators: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        return res.status(200).json({ success: true, message: "Menu updated successfully", menu: updatedMenu });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// DELETE a menu by ID
export const deletefoodMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Foodmenu.findById(id);

        if (!menu) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        await menu.deleteOne();
        return res.status(200).json({ success: true, message: "Menu deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

