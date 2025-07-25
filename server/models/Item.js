import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Foodmenu', required: true },
  menu_name: { type: String, required: true },
  item_name: { type: String, required: true },
  item_price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
