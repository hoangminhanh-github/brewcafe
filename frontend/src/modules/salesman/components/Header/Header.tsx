import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./Header.scss";
import Button from "components/button/Button";
import { IBand } from "models/Band.model";
import API_PATHS from "configs/api";
import { MAX_SAFE_NUMBER, splitNumber } from "utils";
import AutoCompleBox from "modules/salesman/utils/AutoCompleBox";

interface IProps {
  setFilterBand: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFilterRangePrice: React.Dispatch<React.SetStateAction<number[]>>;
  filterBand?: string;
  filterRangePrice: Array<number>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
}

const Header = ({
  setFilterBand,
  setFilterRangePrice,
  filterBand,
  filterRangePrice,
  setSearchValue,
  searchValue,
}: IProps) => {
  const ARR_FILTER = [
    { name: "Tên sản phẩm", value: "name" },
    { name: "Mã sản phẩm", value: "productCode" },
  ];
  const [filter, setFilter] = useState<string>(ARR_FILTER[0].name);
  const [bands, setBands] = useState<IBand[]>([]);
  const minInputRef = useRef<any>();
  const maxInputRef = useRef<any>();
  useEffect(() => {
    const getBands = async () => {
      const res = await axios.get(API_PATHS.getBands);
      setBands(res.data);
    };
    getBands();
  }, []);

  const handleReset = () => {
    setFilterBand("");
    minInputRef.current.value = "";
    maxInputRef.current.value = "";
    setFilterRangePrice([]);
    setSearchValue("");
  };

  const formik = useFormik({
    initialValues: {
      min_input: 0,
      max_input: MAX_SAFE_NUMBER,
    },
    validationSchema: Yup.object({
      min_input: Yup.number(),
      max_input: Yup.number().moreThan(
        Yup.ref("min_input"),
        `Gía trị sau phải lớn hơn giá trị trước !!`
      ),
    }),
    onSubmit: async (values) => {
      const priceRange = [values.min_input, values.max_input];
      setFilterRangePrice(priceRange);
    },
  });
  return (
    <div className="salesman-header">
      <form onSubmit={formik.handleSubmit}>
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
                      className={filter == item.name ? "active" : ""}
                      key={item.value}
                      onClick={() => setFilter(item.name)}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              }
            >
              <div className="div">
                <span> {filter}</span> <BsChevronDown />
              </div>
            </Tippy>

            <AutoCompleBox
              setSearchValue={setSearchValue}
              searchWith={ARR_FILTER.find((item) => item.name == filter)}
              searchValue={searchValue}
            />
          </div>
          <div className="salesman-header__filter-price">
            <span>Khoảng giá sản phẩm</span>
            <div className="input-group">
              <input
                ref={minInputRef}
                className="inputs"
                name="min_input"
                type="number"
                placeholder="Từ ..."
                onChange={formik.handleChange}
              />
              <input
                ref={maxInputRef}
                className="inputs"
                name="max_input"
                type="number"
                placeholder="Đến ..."
                onChange={formik.handleChange}
              />
              <div className="err">
                {formik.errors.min_input && formik.touched.min_input && (
                  <span className="mess-err">{`${formik.errors.min_input} *`}</span>
                )}
                {formik.errors.max_input && formik.touched.max_input && (
                  <span className="mess-err">{`${formik.errors.max_input} *`}</span>
                )}
              </div>
              <div className="range-price-alert">
                {filterRangePrice.length > 1 && (
                  <span>{`Đang tìm giá từ ${splitNumber(
                    filterRangePrice[0]
                  )} VNĐ  ${
                    filterRangePrice[1] == MAX_SAFE_NUMBER
                      ? ""
                      : `đến ${splitNumber(filterRangePrice[1])} VNĐ`
                  }`}</span>
                  // VNĐ đến ${splitNumber(filterRangePrice[1])} VNĐ
                )}
              </div>
            </div>
          </div>
          <div className="salesman-header__filter-btns">
            <Button
              text="Tìm"
              color="#EE4D2D"
              textcolor="white"
              border={true}
              size={{ width: "72px", height: "32px" }}
              btn_type={"submit"}
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
      </form>

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
