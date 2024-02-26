import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem(state, action) {
      state.carts.push(action.payload);
    },
    incQuantity(state, action) {
      const item = state.carts.find((cart) => cart.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decQuantity(state, action) {
      const item = state.carts.find((cart) => cart.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    deleteItem(state, action) {
      state.carts = state.carts.filter((cart) => cart.id !== action.payload);
    },
  },
});

export const { addItem, incQuantity, decQuantity, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;

//
//
export const getCarts = (state) => state.carts.carts;

export const getTotalPrice = (state) =>
  state.carts.carts.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getTotalCart = (state) =>
  state.carts.carts.reduce((acc, curr) => acc + curr.quantity, 0);
