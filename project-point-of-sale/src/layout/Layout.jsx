// import React from 'react';
import Header from "./Header";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

Layout.propTypes = {
  children: PropTypes.any,
};
function Layout() {
  return (
    <div>
      <Header />
      {/* Edit tinggi minimal admin page */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
