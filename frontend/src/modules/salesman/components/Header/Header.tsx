import "./Header.scss";
import Button from "components/button/Button";
import { IBand } from "models/Band.model";

import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import API_PATHS from "configs/api";
const Header = () => {
  const ARR_FILTER = ["Tên sản phẩm", "SKU", "Mã sản phẩm"];
  const [filter, setFilter] = useState<string>(ARR_FILTER[0]);
  const [bands, setBands] = useState<IBand[]>();
  useEffect(() => {
    const getBands = async () => {
      const res = await axios.get(API_PATHS.getBands);
      setBands(res.data);
    };
    getBands();
  }, []);
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
                {ARR_FILTER.map((item) => (
                  <p
                    className={filter == item ? "active" : ""}
                    key={item}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            }
          >
            <div className="div">
              <span> {filter}</span> <BsChevronDown />
            </div>
          </Tippy>

          <input type="text" placeholder="Nhập tối thiểu 2 kí tự..." />
        </div>
        <div className="salesman-header__filter-state">
          <span>Số lượng hàng tồn</span>
          <input type="text" placeholder="số lượng ..." />
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
            border={true}
            text="Nhập lại"
            color="white"
            textcolor="#000"
            size={{ width: "90px", height: "26px" }}
          />
        </div>
      </div>
      <div className="salesman-header__filter--right">
        <div className="band">
          <span>Xuất sứ</span>
          <div>Chọn</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
