import Button from "components/button/Button";
import { ROUTES } from "configs/Router";
import Cookies from "js-cookie";
import { setUserRD } from "modules/auth/redux/authSlice";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IAppState } from "redux/reducer";
import { ACCESS_TOKEN } from "utils";

import "./Header.scss";
const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN);
    dispatch(setUserRD({ data: {}, token: {} }));
  };

  const user: any = useSelector((state: IAppState) => state.auth.user);
  return (
    <div className="header">
      <div className="header-top">
        <div className="container header-top__container">
          <p>
            Chào mừng <>{user?.name ? user.name : "bạn"}</> đã đến với Brew Shop
            Cafe!
          </p>

          <div className="header-input">
            <div>
              <input placeholder="tìm kiếm..." />
              <BiSearch className="header-input__icon"></BiSearch>
            </div>
            <div className="header-login-register">
              {user?.name ? (
                <>
                  <Link to="/">Tôi</Link>
                  <Link to="/" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </>
              ) : (
                <>
                  <Link to={ROUTES.login}>Đăng nhập</Link>
                  <Link to={ROUTES.register}>Đăng kí</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container header-bottom__container">
          <div className="header-bottom__logo">
            <Link to={ROUTES.home}>
              <img
                src="/logo.webp"
                alt=""
                className="header-bottom__logo-img"
              />
            </Link>
          </div>
          <div className="header-bottom__navbar">
            <Link className="header-bottom__navbar-item" to={ROUTES.home}>
              Trang chủ
            </Link>

            <Link
              className="header-bottom__navbar-item"
              to={ROUTES.manual_brewing}
            >
              Manual brewing
            </Link>
            <Link
              className="header-bottom__navbar-item"
              to={ROUTES.manual_grinder}
            >
              Manual grinder
            </Link>
            <Link
              className="header-bottom__navbar-item"
              to={ROUTES.manual_cafe}
            >
              Ấm pha cafe
            </Link>
            {user.permission != "User" && (
              <Link to={ROUTES.salesman} className="header-bottom__navbar-item">
                Kênh người bán
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
