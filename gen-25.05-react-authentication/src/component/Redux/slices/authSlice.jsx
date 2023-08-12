import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  user: {
    id: '',
    email: '',
    username: '',
  },
};

function getStroedAuthState() {
  const storedToken = localStorage.getItem('token');
  const storedUserString = localStorage.getItem('user');

  if (storedToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
    return {
      token: storedToken,
      user: JSON.parse(storedUserString),
    };
  }
  return { ...initialState };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getStroedAuthState,
  reducers: {
    // Setiap kali user login, akan jalan dan di simpan di local storage
    // Ingin menambahkan fungsi sync cart ketika user login
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    },
    setUser(state, action) {
      const { id, email, username } = action.payload;
      state.user.id = id;
      state.user.email = email;
      state.user.username = username;
      // Ingin menambahkan cart
      localStorage.setItem('user', JSON.stringify({ id, email, username }));
    },
    // Jalan ketika user logout
    resetAuthData() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      return { ...initialState };
    },
  },
});

export const { setToken, setUser, resetAuthData } = authSlice.actions;
export default authSlice.reducer;
