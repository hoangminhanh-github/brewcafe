import React, { useState } from "react";
import axios from "axios";

import Button from "components/button/Button";
const HOMEPAGE_IMG = require("assets/image/banner.png");
const HOMEPAGE_IMG_2 = require("assets/image/banner2.webp");
const HOMEPAGE_IMG_3 = require("assets/image/banner3.webp");
const PRODUCT_IMG = require("assets/image/test.png");
const FREEFIRE_IMG = require("assets/image/freefire.png");

import ProductsMain from "./components/ProductsMain";
import "./Home.scss";

const Home = () => {
  const buttonsize = {
    width: "140px",
    height: "44px",
  };
  return (
    <div className="homepage">
      <img className="homepage__img" src={HOMEPAGE_IMG} alt="" />
      <div className="homepage__product-main">
        <p>Sản phẩm đặc biệt của chúng tôi</p>
        <div className="container content">
          <img src={PRODUCT_IMG} alt="" />
          <div className="content__right">
            <img src={FREEFIRE_IMG} alt="" />
            <p className="content__name">Cân Acaia Pearl Phiên </p>
            <p className="content__desc">Cân điện tử Acaia Pearl</p>
            <div className="content__price">
              <p className="content__price--new">4.490.000đ</p>
              <p className="content__price--old">4.890.000đ</p>
            </div>
            <Button text="Tùy chọn" size={buttonsize}></Button>
          </div>
        </div>
      </div>
      <div className="stupid ">
        <div className="container">
          <img className="image" src={HOMEPAGE_IMG_2} alt="" />
          <img className="image" src={HOMEPAGE_IMG_3} alt="" />
        </div>
      </div>
      <div className="homepage__products-multi-main">
        <ProductsMain></ProductsMain>
      </div>
    </div>
  );
};

export default Home;
