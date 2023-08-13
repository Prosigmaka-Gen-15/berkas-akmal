// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MainLayout from './layout/MainLayout';
import AdminPage from './pages/AdminPage';
// import CreateProductForm from './component/Form/CreateProductForm';
import Form from './component/Form/Form';
import ListProduct from './component/Form/ListProduct';
import axios from 'axios';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import PrivateRoutes from './component/route/privateRoutes';
import GuestRoutes from './component/route/GuestRoutes';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/product/:id' element={<AboutPage />} />
          <Route element={<GuestRoutes />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<AdminPage />}>
              <Route index element={<ListProduct />} />
              <Route path='form/:productId?' element={<Form />} />
              <Route path='checkout' element={<CheckoutPage />} />
              <Route path='cart' element={<CartPage />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
