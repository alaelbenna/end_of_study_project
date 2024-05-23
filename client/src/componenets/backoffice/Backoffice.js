import React from "react";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";
function Backoffice() {
  return (
    <div className="wrapper">
      <Header />
      <Home />
      <SideNav />
      <Footer />
    </div>
  );
}

export default Backoffice;
