import "./Table.scss";
import Button from "components/button/Button";
const NO_PRODUCT = require("assets/image/no_product2.png");
import IProduct from "models/Product.model";
import { splitNumber } from "utils";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/Router";

interface IProps {
  slug?: string;
  filterBand?: string;
  products: IProduct[];
}
const Table = ({ filterBand, products }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="salesman-table">
      <div className="salesman-table__header">
        <span className="span">
          <span>{products.length}</span> Sản phẩm
        </span>
        <Button
          onClick={() => {
            navigate(ROUTES.salesman_newProduct);
          }}
          size={{ width: "200px", height: "36px" }}
          color={"#E44B2C"}
          text="+  Thêm 1 sản phẩm mới."
          border={true}
        ></Button>
      </div>
      <div className="salesman-table__content">
        <table className="table">
          <thead>
            <tr
              style={{
                backgroundColor: "rgba(246, 246, 246, 0.7)",
                minHeight: "50px",
                lineHeight: "50px",
                border: "1px solid #ccc",
              }}
            >
              <th className="salesman-table-head">
                <input type="checkbox" title="checkbox" />
              </th>
              <th className="salesman-table-head">Tên sản phẩm</th>
              <th className="salesman-table-head">SKU</th>
              <th className="salesman-table-head">Giá</th>
              <th className="salesman-table-head">Hãng</th>

              <th className="salesman-table-head">Kho hàng</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" title="f" />
                  </td>
                  <td>{item.name}</td>
                  <td></td>
                  <td>{splitNumber(item.price)} đ</td>
                  <td>{item.bandName}</td>
                  <td>{item.leftIn > 0 ? item.leftIn : "Hết hàng"}</td>
                </tr>
              ))
            ) : (
              <div className="salesman-table--no-img">
                <img src={NO_PRODUCT} alt="" />
                <span> Không tìm thấy sản phẩm</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
