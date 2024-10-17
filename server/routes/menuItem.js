import express from 'express';
import upload from '../config/multerConfig.js';
import { createMenuItem, deleteMenuItem, getMenuItemById, getMenuItems, updateMenuItem } from '../controllers/menuItem.js';


const menuItemRoutes = express.Router();

// Routes
menuItemRoutes.post('/add-menuItem', upload.single('image'), createMenuItem);
menuItemRoutes.get('/', getMenuItems);
menuItemRoutes.get('/:id', getMenuItemById);
menuItemRoutes.put('/:id', upload.single('image'), updateMenuItem);
menuItemRoutes.delete('/:id', deleteMenuItem);

export default menuItemRoutes;
