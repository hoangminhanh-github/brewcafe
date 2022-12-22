import React from "react";
import { useSelector } from "react-redux";

import { IAppState } from "redux/reducer";
import "./Cart.scss";
import { splitNumber } from "utils/index";
import Button from "components/button/Button";
import CartItem from "./components/CartItem";
const Cart = () => {
  // sắp xếp theo id
  const cartList = useSelector((state: IAppState) => state.cart).sort((c, d) =>
    c.id > d.id ? 1 : -1
  );
  let cartListTotal: number = 0;
  cartList.forEach((item) => (cartListTotal += item.price * item.count));
  return (
    <div className="cart">
      <div className="container">
        <h1 className="cart-header">Giỏ hàng của bạn</h1>
        <div className="cart-content">
          {cartList.length > 0 ? (
            <table className="table">
              <tr>
                <th className="table-head">Ảnh sản phẩm</th>
                <th className="table-head">Tên sản phẩm</th>
                <th className="table-head">Đơn giá</th>
                <th className="table-head">Số lượng</th>
                <th className="table-head">Thành tiền</th>
                <th className="table-head">Xóa</th>
              </tr>

              {cartList.map((item) => (
                <CartItem key={item.id} item={item}></CartItem>
              ))}
            </table>
          ) : (
            "Không có sản phẩm nào. Quay lại cửa hàng để tiếp tục mua sắm."
          )}
        </div>
        <div className="cart-footer">
          <Button
            text="TIẾP TỤC MUA HÀNG"
            size={{ width: "200px", height: "40px" }}
          ></Button>
          <div className="cart-footer__total">
            <h4
              style={{
                borderRight: "1px solid #ccc",
                textAlign: "center",
                lineHeight: "40px",
              }}
            >
              Tổng tiền thanh toán
            </h4>
            <div style={{ textAlign: "center", lineHeight: "40px" }}>
              {splitNumber(cartListTotal)}đ
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 0",
          }}
        >
          <Button
            text="TIẾN HÀNH THANH TOÁN"
            size={{ width: "345px", height: "40px" }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
