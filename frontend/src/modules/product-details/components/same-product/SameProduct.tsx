import React from "react";

import "./SameProduct.scss";
import IProduct, { IProductImage } from "models/Product.model";
import Button from "components/button/Button";
import { splitNumber } from "utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "configs/Router";
import axios from "axios";
import API_PATHS from "configs/api";
interface IProps {
  currentProductId?: string;
  sameProducts?: IProduct[];
}
const SomeProduct = ({ currentProductId = "", sameProducts = [] }: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  const currentType = location.pathname.split(currentProductId)[0];
  const currentId = location.pathname.split(currentProductId)[1];
  const handleClick = async (id: string | number) => {
    const res = await axios.get(API_PATHS.getProducts, {
      params: {
        type: currentType.split("/")[1],
        limit: 3,
      },
    });
    navigate(`${currentType}${id}`, { state: res.data.data });
  };

  return (
    <div className="same-product">
      <div className="same-product__header">
        <span>Sản phẩm cùng loại</span>
      </div>
      <div className="same-product__content">
        <div className="list">
          {sameProducts?.map((item) => (
            <div className="list-item" key={item.id}>
              <img src={item.ProductImages[0].image} alt="" />
              <div className="list-item__info">
                <span className="list-item__info-name">{item.name}</span>
                <span className="list-item__info-price">
                  {splitNumber(item.price)} đ
                </span>
                <Button
                  color="#DCAA80"
                  text="Xem chi tiết"
                  onClick={() => handleClick(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SomeProduct;
