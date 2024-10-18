// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
    increaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
