// src/routes/orderRoutes.js
import express from 'express';
import { createOrder, getAllOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/create-order', createOrder);
orderRouter.get('/getAllOrder',getAllOrders)

export default orderRouter;
