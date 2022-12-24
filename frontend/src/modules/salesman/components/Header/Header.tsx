import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";

import "./Header.scss";
import Button from "components/button/Button";
import { IBand } from "models/Band.model";
import API_PATHS from "configs/api";
import { MAX_SAFE_NUMBER, splitNumber } from "utils";

interface IProps {
  setFilterBand: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterBand?: string;
}

const Header = ({ setFilterBand, filterBand }: IProps) => {
  const [maxInput, setMaxInput] = useState<number | string>(0);
  const [minInput, setMinInput] = useState<number | string>(0);

  const ARR_FILTER = ["Tên sản phẩm", "SKU", "Mã sản phẩm"];
  const [filter, setFilter] = useState<string>(ARR_FILTER[0]);
  const [bands, setBands] = useState<IBand[]>([]);

  useEffect(() => {
    const getBands = async () => {
      const res = await axios.get(API_PATHS.getBands);
      setBands(res.data);
    };
    getBands();
  }, []);
  const handleReset = () => {
    setFilterBand("");
  };
  const handleFilter = () => {
    console.log([minInput, maxInput]);
  };
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
          <span>Nhập khoảng giá sản phẩm</span>
          <div>
            <input
              type="text"
              placeholder="số lượng ..."
              value={minInput != 0 ? minInput : ""}
              onChange={(e: any) => setMinInput(e.target.value)}
            />
            <span>--</span>
            <input
              type="text"
              placeholder="số lượng ..."
              value={maxInput != 0 ? maxInput : ""}
              onChange={(e: any) => setMaxInput(e.target.value)}
            />
          </div>
        </div>
        <div className="salesman-header__filter-btns">
          <Button
            onClick={handleFilter}
            text="Tìm"
            color="#EE4D2D"
            textcolor="white"
            border={true}
            size={{ width: "72px", height: "32px" }}
          />
          <Button
            onClick={handleReset}
            border={true}
            text="Nhập lại"
            color="white"
            textcolor="#000"
            size={{ width: "90px", height: "26px" }}
          />
        </div>
      </div>

      <div className="salesman-header__filter--right">
        <Tippy
          interactiveBorder={0}
          trigger="click"
          arrow={false}
          interactive
          placement="bottom-start"
          content={
            <div className="tippy-list">
              {bands.map((item) => (
                <div
                  key={item.id}
                  className="tippy-list-items"
                  onClick={() => setFilterBand(item.name)}
                >
                  <div>{item.name.toUpperCase()}</div>
                </div>
              ))}
            </div>
          }
        >
          <div className="band">
            <span>Hãng hàng</span>
            <div>{filterBand ? filterBand.toUpperCase() : "Chọn"}</div>
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default Header;
