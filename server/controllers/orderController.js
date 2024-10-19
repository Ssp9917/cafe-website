// src/controllers/orderController.js
import Order from '../models/orderModel.js';

// Function to create a new order
export const createOrder = async (req, res) => {
    const { transactionId, price, quantity, status, itemName, cartItems } = req.body;

    try {
        const order = new Order({
            transactionId,
            price,
            quantity,
            status,
            itemName,
            cartItems,
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// get all order function
export const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}