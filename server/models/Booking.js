// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    movie_name: String,
    show_time: String,
    category: {
        type: String,
        enum: ["silver", "gold", "platinum"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    booked_at: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Booking", bookingSchema);
