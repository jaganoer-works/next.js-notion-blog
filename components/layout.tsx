import React from "react";
import Navbar from "./navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
