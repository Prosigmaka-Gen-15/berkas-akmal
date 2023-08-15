// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateValue,
  reducers: {
    addItemToCart(state, action) {
      const isProductExist = state.find((product) => action.payload.productId == product.productId);
      if (!isProductExist) {
        return [...state, action.payload];
      } else {
        alert('Barang sudah ada di keranjang');
      }
    },
    updateItemInCart(state, action) {
      // Belum Dipakai
      return state.map((item) =>
        // asd
        item.productId === action.payload.productId ? { ...item, ...action.payload } : item,
      );
    },
    removeItemFromCart(state, action) {
      // hapus berdasarkan id
      const itemId = action.payload;
      const index = state.findIndex((item) => item.productId === itemId);
      if (index !== -1) {
        if (confirm('Apakah anda yakin?')) {
          state.splice(index, 1); // hapus item
        }
      }
    },
    removeAllItemFromCart() {
      return [];
    },
    // incrementQuantity(state, action){

    // }
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
