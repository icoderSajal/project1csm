import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema(
    {
        club_name: { type: String, required: true },
        services: { type: [String], required: true },
        opening_time: { type: String, required: true },
        closing_time: { type: String, required: true },
        specialist_trainer1: { type: String },
        specialist_trainer2: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Fitness", fitnessSchema);
