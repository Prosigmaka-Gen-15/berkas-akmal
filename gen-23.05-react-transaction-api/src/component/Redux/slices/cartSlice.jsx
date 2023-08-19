// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateValue,
  reducers: {
    // Tidak digunakan
    addItemToCart(state, action) {
      const isProductExist = state.find(
        (product) => action.payload.productDetailId == product.productDetailId,
      );
      if (!isProductExist) {
        return [...state, action.payload];
      } else {
        console.log('Barang sudah ada di keranjang');
      }
    },
    // Tidak digunakan
    updateItemInCart(state, action) {
      // Belum Dipakai
      return state.map((item) =>
        // asd
        item.productDetailId === action.payload.productDetailId
          ? { ...item, ...action.payload }
          : item,
      );
    },
    removeItemFromCart(state, action) {
      // hapus berdasarkan id
      const itemId = action.payload;
      const index = state.findIndex((item) => item.productDetailId === itemId);
      if (index !== -1) {
        if (confirm('Apakah anda yakin?')) {
          state.splice(index, 1); // hapus item
        }
      }
    },
    removeAllItemFromCart() {
      return [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
