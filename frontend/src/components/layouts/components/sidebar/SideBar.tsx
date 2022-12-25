import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiXCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const CATE_IMG = require("assets/image/cate_banner.png");
import { ROUTES } from "configs/Router";
import { IBand } from "models/Band.model";
import "./Sidebar.scss";
import {
  setFilterByBandRD,
  setFilterByPriceRD,
} from "./redux/sideBarFilterSlice";
import { CATE_PRICE } from "utils/constant";
import API_PATHS from "configs/api";
const SideBar = () => {
  const [bandList, setBandList] = useState<Array<IBand>>();
  const [filterByBand, setFilterByBand] = useState<string[]>([]);
  const [filterByPrice, setFilterByPrice] = useState<string[]>([]);
  const dispatch = useDispatch();
  // function
  const getBandList = async () => {
    const res: AxiosResponse<IBand[]> = await axios.get(API_PATHS.getBands);
    setBandList(res.data);
  };
  // handle convert array price filter

  // handle click filter
  const handleClickFilterBand = (e: any) => {
    if (e.target.checked) {
      return setFilterByBand((prev) => [...prev, e.target.value]);
    } else {
      const newFilterArr = filterByBand?.filter(
        (item) => item != e.target.value
      );
      return setFilterByBand(newFilterArr);
    }
  };
  const handleClickFilterPrice = (e: any) => {
    if (e.target.checked) {
      return setFilterByPrice(() => [e.target.value]);
    } else {
      const newFilterArr = filterByPrice?.filter(
        (item) => item != e.target.value
      );
      return setFilterByPrice(newFilterArr);
    }
  };
  const handleDeleteAllFilter = () => {
    setFilterByBand([]);
    setFilterByPrice([]);
  };
  const handleDeleteOneBandFilter = (param: string) => {
    const newArrFilter = filterByBand.filter((item) => item != param);
    setFilterByBand(newArrFilter);
  };
  const handleDeleteOnePriceFilter = (param: string) => {
    const newArrFilter = filterByPrice.filter((item) => item != param);
    setFilterByBand(newArrFilter);
  };
  // effect
  useEffect(() => {
    getBandList();
  }, []);

  dispatch(setFilterByBandRD(filterByBand));
  dispatch(setFilterByPriceRD(filterByPrice));
  return (
    <div className="sidebar">
      <div className="sidebar-text">
        <span>Danh Mục sản phẩm</span>
      </div>
      <div className="sidebar-cate">
        <ul>
          <li>
            <Link to={ROUTES.home}>Trang chủ</Link>
          </li>
          <li>
            <Link to={ROUTES.manual_brewing}>Manual Brewing</Link>
          </li>
          <li>
            <Link to={ROUTES.manual_grinder}>Manual Grinder</Link>
          </li>
          <li>
            <Link to={ROUTES.home}>Ấm pha cafe</Link>
          </li>
          <li>
            <Link to={ROUTES.home}>SALE</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-filter">
        <div className="sidebar-filter__content">
          <h4>Bộ lọc sản phẩm</h4>
          <p>Giúp lọc nhanh sản phẩm bạn tìm kiếm</p>
          {/* filter */}
          {(filterByBand.length != 0 || filterByPrice.length != 0) && (
            <div className="sidebar-filter__content--filter">
              <div className="filter-head">
                <h4>LỌC THEO:</h4>
                <p onClick={handleDeleteAllFilter}>Xóa tất cả</p>
              </div>
              <div className="filter-body">
                <ul>
                  {filterByBand.map((item, idx) => (
                    <li key={idx}>
                      <BiXCircle
                        onClick={() => handleDeleteOneBandFilter(item)}
                        className="icons"
                      ></BiXCircle>
                      {item}
                    </li>
                  ))}
                  {filterByPrice.map((item, idx) => {
                    return (
                      <li key={idx}>
                        <BiXCircle
                          onClick={() => handleDeleteOnePriceFilter(item)}
                          className="icons"
                        ></BiXCircle>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {/* filter */}
          <h3>Nhà sản xuất</h3>
          <div className="sidebar-filter__content-input">
            <input type="text" placeholder="Tìm Thương hiệu"></input>
            <AiOutlineSearch className="icon"></AiOutlineSearch>
          </div>
          <div className="sidebar-filter__bands">
            {bandList?.map((item, idx) => (
              <label htmlFor={item.name} key={item.id}>
                <input
                  value={item.name}
                  id={item.name}
                  type="checkbox"
                  checked={filterByBand.includes(item.name) ? true : false}
                  onChange={(e: any) => handleClickFilterBand(e)}
                ></input>
                {item.name}
              </label>
            ))}
          </div>
          <div className="sidebar-filter__price">
            <h3>Lọc giá</h3>
            {CATE_PRICE.map((item) => (
              <label key={item.type} htmlFor={item.type}>
                <input
                  onChange={(e: any) => handleClickFilterPrice(e)}
                  id={item.type}
                  value={item.type}
                  checked={filterByPrice.includes(item.type) ? true : false}
                  type="checkbox"
                ></input>
                {item.text}
              </label>
            ))}
          </div>
        </div>
        <img className="sidebar-img" src={CATE_IMG} alt="" />
      </div>
    </div>
  );
};

export default SideBar;
