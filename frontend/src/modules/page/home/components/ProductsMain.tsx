import Button from "components/button/Button";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineShoppingBasket } from "react-icons/md";
import "./ProductsMain.scss";
const PRODUCTS = require("assets/image/products/chuanghiten.png");
import ProductItem from "components/product-item/ProductItem";
const ProductsMain = () => {
  return (
    <div className="container home-products-main">
      <p>Brew Coffee Shop</p>
      <div className="content"></div>
      <Button text="Xem Thêm"></Button>
    </div>
  );
};

export default ProductsMain;
