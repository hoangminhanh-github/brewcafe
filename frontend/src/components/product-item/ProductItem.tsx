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
import { useNavigate } from "react-router-dom";
interface IProps {
  key: number | string;
  product: IProduct;
  sameProducts?: IProduct[];
}
const ProductItem = ({ product, sameProducts }: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const firstImageProduct = product.ProductImages[0];
  const handleClickCart = (e: any) => {
    e.preventDefault();
    dispatch(setCartListRD(product));
  };
  const handleClick = () => {
    navigate(`${location.pathname}/${product.id}`, {
      state: sameProducts,
    });
  };
  return (
    <div className="content-items">
      <div onClick={handleClick}>
        <div className="content-items__sale">-10%</div>
        {/* onHover */}
        <div className="content-items__icons--wrapper">
          <div className="content-items__icons">
            <div onClick={handleClick}>
              <AiOutlineEye></AiOutlineEye>
            </div>
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
      </div>
    </div>
  );
};

export default ProductItem;
