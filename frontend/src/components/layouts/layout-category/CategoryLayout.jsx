import React from "react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StickyCart from "../components/sticky-cart/StickyCart";
import FlashContact from "../components/flash-contact/FlashContact";
import SideBar from "../components/sidebar/SideBar";
import "./CategoryLayout.scss";
const LayoutHeader = (param) => {
  const children = param?.children;
  return (
    <div className="layout-category">
      <Header></Header>
      <div className="flash-contact--wrapper">
        <FlashContact></FlashContact>
      </div>
      <div className="sticky-cart--wrapper">
        <StickyCart></StickyCart>
      </div>
      <div className="layout-category-content--wrapper">
        <div className="container container-layout-category">
          <SideBar></SideBar>
          <div className="content">{children}</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LayoutHeader;
