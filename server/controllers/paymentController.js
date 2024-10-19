// src/controllers/paymentController.js
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config()


const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr', // Change this as needed
        });
        return res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
