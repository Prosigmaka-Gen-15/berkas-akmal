// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateValue,
  reducers: {
    addItemToCart(state, action) {
      // state.push(action.payload);
      const isProductExist = state.find((product) => action.payload.id == product.id);
      if (!isProductExist) {
        alert('Barang berhasil di tambahkan');
        return [...state, action.payload];
      } else {
        alert('Barang sudah ada di keranjang');
      }
    },
    updateItemInCart(state, action) {
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
    removeItemFromCart(state, action) {
      // hapus berdasarkan id
      const itemId = action.payload;
      const index = state.findIndex((item) => item.id === itemId);
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
