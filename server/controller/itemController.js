import Item from "../models/Item.js";

export const createItem = async (req, res) => {
    try {
        const { menu_id, menu_name, item_name, item_price } = req.body;
        if (!menu_id || !menu_name || !item_name || !item_price) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }
        const item = new Item({ menu_id, menu_name, item_name, item_price });
        await item.save();
        res.status(201).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
