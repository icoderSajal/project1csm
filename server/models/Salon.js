
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const salonSchema = new mongoose.Schema({
    salon_name: { type: String, required: true },
    services: [serviceSchema],
    opening_time: { type: Date, required: true },
    closing_time: { type: Date, required: true },
    specialist_haircut: { type: String },
    specialist_manicure: { type: String },
}, { timestamps: true });

export default mongoose.model("Salon", salonSchema);

