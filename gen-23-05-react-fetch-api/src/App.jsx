// import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
        </Route>
        <Route
          path='*'
          element={
            <div>
              <button className='p-1 m-1 border border-black border-solid'>
                <Link to={'/'}>Home</Link>
              </button>
              <br />
              <h1>Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
