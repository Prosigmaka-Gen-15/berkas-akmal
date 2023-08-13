import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

const chart = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default chart;
