import MenuItem from '../models/menuItem.js'; 
import path from 'path';

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { recipeName, category, price, recipeDetails } = req.body;
    const image = req.file ? req.file.path : null; // Get image path from multer

    const newMenuItem = new MenuItem({
      recipeName,
      category,
      price,
      recipeDetails,
      image,
    });

    await newMenuItem.save();
    res.status(201).json({ message: 'Menu item created successfully!', menuItem: newMenuItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item', error });
  }
};

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu item', error });
  }
};

// Update a menu item by ID
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedData = req.body;
    if (req.file) {
      updatedData.image = req.file.path; // Update image if a new one is uploaded
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item updated successfully!', menuItem: updatedMenuItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};

// Delete a menu item by ID
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};
