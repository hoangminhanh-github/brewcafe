import "./SalesManSidebar.scss";

import React from "react";
import { SiHackthebox } from "react-icons/si";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";

const SalesManSidebar = () => {
  const handleClick = (e: any) => {
    const children = e.target.parentElement
      .closest(".salesman-sidebar-items")
      .querySelector(".children");
    const icons = e.target.parentElement
      .closest(".salesman-sidebar-items")
      .querySelector(".icons");
    if (children.matches(".hidden")) {
      children.classList.remove("hidden");
      icons.classList.add("down");
    } else {
      children.classList.add("hidden");
      icons.classList.remove("down");
    }
  };
  return (
    <div className="salesman-sidebar">
      <div className="salesman-sidebar-items">
        <div className="parent" onClick={(e) => handleClick(e)}>
          <SiHackthebox /> Vận chuyển <BsChevronDown className="icons" />
        </div>
        <div className="children hidden">
          <p> Tất cả</p>
          <p>Đơn Huỷ</p>
          <p>Trả Hàng/Hoàn Tiền</p>
        </div>
      </div>
      <div className="salesman-sidebar-items">
        <div className="parent" onClick={(e) => handleClick(e)}>
          <HiOutlineClipboardList />
          Quản Lý Đơn Hàng
          <BsChevronDown className="icons" />
        </div>
        <div className="children hidden">
          <p>Tất cả sản phẩm</p>
          <p>Thêm sản phẩm</p>
        </div>
      </div>
    </div>
  );
};

export default SalesManSidebar;
