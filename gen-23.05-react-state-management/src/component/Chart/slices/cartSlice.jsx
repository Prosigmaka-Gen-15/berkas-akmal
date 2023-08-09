// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState: [{ value: initialStateValue }],
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
