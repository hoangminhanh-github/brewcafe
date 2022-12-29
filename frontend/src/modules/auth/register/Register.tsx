import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./Register.scss";
import axios from "axios";
import API_PATHS from "configs/api";
import InputField from "./components/InputField";
import { arrPermission } from "utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/Router";
import Button from "components/button/Button";
const Register = () => {
  const navigate = useNavigate();
  const [permission, setPermission] = useState<string>("User");
  const inputField = ["name", "email", "password", "confirmPassword", "age"];
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      permission: "",
      avatar: "",
      age: 0,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Nhập trường này chưa ???"),
      password: Yup.string().required("Nhập trường này chưa???"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      age: Yup.number().required("Trường này nhập số"),
    }),
    onSubmit: async (values) => {
      try {
        values.permission = permission;
        values.age = +values.age;
        await axios.post(API_PATHS.register, values);
        alert("Đăng kí thành công");
        navigate(ROUTES.login);
      } catch {
        alert("Đăng kí thất bại.Email người dùng có thể đã tồn tại");
      }
    },
  });
  return (
    <div className="register">
      <div className="container">
        <h5>Đăng ký</h5>
        <p>Nếu bạn chưa có tài khoản hãy điền theo mẫu dưới đây để đăng ký.</p>
        <div className="register-content">
          <form action="" onSubmit={formik.handleSubmit}>
            {inputField.map((item) => (
              <InputField key={item} formik={formik} name={item}></InputField>
            ))}
            <div className="register-content__permission">
              <p>
                Đăng kí với tư cách : {permission ? permission : " User"}
                <span style={{ color: "red" }}> *</span>
              </p>
              {arrPermission.map((item) => (
                <span key={item} className="items">
                  <input
                    name="register"
                    id={`register-${item}`}
                    type="radio"
                    title={item}
                    value={item}
                    checked={item == permission ? true : false}
                    onChange={(e) => setPermission(e.target.value)}
                  />
                  <label htmlFor={`register-${item}`}>{item}</label>
                </span>
              ))}
            </div>
            <Button text="Đăng kí"></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
