import Header from "./components/Header/Header";
import "./Salesman.scss";
const Table = lazy(() => import("modules/salesman/components/Table/Table"));

import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "redux/reducer";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "configs/Router";
const Salesman = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user: any = useSelector((state: IAppState) => state.auth.user);
  const isValidUser = user.permission == "Admin" || user.permission == "Vendor";
  const salesmanNav = [
    { name: "Tất cả", value: "all" },
    { name: "Đang hoạt động", value: "active" },
    { name: "Hết hàng", value: "soldout" },
  ];
  return (
    <>
      {isValidUser ? (
        <div className="salesman">
          <Header></Header>
          <div className="salesman-body">
            <div className="salesman-body-nav">
              {salesmanNav.map((item) => (
                <div
                  onClick={() => {
                    navigate(`${ROUTES.salesman.split(":")[0]}${item.value}`);
                  }}
                  key={item.value}
                  className={`salesman-body-nav-items ${
                    item.value == params.slug ? "active" : ""
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="salesman-body-content">
              <Table slug={params.slug}></Table>
            </div>
          </div>
        </div>
      ) : (
        <span>Người dùng đéo đủ thẩm quyền vào đây !!!</span>
      )}
    </>
  );
};

export default Salesman;
