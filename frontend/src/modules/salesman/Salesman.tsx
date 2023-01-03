import Header from "./components/Header/Header";
import IProduct from "models/Product.model";
import "./Salesman.scss";
const Table = lazy(() => import("modules/salesman/components/Table/Table"));
import { IAppState } from "redux/reducer";
import { ROUTES } from "configs/Router";
import { IUser } from "models/User.model";
import Modal from "components/modal/comfirmModal/ComfirmModal";

import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TfiFaceSmile } from "react-icons/tfi";

const Salesman = () => {
  // const
  const { slug } = useParams();
  const navigate = useNavigate();
  const user: IUser | undefined = useSelector(
    (state: IAppState) => state.auth.user
  );
  const isValidUser =
    user?.permission == "Admin" || user?.permission == "Vendor";
  const salesmanNav = [
    { name: "Tất cả", value: "all" },
    { name: "Đang hoạt động", value: "active" },
    { name: "Đang đợi hàng", value: "soldout" },
    { name: "Ngừng hoạt động ", value: "un-active" },
  ];
  const params: any = { VendorId: user?.id };
  //state
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterBand, setFilterBand] = useState<string>();
  const [filterRangePrice, setFilterRangePrice] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
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
  if (filterRangePrice) {
    params["price"] = filterRangePrice;
  }
  if (searchValue) {
    params["name"] = searchValue;
  }
  const getProductList = async () => {
    let paranoid: string = "true";
    if (slug == "un-active") {
      paranoid = "false";
    }
    const res = await axios.get("http://localhost:3001/product/list/user", {
      params: { params, paranoid },
    });
    setProducts(res.data);
  };
  useEffect(() => {
    getProductList();
  }, [slug, filterBand, filterRangePrice]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {isValidUser ? (
        <div className="salesman">
          <h2>
            {` Gian hàng của ${user.name} nè `}{" "}
            <TfiFaceSmile className="icon" />
          </h2>
          <Header
            setFilterBand={setFilterBand}
            setFilterRangePrice={setFilterRangePrice}
            filterBand={filterBand}
            filterRangePrice={filterRangePrice}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
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
