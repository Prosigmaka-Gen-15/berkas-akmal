// import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';

MainLayout.propTypes = {
  children: PropTypes.any,
};
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
