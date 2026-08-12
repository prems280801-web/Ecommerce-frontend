import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");

const initialState = {
  items: storedCart ? JSON.parse(storedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;