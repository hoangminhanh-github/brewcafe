import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  const PRODUCT_ON_PAGE = 6;
  const pageRef = useRef<any>();
  const [page, setPage] = useState<number>(pageRef.current?.page || 1);
  const [amountProduct, setAmountProduct] = useState<number>(1);
  const [sortBy, setSortBy] = useState<{ sort?: string; order_by?: string }>({
    sort: "id",
    order_by: "asc",
  });

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
        offset: page,
        ...sortBy,
      },
    });
    setAmountProduct(res?.data.amount ? res?.data.amount : 1);
    setProductList(res?.data.data);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getProductList();
  }, [filterBandList, filterPriceList, page, type, sortBy]);
  useEffect(() => {
    setPage(1);
  }, [type, filterBandList, filterPriceList, sortBy]);

  const handleSortChange = (e: any) => {
    const property = e.target.value.split("_")[0];
    const orderBy = e.target.value.split("_")[1];
    setSortBy({ sort: property, order_by: orderBy });
  };
  return (
    <div className="product-render">
      <div className="product-render__name">
        <h3>{type.toUpperCase()}</h3>
      </div>

      <div className="content">
        <div className="content__sort">
          <p>Sắp xếp : </p>
          <select
            title="sort"
            name="sort"
            id=""
            onChange={(e: any) => handleSortChange(e)}
          >
            <option value="name_asc">A to Z</option>
            <option value="name_desc">Z to A</option>
            <option value="price_asc"> Gía tăng dần</option>
            <option value="price_desc"> Gía giảm dần</option>
          </select>
          <></>
        </div>
        {(productList?.length && (
          <>
            <div className="content__item-list">
              {productList?.map((items: IProduct, idx) => (
                <ProductItem
                  sameProducts={productList
                    .filter((sameItem) => sameItem.id != items.id)
                    .slice(0, 3)}
                  key={idx}
                  product={items}
                ></ProductItem>
              ))}
            </div>
          </>
        )) || (
          <div className="content__no-item">
            Không có sản phẩm nào trong danh mục này.
          </div>
        )}
        <Stack className="content__pagination" spacing={2}>
          <Pagination
            ref={pageRef}
            count={Math.ceil(amountProduct / PRODUCT_ON_PAGE)}
            page={page}
            onChange={(e: React.ChangeEvent<unknown>, value: number) => {
              setPage(value);
            }}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ManualGrinder;
