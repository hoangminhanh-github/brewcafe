import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { BiImageAdd } from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";

import API_PATHS from "configs/api";
import { IBand } from "models/Band.model";
import "./SalesmanNewProduct.scss";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "redux/reducer";
import { IUser } from "models/User.model";
import Button from "components/button/Button";
import Loading from "components/loading/Loading";
import { ROUTES } from "configs/Router";
import IProduct from "models/Product.model";
type IArrayField = Array<{
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  isRequire: boolean;
  value?: string | number;
}>;
const SalesmanNewProduct = () => {
  const user: IUser | undefined = useSelector(
    (state: IAppState) => state.auth.user
  );
  // const dispatch =
  //   useDispatch<ThunkDispatch<IAppState, null, Action<string>>>();
  const { state } = useLocation();
  const productEdit: IProduct = state;
  const imgRef = useRef<any>();
  const navigate = useNavigate();
  const ARRAY_FORM_FIELD: IArrayField = [
    {
      label: "Tên sản phẩm",
      name: "name",
      placeholder: "Nhập vào",
      type: "text",
      isRequire: true,
      value: productEdit?.name || "",
    },
    {
      label: "Gía sản phẩm",
      name: "price",
      placeholder: "Nhập vào giá",
      type: "number",
      isRequire: true,
      value: productEdit?.price || "false",
    },
    {
      label: "Loại sản phẩm",
      name: "type",
      placeholder: "Nhập vào loại sản phẩm",
      type: "text",
      isRequire: true,
      value: productEdit?.type || "",
    },
    {
      label: "Số lượng hàng",
      name: "leftIn",
      placeholder: "Nhập vào số lượng hàng",
      type: "number",
      isRequire: false,
      value: productEdit?.leftIn || "",
    },
  ];
  const [bands, setBands] = useState<IBand[]>([]);
  const [bandSelect, setBandSelect] = useState<string>(
    productEdit?.bandName || ""
  );
  const [images, setImages] = useState<any>(
    productEdit ? productEdit?.ProductImages : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getBands = async () => {
    const res = await axios.get(API_PATHS.getBands);
    setBands(res.data);
  };

  const formik: any = useFormik({
    initialValues: {
      name: productEdit ? productEdit?.name : "",
      price: productEdit.price || "false",
      leftIn: productEdit.leftIn || "false",
      bandName: productEdit.bandName || "",
      desc: productEdit.bandName || "",
      type: productEdit.type || "",
      VendorId: user?.id,
      vendorEmail: user?.email,
      BandId: "",
      state: "Hết hàng",
    },

    validationSchema: Yup.object({
      // name: Yup.string().required("Trường này bắt buộc!!"),
      // price: Yup.string().required("trường này bắt buộc nhập số!!"),
    }),
    onSubmit: async (values: any) => {
      setIsLoading(true);
      values.bandName = bandSelect;
      values.BandId = bands?.find((item) =>
        item.name == bandSelect ? item.id : ""
      )?.id;
      if (values.leftIn > 0) {
        values.state = "Còn hàng";
      }
      const formData = new FormData();
      const keyArr = Object.keys(values);
      keyArr.forEach((item) => formData.append(item, values[item]));
      images.forEach((item: any) => {
        formData.append("image", item);
      });
      try {
        await axios.post("http://localhost:3001/product/new", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await setIsLoading(false);
        alert("Thêm sản phẩm thành công !!");
        await navigate(ROUTES.home);
      } catch (err) {
        setIsLoading(false);
        alert(err);
      }
    },
  });
  const handleUpload = (e: any) => {
    const fileArr = e.target.files;
    const convertArr: any = [...images];
    for (let i = 0; i < fileArr?.length; i++) {
      convertArr.push(fileArr[i]);
    }
    setImages(convertArr);
  };
  const handleRemoveImage = (param: string) => {
    setImages(images.filter((item: any) => item.name != param));
  };
  useEffect(() => {
    getBands();
  }, []);

  return (
    <div className="salesman-new-product">
      <div className="salesman-new-product-content">
        <h2>Thông tin cơ bản</h2>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-field upload-image">
            <p>
              <span style={{ color: "red" }}> *</span>
              Hình ảnh sản phẩm
            </p>
            <input
              ref={imgRef}
              multiple
              name="img"
              type="file"
              style={{ display: "none" }}
              title="Thêm ảnh"
              onChange={(e: any) => {
                // formik.handleChange;
                handleUpload(e);
              }}
            />
            <div
              className="form-field__addimg"
              onClick={() => {
                imgRef.current.click(() => {});
              }}
            >
              <BiImageAdd></BiImageAdd>
              <p>Thêm hình ảnh</p>
            </div>
            <div className="upload-image__img-list">
              {images?.map((item: any, idx: any) => (
                <div className="list-item" key={idx}>
                  <img src={item.image} alt="" />
                  <span
                    className="icons"
                    onClick={() => handleRemoveImage(item.name)}
                  >
                    <AiFillCloseCircle />
                  </span>
                </div>
              ))}
            </div>
          </div>
          {ARRAY_FORM_FIELD.map((item) => (
            <div key={item.name} className="form-field">
              <p>
                {item.isRequire && <span style={{ color: "red" }}> *</span>}
                {item.label}
              </p>
              <input
                name={item.name}
                type={item.type ? item.type : "text"}
                placeholder={item.placeholder}
                title={item.label}
                defaultValue={item?.value}
                onChange={(e: any) => formik.handleChange(e.target.value)}
              />
              {formik.errors[item.name] && formik.touched[item.name] && (
                <span className="mess-err">{`${
                  formik.errors[item.name]
                } *`}</span>
              )}
            </div>
          ))}
          <div className="form-field" style={{ position: "relative" }}>
            <p>Hãng sản phẩm</p>
            <Tippy
              interactiveBorder={0}
              trigger="click"
              arrow={false}
              interactive
              placement="bottom-start"
              offset={[0, 4]}
              content={
                <>
                  {bands?.map((item) => (
                    <p key={item?.id} onClick={() => setBandSelect(item.name)}>
                      {item?.name}
                    </p>
                  ))}
                </>
              }
            >
              <input
                name="band"
                type="text"
                title="h"
                placeholder="Chọn hãng hàng có sẵn"
                value={!bandSelect ? productEdit?.bandName : bandSelect}
                style={{ textTransform: "capitalize" }}
                readOnly
              />
            </Tippy>
            {formik.errors.bandName && formik.touched.bandName && (
              <span className="mess-err">{`${formik.errors.bandName} *`}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="duynhat">
              <p>Mô tả sản phẩm</p>
            </label>
            <textarea
              onChange={formik.handleChange}
              name="desc"
              id="duynhat"
              defaultValue={productEdit?.desc}
            ></textarea>
          </div>
          {/* <button type="submit">Submit!!</button> */}
          <Button
            size={{ width: "140px", height: "32px" }}
            color="#ee4d2d"
            border={true}
            text="Lưu và hiển thị"
            customClass="form-field-submit-btn"
            btn_type="submit"
          ></Button>
        </form>
      </div>
      <Loading isLoading={isLoading}></Loading>
    </div>
  );
};

export default SalesmanNewProduct;
