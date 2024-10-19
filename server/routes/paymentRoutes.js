// src/routes/paymentRoutes.js
import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';

const paymentRoutes = express.Router();

paymentRoutes.post('/create-payment-intent', createPaymentIntent);

export default paymentRoutes;
