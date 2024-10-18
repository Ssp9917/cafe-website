// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from '../../utility/localstorage';

const initialState = {
  items:  loadCartFromLocalStorage(),
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
      saveCartToLocalStorage(state.items); 
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      saveCartToLocalStorage(state.items); 
    },
    increaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
      saveCartToLocalStorage(state.items); 
    },
    decreaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      }
      saveCartToLocalStorage(state.items); 
    },
  },
});

export const { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
