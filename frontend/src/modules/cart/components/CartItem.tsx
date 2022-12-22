import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import Button from "components/button/Button";
import { splitNumber } from "utils";
import { deleteProductCart } from "../redux/cartSlice";
import { setCartListRD } from "../redux/cartSlice";
import { IProductAfterAddCart } from "models/Product.model";
interface IProps {
  item: IProductAfterAddCart;
}
const CartItem = ({ item }: IProps) => {
  const [count, setCount] = useState<number>(item.count);
  const dispatch = useDispatch();
  const handleDecrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    dispatch(setCartListRD({ ...item, count: count }));
  }, [count]);
  return (
    <tr key={item.id} className="table-item">
      <td className="table-item__img">
        <img src={item.ProductImages[0].image} width="80%" alt="" />
      </td>
      <td className="table-item__name">{item.name}</td>
      <td className="table-item__price">{splitNumber(item.price)}đ</td>
      <td className="table-item__count">
        <Button
          size={{ width: "24px", height: "24px" }}
          text="-"
          onClick={handleDecrease}
        />
        <span style={{ backgroundColor: "white", padding: "0 16px" }}>
          {count}
        </span>
        <Button
          size={{ width: "24px", height: "24px" }}
          text="+"
          onClick={handleIncrease}
        />
      </td>
      <td className="table-item__price-total">
        {splitNumber(item.price * item.count)}đ
      </td>
      <td className="table-item__delete">
        <TiDelete
          className="icons"
          onClick={() => {
            dispatch(deleteProductCart(item));
          }}
        ></TiDelete>
      </td>
    </tr>
  );
};

export default CartItem;
