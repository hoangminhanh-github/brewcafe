import Header from "./components/Header/Header";
import "./Salesman.scss";
const Table = lazy(() => import("modules/salesman/components/Table/Table"));

import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "redux/reducer";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "configs/Router";
import axios from "axios";
import IProduct from "models/Product.model";

const Salesman = () => {
  // const
  const { slug } = useParams();
  const navigate = useNavigate();
  const user: any = useSelector((state: IAppState) => state.auth.user);
  const isValidUser = user.permission == "Admin" || user.permission == "Vendor";
  const salesmanNav = [
    { name: "Tất cả", value: "all" },
    { name: "Đang hoạt động", value: "active" },
    { name: "Hết hàng", value: "soldout" },
  ];
  const params: any = { VendorId: user.id };
  //state
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterBand, setFilterBand] = useState<string>();
  // logic
  if (slug == "soldout") {
    params["leftIn"] = 0;
  }
  if (slug == "active") {
    params["leftIn"] = "> 0";
  }
  if (filterBand) {
    params["bandName"] = filterBand;
  }

  const getProductList = async () => {
    const res = await axios.get("http://localhost:3001/product/list/user", {
      params: params,
    });
    setProducts(res.data);
  };
  useEffect(() => {
    getProductList();
  }, [slug, filterBand]);

  return (
    <>
      {isValidUser ? (
        <div className="salesman">
          <Header
            setFilterBand={setFilterBand}
            filterBand={filterBand}
          ></Header>
          <div className="salesman-body">
            <div className="salesman-body-nav">
              {salesmanNav.map((item) => (
                <div
                  onClick={() => {
                    navigate(`${ROUTES.salesman.split(":")[0]}${item.value}`);
                  }}
                  key={item.value}
                  className={`salesman-body-nav-items ${
                    item.value == slug ? "active" : ""
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="salesman-body-content">
              <Table products={products}></Table>
            </div>
          </div>
        </div>
      ) : (
        <span>Người không có thẩm quyền vào đây !!!</span>
      )}
    </>
  );
};

export default Salesman;
