import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
// cartReducer
const chart = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default chart;
