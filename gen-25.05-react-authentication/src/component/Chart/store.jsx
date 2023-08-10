import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

const chart = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default chart;
