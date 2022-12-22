import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./StickyCart.scss";
const CART_IMG = require("assets/image/cart.png");
import { IAppState } from "redux/reducer";
import { CartState } from "modules/cart/redux/cartSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "configs/Router";

const StickyCart = () => {
  const cartList: CartState = useSelector((state: IAppState) => state.cart);

  let cartTotal: number = 0;
  cartList.forEach((item) => (cartTotal = cartTotal + item.count));
  return (
    <div className="sticky-cart">
      <Link to={ROUTES.cart}>
        <div className="sticky-cart__count-foods">
          <span>{cartList?.length > 0 ? cartTotal : "0"}</span>
        </div>
        <img src={CART_IMG} alt="" />
      </Link>
    </div>
  );
};

export default StickyCart;
