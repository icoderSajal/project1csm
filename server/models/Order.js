// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            item_name: String,
            item_price: Number,
            quantity: Number,
        },
    ],
    total_amount: {
        type: Number,
        required: true,
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    payment_id: String,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
