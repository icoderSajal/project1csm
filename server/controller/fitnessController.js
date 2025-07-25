
import Fitness from "../models/Fitness.js";

export const createClub = async (req, res) => {
    try {
        const newClub = new Fitness(req.body);
        const savedClub = await newClub.save();
        res.status(201).json({ success: true, message: "Salon created", clubs: savedClub });
    } catch (error) {
        console.error("Create Salon Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllClubs = async (req, res) => {
    try {
        const clubs = await Fitness.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, clubs });
    } catch (error) {
        console.error("Fetch Salon Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}






export const deleteClub = async (req, res) => {
    try {
        const deleted = await Fitness.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }
        res.status(200).json({ success: true, message: "Salon deleted successfully" });
    } catch (error) {
        console.error("Delete Salon Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


/**
 * @route   GET /api/salon/:id
 * @desc    Get a single salon by ID
 */
export const getsignleClub = async (req, res) => {
    try {
        const club = await Fitness.findById(req.params.id);
        if (!club) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }
        res.status(200).json({ success: true, club });
    } catch (error) {
        console.error("Get Single Club Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateClub = async (req, res) => {
    try {
        const updatedClub = await Fitness.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedClub) {
            return res.status(404).json({ success: false, message: "Salon not found" });
        }

        res.status(200).json({ success: true, message: "Salon updated", clus: updatedClub });
    } catch (error) {
        console.error("Update Salon Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
