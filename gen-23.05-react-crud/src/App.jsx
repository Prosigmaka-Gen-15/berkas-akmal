// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MainLayout from './layout/MainLayout';
import AdminPage from './pages/AdminPage';
// import CreateProductForm from './component/Form/CreateProductForm';
import Form from './component/Form/Form';
import ListProduct from './component/Form/ListProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/product/:id' element={<AboutPage />} />
          <Route path='/admin' element={<AdminPage />}>
            <Route index element={<ListProduct />} />
            <Route path='form/:productId?' element={<Form />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
