import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "redux/reducer";

import Header from "./components/Header/Header";
const Salesman = () => {
  const user: any = useSelector((state: IAppState) => state.auth.user);
  const isValidUser = user.permission == "Admin" || user.permission == "Vendor";
  return (
    <>
      {isValidUser ? (
        <div className="salesman">
          <Header></Header>
          <div className="salesman-body">hehe</div>
        </div>
      ) : (
        <span>Người dùng đéo đủ thẩm quyền vào đây !!!</span>
      )}
    </>
  );
};

export default Salesman;
