import "./Table.scss";
import Button from "components/button/Button";
const NO_PRODUCT = require("assets/image/no_product2.png");
import IProduct from "models/Product.model";
import { splitNumber } from "utils";
import Modal from "components/modal/comfirmModal/ComfirmModal";
import { ROUTES } from "configs/Router";
import API_PATHS from "configs/api";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import axios from "axios";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

interface IProps {
  slug?: string;
  filterBand?: string;
  products: IProduct[];
  sortBy: {
    sort?: string;
    order_by?: string;
  };
  setSortBy: React.Dispatch<
    React.SetStateAction<{
      sort?: string | undefined;
      order_by?: string | undefined;
    }>
  >;
}
const Table = ({ filterBand, products, setSortBy, sortBy }: IProps) => {
  const navigate = useNavigate();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>();
  // const [isPriceSort,setIsPriceSort]=useState<boolean>(false)
  const handleDeleteClick = (item: IProduct) => {
    setIsModalDelete((prev) => !prev);
    if (!isModalDelete) {
      setCurrentProduct(item);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(API_PATHS.deleteProduct, {
        data: [currentProduct?.id],
      });
      setIsModalDelete(false);
    } catch (err) {
      alert(err);
    }
  };
  const handleSortPrice = ({ sort = "", order_by = "" }) => {
    setSortBy({ sort, order_by });
  };
  const handleSortLeftIn = ({ sort = "", order_by = "" }) => {
    setSortBy({ sort, order_by });
  };

  return (
    <div className="salesman-table">
      <div className="salesman-table__header">
        <span className="span">
          <span>{products.length}</span> Sản phẩm
        </span>
        <Button
          onClick={() => {
            navigate(ROUTES.salesman_newProduct);
          }}
          size={{ width: "200px", height: "36px" }}
          color={"#E44B2C"}
          text="+  Thêm 1 sản phẩm mới."
          border={true}
        ></Button>
      </div>
      <div className="salesman-table__content">
        <table className="table">
          <thead>
            <tr
              style={{
                backgroundColor: "rgba(246, 246, 246, 0.7)",
                minHeight: "50px",
                lineHeight: "50px",
                border: "1px solid #ccc",
              }}
            >
              <th className="salesman-table-head">
                <input type="checkbox" title="checkbox" />
              </th>
              <th className="salesman-table-head">Tên sản phẩm</th>
              <th className="salesman-table-head">Trạng thái</th>
              <th className="salesman-table-head center-content">
                Giá
                <span className="slm-btn-icon__list ">
                  <span
                    className={`slm-btn-icon__icons ${
                      sortBy.sort == "price" && sortBy.order_by == "asc"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleSortPrice({ sort: "price", order_by: "asc" })
                    }
                  >
                    <RiArrowUpSFill></RiArrowUpSFill>
                  </span>
                  <span
                    className={`slm-btn-icon__icons ${
                      sortBy.sort == "price" && sortBy.order_by == "desc"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleSortPrice({ sort: "price", order_by: "desc" })
                    }
                  >
                    <RiArrowDownSFill></RiArrowDownSFill>
                  </span>
                </span>
              </th>
              <th className="salesman-table-head">Hãng</th>

              <th className="salesman-table-head center-content">
                Kho hàng
                <span className="slm-btn-icon__list">
                  <span
                    className={`slm-btn-icon__icons ${
                      sortBy.sort == "leftIn" && sortBy.order_by == "asc"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleSortLeftIn({ sort: "LeftIn", order_by: "asc" })
                    }
                  >
                    <RiArrowUpSFill></RiArrowUpSFill>
                  </span>
                  <span
                    className={`slm-btn-icon__icons ${
                      sortBy.sort == "leftIn" && sortBy.order_by == "desc"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleSortLeftIn({ sort: "leftIn", order_by: "desc" })
                    }
                  >
                    <RiArrowDownSFill></RiArrowDownSFill>
                  </span>
                </span>
              </th>
              <th className="salesman-table-head">Xoá</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" title="f" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.state}</td>
                  <td>{splitNumber(item.price)} đ </td>
                  <td>{item.bandName}</td>
                  <td>{item.leftIn > 0 ? item.leftIn : "Hết hàng"}</td>
                  <Tippy
                    arrow="false"
                    theme="light"
                    placement="right"
                    content={<span>Double Click để xóa!!</span>}
                  >
                    <td onClick={() => handleDeleteClick(item)}>
                      <RiCloseCircleFill />
                    </td>
                  </Tippy>
                </tr>
              ))
            ) : (
              <div className="salesman-table--no-img">
                <img src={NO_PRODUCT} alt="" />
                <span> Không tìm thấy sản phẩm</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        type="delete"
        isOpen={isModalDelete}
        customClass="salesman-new--delete"
        size={{ width: "36%", height: "28%" }}
        textHead="Xác nhận xóa sản phẩm"
        textBody={`Xóa sản phẩm ${currentProduct?.name} ra khỏi kho hàng của bạn!!!`}
        onAgree={handleDelete}
      ></Modal>
    </div>
  );
};

export default Table;
