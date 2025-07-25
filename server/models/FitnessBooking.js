import mongoose from "mongoose";

const fitnessBookingSchema = new mongoose.Schema({
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fitness",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    selected_services: {
        type: [String],
        required: true,
    },
    membership_type: {
        type: String,
        enum: ["Silver", "Gold", "Platinum"],
        required: true,
    },
    membership_fee: {
        type: Number,
        required: true,
    },
    booking_date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model("FitnessBooking", fitnessBookingSchema);
