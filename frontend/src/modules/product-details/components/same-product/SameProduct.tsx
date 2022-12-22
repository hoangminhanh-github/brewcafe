import React from "react";

import "./SameProduct.scss";
import { IProductImage } from "models/Product.model";
interface IProps {
  images?: any;
}
const SomeProduct = ({ images = [] }: IProps) => {
  return (
    <div className="same-product">
      <div className="same-product__header">
        <span>Sản phẩm cùng loại</span>
      </div>
      <div className="same-product__content">
        <div className="list">
          {images.map((item: any, idx: number) => (
            <img key={idx} src={item.image} alt="" width={"30px"}></img>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SomeProduct;
