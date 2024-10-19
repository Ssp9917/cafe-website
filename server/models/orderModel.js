// src/models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    itemName: {
        type: [String],
        required: true,
    },
    cartItems: {
        type: [String], // Assuming you are storing item IDs
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
