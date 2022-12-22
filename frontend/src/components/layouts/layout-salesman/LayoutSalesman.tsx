import React from "react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StickyCart from "../components/sticky-cart/StickyCart";
import FlashContact from "../components/flash-contact/FlashContact";
// import SideBar from "../components/sidebar/SideBar";
import SalesManSidebar from "../components/salesman-sidebar/SalesManSidebar";
import "./LayoutSalesman.scss";
const LayoutHeader = (param: any) => {
  const children = param?.children;
  return (
    <div className="layout-salesman">
      <Header></Header>
      <div className="flash-contact--wrapper">
        <FlashContact></FlashContact>
      </div>
      <div className="sticky-cart--wrapper">
        <StickyCart></StickyCart>
      </div>
      <div className="layout-salesman-content--wrapper">
        <div className="container container-layout-salesman">
          <SalesManSidebar></SalesManSidebar>
          <div className="content">{children}</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LayoutHeader;
