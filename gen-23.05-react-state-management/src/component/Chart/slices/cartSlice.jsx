// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateValue,
  reducers: {
    addItemToCart(state, action) {
      // state.push(action.payload);
      return [...state, action.payload];
    },
    removeItemFromCart(state, action) {
      // hapus berdasarkan id
      const itemId = action.payload;
      const index = state.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        if (confirm('Apakah anda yakin ingin menghapus barang berikut?')) {
          state.splice(index, 1); // hapus item
        }
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
