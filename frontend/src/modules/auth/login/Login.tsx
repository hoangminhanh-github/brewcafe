import Button from "components/button/Button";
import "./Login.scss";
import { setUserRD } from "../redux/authSlice";
import { ROUTES } from "configs/Router";
import { IAppState } from "redux/reducer";
import {
  WARNING_TOKEN_MESSAGE,
  arrPermission,
  ACCESS_TOKEN,
  APIHost,
} from "utils";
import API_PATHS from "configs/api";
import { fetchThunk } from "common/authThunk";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FiUserPlus } from "react-icons/fi";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<IAppState, null, Action<string>>>();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [permission, setPermission] = useState<string | number>();
  const handleSubmit = async () => {
    try {
      const res = await axios.post(API_PATHS.auth, {
        email,
        password,
        permission,
      });
      const info = res.data;
      Cookies.set(ACCESS_TOKEN, res.data.token, { expires: 2 });
      dispatch(setUserRD(info));
      navigate(ROUTES.home);
    } catch {
      alert("Đăng nhập thất bại");
    }
  };
  const handleLoginPermission = (e: any) => {
    setPermission(e.target.value);
  };

  return (
    <div className="Login">
      <div className="container login-content">
        <div className="login-left">
          <h4>Đăng ký</h4>
          <p>
            Tạo tài khoản để quản lý đơn hàng, và các thông tin thanh toán, gửi
            hàng một cách đơn giản hơn.
          </p>
          <Button
            text="TẠO TÀI KHOẢN"
            size={{ width: "130px", height: "30px" }}
            onClick={() => {
              navigate(ROUTES.register);
            }}
          ></Button>
        </div>
        <div className="login-right">
          <h4>Đăng nhập</h4>
          <p>Nếu bạn có tài khoản, hãy đăng nhập dưới đây.</p>
          <label htmlFor="login-left-email">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="login-left-email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            type="text"
            placeholder="Email..."
          />
          <label htmlFor="login-left-pass">
            Mật khẩu <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="login-left-pass"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
            placeholder="Mật khẩu..."
          />

          <Tippy
            interactiveBorder={0}
            trigger="click"
            arrow={false}
            interactive
            placement="bottom-start"
            content={arrPermission.map((item) => (
              <div key={item} className="login-right__permission-item">
                <input
                  name="permission"
                  id={item}
                  type="radio"
                  title={item}
                  value={item}
                  onChange={(e) => handleLoginPermission(e)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          >
            <div className="login-right__permission">
              Đăng nhập với tư cách là : <span style={{ color: "red" }}>*</span>
              <span>{permission ? permission : "chưa chọn"}</span>
              <p>Sẽ mặc định là User</p>
            </div>
          </Tippy>
          <div className="login-right__btn">
            <Button
              onClick={handleSubmit}
              text="ĐĂNG NHẬP"
              size={{ width: "100px", height: "30px" }}
            ></Button>
            <a onClick={() => alert("Mất thì chịu thôi chứ biết sao :)")}>
              Mất mật khẩu?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
