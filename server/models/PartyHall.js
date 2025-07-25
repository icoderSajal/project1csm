

import mongoose from "mongoose";

const amenitiesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const partyHallSchema = new mongoose.Schema({
    hall_name: { type: String, required: true },
    amenities: [amenitiesSchema],

    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("PartyHall", partyHallSchema);


