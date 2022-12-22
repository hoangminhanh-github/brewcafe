import React from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { MdPlace } from "react-icons/md";

import "./Footer.scss";
import BACKGROUNDIMAGE from "assets/image/footer.png";
import LOGO from "assets/image/logo.webp";
import FACEBOOK_IMAGE from "assets/image/socail/facebook.webp";
import INSTA_IMAGE from "assets/image/socail/instagram.webp";
import TWITTER_IMAGE from "assets/image/socail/twitter.webp";
import YOUTUBE_IMAGE from "assets/image/socail/youtube.webp";
const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        backgroundImage: `url(${BACKGROUNDIMAGE})`,
      }}
    >
      <div className="container footer-container">
        <img className="footer-logo" src={LOGO} alt="" />
        <p className="footer-slogan">
          Store online của chúng tôi luôn mang tới những sản phẩm tốt nhất với
          mức giá phù hợp nhất tới khách hàng. Đồng thời cũng là nơi chúng tôi
          chia sẻ một số kiến thức về cafe.
        </p>
        <div className="footer-contact">
          <ul>
            <p>Chính sách</p>
            <li>Chính sách bảo mật</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Quy định sử dụng</li>
          </ul>
          <ul>
            <p>Kênh bán hàng </p>
          </ul>
          <ul>
            <p>Về chúng tôi</p>
            <li>Trang chủ</li>
            <li>Manual brewing</li>
            <li>Manual grinder</li>
            <li>Flair espresso</li>
          </ul>
          <ul>
            <p>Liên hệ</p>
            <li className="footer-contact__contact-us">
              <MdPlace className="icons"></MdPlace>
              <p>Chung cư Millennium, 132 Bến Vân Đồn, P6 Q4 HCM</p>
            </li>
            <li className="footer-contact__contact-us">
              <AiFillPhone className="icons"></AiFillPhone>
              <p>0376495840</p>
            </li>
            <li className="footer-contact__contact-us">
              <AiOutlineMail className="icons"></AiOutlineMail>
              <p>anhhoangworks@gmail.com</p>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <img className="footer-socail-icons" src={FACEBOOK_IMAGE} alt="" />
          <img className="footer-socail-icons" src={INSTA_IMAGE} alt="" />
          <img className="footer-socail-icons" src={TWITTER_IMAGE} alt="" />
          <img className="footer-socail-icons" src={YOUTUBE_IMAGE} alt="" />
        </div>
        {/* bản quyền */}
        <div className="footer-license">
          <p>
            Bản quyền website thuộc về Brewshop. Cung cấp bởi <span>Sapo.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
