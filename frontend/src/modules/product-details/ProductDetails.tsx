import React, { useState, useEffect, memo } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./ProductDetails.scss";
import IProduct from "models/Product.model";
import Button from "components/button/Button";
import SameProduct from "modules/product-details/components/same-product/SameProduct";
const NO_IMG = require("assets/image/not_have_img.png");
import { splitNumber } from "utils";
import { setCartListRD } from "modules/cart/redux/cartSlice";
import API_PATHS from "configs/api";

const ProductDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [buyCount, setBuyCount] = useState<number>(1);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  //
  const PRODUCT_IMG_LIST = productDetail?.ProductImages;
  const PRODUCT_DETAILS_IMG = require("assets/image/banner_product__detail.webp");
  const { slug } = useParams();
  const id = slug;
  const getDetails = async () => {
    const res = await axios.get(API_PATHS.getProductDetail, {
      params: {
        id,
      },
    });
    setProductDetail(res.data);
  };
  useEffect(() => {
    getDetails();
  }, [slug]);

  const handleClickImage = (idx: number) => {
    setCurrentImg(idx);
  };
  const handleBuy = () => {
    dispatch(setCartListRD({ ...productDetail, count: buyCount }));
  };
  useEffect(() => {
    const hehe = async () => {
      setLoading(true);
      await axios.get("https://jsonplaceholder.typicode.com/photos");
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    hehe();
  }, []);
  return (
    <div className="container">
      <div className="product-detail">
        <div className="content">
          <div className="content__image">
            <div className="content__image--main">
              <img
                src={
                  PRODUCT_IMG_LIST
                    ? PRODUCT_IMG_LIST[currentImg]?.image
                    : NO_IMG
                }
                alt=""
              />
            </div>
            <div className="content__image--children">
              {PRODUCT_IMG_LIST?.slice(0, 3).map((item, idx) => {
                return (
                  <img
                    onClick={() => handleClickImage(idx)}
                    key={idx}
                    src={item?.image}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
          <div>
            <div className="content__info">
              <h1 className="content__info-name"> {productDetail?.name}</h1>
              <p>
                T??nh tr???ng : <span>{productDetail?.state}</span>
              </p>
              <p>
                M?? s???n ph???m :
                <span>
                  {productDetail?.productCode
                    ? productDetail.productCode
                    : "??ang c???p nh???p ..."}{" "}
                </span>
              </p>
              <p>
                H??ng s???n xu???t: <span>{productDetail?.bandName}</span>
              </p>

              <h2 className="content__info-price">
                Gi?? b??n:{" "}
                {productDetail?.price
                  ? `${splitNumber(productDetail.price)}??`
                  : `${productDetail?.price}??`}
              </h2>
            </div>
            <div className="content__howmany">
              <h4>S??? l?????ng</h4>
              <div className="content__howmany-custom">
                <Button
                  // color="#ccc"
                  size={{ width: "40px", height: "40px" }}
                  text="-"
                  onClick={() => {
                    setBuyCount((prev) => (prev > 1 ? prev - 1 : prev));
                  }}
                ></Button>
                <div className="content__howmany-custom--count">{buyCount}</div>
                <Button
                  // color="#ccc"
                  size={{ width: "40px", height: "40px" }}
                  text="+"
                  onClick={() => {
                    setBuyCount((prev) => prev + 1);
                  }}
                ></Button>
                <Button
                  customClass="buy-btn"
                  onClick={handleBuy}
                  size={{ width: "140px", height: "40px" }}
                  text="MUA H??NG"
                ></Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SameProduct currentProductId={id} sameProducts={state}></SameProduct>
          <img src={PRODUCT_DETAILS_IMG} width={"100%"} alt="" />
        </div>
        <div className="product-detail__desc">
          <div className="header-desc">
            <h4>Th??ng tin chi ti???t</h4>
          </div>
          <div className="content-desc">
            <p>Features and Benefits</p>
            <span className="desc">
              {productDetail?.desc ? productDetail.desc : "??ang c???p nh???t..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
