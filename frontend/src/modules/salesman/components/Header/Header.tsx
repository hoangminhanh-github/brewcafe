import "./Header.scss";
import Button from "components/button/Button";

import React from "react";
import { BsChevronDown } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
const Header = () => {
  return (
    <div className="salesman-header">
      <div className="salesman-header__filter">
        <div className="salesman-header__filter-input">
          <Tippy
            interactiveBorder={0}
            trigger="click"
            arrow={false}
            interactive
            placement="bottom-start"
            content={
              <div className="dropdown">
                <p>Tên sản phẩm</p>
                <p>SKU</p>
                <p>Mã sản phẩm</p>
              </div>
            }
          >
            <div>
              Tên sản phẩm <BsChevronDown />
            </div>
          </Tippy>

          <input type="text" placeholder="Nhập tối thiểu 2 kí tự..." />
        </div>
        <div className="salesman-header__filter-btns">
          <Button
            text="Tìm"
            color="#EE4D2D"
            textcolor="white"
            border={true}
            size={{ width: "72px", height: "32px" }}
          />
          <Button
            text="Nhập lại"
            color="white"
            textcolor="#000"
            size={{ width: "90px", height: "26px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
