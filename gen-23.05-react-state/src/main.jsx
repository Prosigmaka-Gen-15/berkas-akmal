import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import AboutPage from './pages/AboutPage.jsx';
// import HomePage from './pages/HomePage';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// mendaftarkan halaman lain
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//   },
//   {
//     path: 'about',
//     element: <AboutPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>,
);
