// models/PartyBooking.js
import mongoose from "mongoose";

const partyBookingSchema = new mongoose.Schema(
    {
        hall_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PartyHall",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,

            ref: "User",
            required: true
        },
        selected_services: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ],

        date: { type: String, required: true },
        time: { type: String, required: true },

    },
    { timestamps: true }
);

export default mongoose.model("PartyBooking", partyBookingSchema);


