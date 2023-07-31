// import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

MainLayout.propTypes = {
  children: PropTypes.any,
};
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
