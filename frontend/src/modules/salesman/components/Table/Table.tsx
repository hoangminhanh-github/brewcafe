import "./Table.scss";
import Button from "components/button/Button";
const NO_PRODUCT = require("assets/image/no_product2.png");
import { IAppState } from "redux/reducer";
import IProduct from "models/Product.model";
import { splitNumber } from "utils";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

interface IProps {
  slug?: string;
}
const Table = ({ slug }: IProps) => {
  const user: any = useSelector((state: IAppState) => state.auth.user);
  const [product, setProduct] = useState<IProduct[]>([]);

  // logic
  const params: any = { VendorId: user.id };
  if (slug == "soldout") {
    params["leftIn"] = 0;
  }
  if (slug == "active") {
    params["leftIn"] = "> 0";
  }
  const getProductByUser = async () => {
    const res = await axios.get("http://localhost:3001/product/list/user", {
      params: params,
    });
    setProduct(res.data);
  };
  useEffect(() => {
    getProductByUser();
  }, [slug]);
  return (
    <div className="salesman-table">
      <div className="salesman-table__header">
        <span className="span">
          <span>{product.length}</span> Sản phẩm{" "}
        </span>
        <Button
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
              <th className="salesman-table-head">Kho hàng</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" title="f" />
                  </td>
                  <td>{item.name}</td>
                  <td></td>
                  <td>{splitNumber(item.price)} đ</td>
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
