import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    star_cast: {
        type: [String],
        required: true,
    },
    ticket_price: {
        silver: { type: Number, required: true },
        gold: { type: Number, required: true },
        platinum: { type: Number, required: true },
    },
    show_times: {
        type: [String], // can change to [Date] if show time includes time
        default: [],
    }
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
