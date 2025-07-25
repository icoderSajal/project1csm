// controllers/partyHallController.js
import PartyHall from "../models/PartyHall.js";

export const createPartyHall = async (req, res) => {
    try {
        const hall = await PartyHall.create(req.body);
        res.status(201).json({ success: true, hall });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllPartyHalls = async (req, res) => {
    try {
        const halls = await PartyHall.find();
        res.status(200).json({ success: true, halls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

};

export const getSinglePartyHall = async (req, res) => {
    try {
        const hall = await PartyHall.findById(req.params.id);
        if (!hall) return res.status(404).json({ success: false, message: "Hall not found" });
        res.status(200).json({ success: true, hall });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePartyHall = async (req, res) => {
    try {
        const hall = await PartyHall.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hall) return res.status(404).json({ success: false, message: "Salon not found" });
        res.status(200).json({ success: true, hall });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePartyHall = async (req, res) => {
    try {
        const deleted = await PartyHall.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }
        res.status(200).json({ success: true, message: "PartyvHall deleted successfully" });
    } catch (error) {
        console.error("Delete Salon Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
