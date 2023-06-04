import React from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <SideNav />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
