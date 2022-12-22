import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./ProductRender.scss";
import IProduct from "models/Product.model";
import ProductItem from "components/product-item/ProductItem";
import { IAppState } from "redux/reducer";
import {
  setFilterByBandRD,
  setFilterByPriceRD,
} from "components/layouts/components/sidebar/redux/sideBarFilterSlice";
import API_PATHS from "configs/api";
const ManualGrinder = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const type = pathname.split("/")[1];
  const filterBandList = useSelector(
    (state: IAppState) => state.sidebarFilter.filterByBand
  );
  const filterPriceList = useSelector(
    (state: IAppState) => state.sidebarFilter.filterByPrice
  );
  const [productList, setProductList] = useState<Array<IProduct>>();
  const getProductList = async () => {
    const res = await axios.get(API_PATHS.getProducts, {
      params: {
        type,
        filterBandList,
        filterPriceList,
      },
    });
    setProductList(res.data);
  };

  useEffect(() => {
    getProductList();
  }, [filterBandList, filterPriceList, type]);
  return (
    <div className="product-render">
      <div className="product-render__name">
        <h3>{type.toUpperCase()}</h3>
      </div>

      <div className="content">
        <div className="content__sort">
          <p>Sắp xếp : </p>
          <select title="sort" name="sort" id="">
            <option value="">A to Z</option>
            <option value="">Z to A</option>
            <option value=""> Gía tăng dần</option>
            <option value=""> Gía giảm dần</option>
          </select>
          <></>
        </div>
        {productList?.length ? (
          <div className="content__item-list">
            {productList?.map((items: IProduct, idx) => (
              <ProductItem key={idx} product={items}></ProductItem>
            ))}
          </div>
        ) : (
          <div className="content__no-item">
            Không có sản phẩm nào trong danh mục này.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualGrinder;
