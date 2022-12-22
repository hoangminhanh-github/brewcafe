import React from "react";

import "./DefaultLayout.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StickyCart from "../components/sticky-cart/StickyCart";
import FlashContact from "../components/flash-contact/FlashContact";
const LayoutHeader = (param) => {
  const children = param?.children;
  return (
    <div className="layout-header">
      <Header></Header>
      <div className="flash-contact--wrapper">
        <FlashContact></FlashContact>
      </div>
      <div className="sticky-cart--wrapper">
        <StickyCart></StickyCart>
      </div>

      <div>
        <div className="content">{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LayoutHeader;
