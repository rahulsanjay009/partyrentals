import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Reducers/CartReducer";
import { saveState, loadState } from "./localStorage";

// Load the state from localStorage
const preloadedState = loadState();

export const Store = configureStore({
  reducer: {
    CartReducer: CartReducer
  },
  preloadedState, 
});

Store.subscribe(() => {
  saveState(Store.getState());
});
