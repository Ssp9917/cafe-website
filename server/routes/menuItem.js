import express from 'express';
import upload from '../config/multerConfig.js';
import { createMenuItem, deleteMenuItem, getMenuItemById, getMenuItems, updateMenuItem } from '../controllers/menuItem.js';


const menuItemRoutes = express.Router();

// Routes
menuItemRoutes.post('/addMenuItem', upload.single('image'), createMenuItem);
menuItemRoutes.get('/getAllMenuItem', getMenuItems);
menuItemRoutes.get('/getSingleMenuItem/:id', getMenuItemById);
menuItemRoutes.put('/updateMenuItem/:id', upload.single('image'), updateMenuItem);
menuItemRoutes.delete('/deleteMenuItem/:id', deleteMenuItem);

export default menuItemRoutes;
