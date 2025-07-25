

import mongoose from "mongoose";

const bookingSalonSchema = new mongoose.Schema({
    salon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // You can change this if you don't have a User model
        required: true,
    },
    selected_services: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    appointment_date: {
        type: String, // Format: "YYYY-MM-DD"
        required: true,
    },
    slot: {
        type: String, // Format: "HH:mm"
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("BookingSalon", bookingSalonSchema);
