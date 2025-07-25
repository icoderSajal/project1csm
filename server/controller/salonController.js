import Salon from "../models/Salon.js"

// Create Salon
export const createSalon = async (req, res) => {
    try {
        const salon = await Salon.create(req.body);
        res.status(201).json({ success: true, salon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Salons
export const getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.find();
        res.status(200).json({ success: true, salons });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Salon
export const getSingleSalon = async (req, res) => {
    try {
        const salon = await Salon.findById(req.params.id);
        if (!salon) return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, salon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Salon
export const updateSalon = async (req, res) => {
    try {
        const salon = await Salon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!salon) return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, salon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteSalon = async (req, res) => {
    try {
        const deleted = await Salon.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }
        res.status(200).json({ success: true, message: "Salon deleted successfully" });
    } catch (error) {
        console.error("Delete Salon Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};