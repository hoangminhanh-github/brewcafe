import Header from "./components/Header/Header";
import IProduct from "models/Product.model";
import "./Salesman.scss";
const Table = lazy(() => import("modules/salesman/components/Table/Table"));
import { IAppState } from "redux/reducer";
import { ROUTES } from "configs/Router";
import { IUser } from "models/User.model";
import API_PATHS from "configs/api";

import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TfiFaceSmile } from "react-icons/tfi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Salesman = () => {
  // const
  const PRODUCT_ON_PAGE = 6;
  const { slug } = useParams();
  const navigate = useNavigate();
  const user: IUser | undefined = useSelector(
    (state: IAppState) => state.auth.user
  );
  const isValidUser =
    user?.permission == "Admin" || user?.permission == "Vendor";
  const salesmanNav = [
    { name: "Tất cả", value: "all" },
    { name: "Đang hoạt động", value: "active" },
    { name: "Đang đợi hàng", value: "soldout" },
    { name: "Ngừng hoạt động ", value: "un-active" },
  ];
  const params: any = { VendorId: user?.id };
  //state
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterBand, setFilterBand] = useState<string>();
  const [filterRangePrice, setFilterRangePrice] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [amountProduct, setAmountProduct] = useState<number>(0);
  const [sortBy, setSortBy] = useState<{ sort?: string; order_by?: string }>({
    sort: "id",
    order_by: "asc",
  });
  // logic
  if (slug == "soldout") {
    params["leftIn"] = 0;
  }
  if (slug == "active") {
    params["leftIn"] = "> 0";
  }

  if (filterBand) {
    params["bandName"] = filterBand;
  }
  if (filterRangePrice) {
    params["price"] = filterRangePrice;
  }
  if (searchValue) {
    params["name"] = searchValue;
  }
  const getProductList = async () => {
    let paranoid: string = "true";
    if (slug == "un-active") {
      paranoid = "false";
    }
    const res = await axios.get(API_PATHS.getProductByVendor, {
      params: {
        params,
        paranoid,
        limit: PRODUCT_ON_PAGE,
        offset: page,
        sort: sortBy.sort,
        order_by: sortBy.order_by,
      },
    });
    setAmountProduct(res.data.amount);
    setProducts(res.data.data);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getProductList();
  }, [slug, filterBand, filterRangePrice, page, sortBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {isValidUser ? (
        <div className="salesman">
          <h2>
            {` Gian hàng của ${user.name} nè `}{" "}
            <TfiFaceSmile className="icon" />
          </h2>
          <Header
            setFilterBand={setFilterBand}
            setFilterRangePrice={setFilterRangePrice}
            filterBand={filterBand}
            filterRangePrice={filterRangePrice}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          ></Header>
          <div className="salesman-body">
            <div className="salesman-body-nav">
              {salesmanNav.map((item) => (
                <div
                  onClick={() => {
                    navigate(`${ROUTES.salesman.split(":")[0]}${item.value}`);
                  }}
                  key={item.value}
                  className={`salesman-body-nav-items ${
                    item.value == slug ? "active" : ""
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="salesman-body-content">
              <Table
                products={products}
                setSortBy={setSortBy}
                sortBy={sortBy}
              ></Table>
            </div>
          </div>
          <div className="salesman-bottom">
            <Stack className="salesman-bottom__pagination" spacing={2}>
              <Pagination
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
      ) : (
        <div>
          Người không có thẩm quyền vào đây !!!{" "}
          <Link to={ROUTES.home}>Trở về trang trủ</Link>
        </div>
      )}
    </>
  );
};

export default Salesman;
