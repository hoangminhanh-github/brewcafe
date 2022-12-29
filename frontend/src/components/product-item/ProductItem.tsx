import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const PRODUCTS = require("assets/image/products/chuanghiten.png");
import "./ProductItem.scss";
import IProduct from "models/Product.model";
import { splitNumber } from "utils";
import { setCartListRD } from "modules/cart/redux/cartSlice";
interface IProps {
  key: number | string;
  product: IProduct;
}
const ProductItem = ({ product }: IProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const firstImageProduct = product.ProductImages[0];
  const handleClickCart = (e: any) => {
    e.preventDefault();
    dispatch(setCartListRD(product));
  };

  return (
    <div className="content-items">
      <Link to={`${location.pathname}/${product.id}`}>
        <div className="content-items__sale">-10%</div>
        {/* onHover */}
        <div className="content-items__icons--wrapper">
          <div className="content-items__icons">
            <Link to={`${location.pathname}/${product.id}`}>
              <AiOutlineEye></AiOutlineEye>
            </Link>
          </div>
          <div className="content-items__icons">
            <MdOutlineShoppingBasket
              onClick={(e) => handleClickCart(e)}
            ></MdOutlineShoppingBasket>
          </div>
        </div>
        <div className="content-items-img__wrap">
          {firstImageProduct ? (
            <img src={firstImageProduct.image} alt=""></img>
          ) : (
            <img src={PRODUCTS} alt="" />
          )}
        </div>
        <p className="content-items__name">{product.name}</p>
        <div className="content-items__price">
          <span className="content-items__price--new">
            {splitNumber(product.price)}đ
          </span>
          <span className="content-items__price--old">790.000₫</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
