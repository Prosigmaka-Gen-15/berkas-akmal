// import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

MainLayout.propTypes = {
  children: PropTypes.any,
};
function MainLayout() {
  return (
    <div>
      <Header />
      {/* Edit tinggi minimal admin page */}
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
