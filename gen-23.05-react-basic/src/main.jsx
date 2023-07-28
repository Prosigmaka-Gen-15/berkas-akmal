import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AboutPage from './pages/AboutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// mendaftarkan halaman lain
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />,
  </React.StrictMode>,
);
