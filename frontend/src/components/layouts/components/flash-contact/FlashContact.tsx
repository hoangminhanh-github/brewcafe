import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { SiZalo } from "react-icons/si";
import "./FlashContact.scss";
const FLASH_CONTACT_IMG = require("assets/image/flash-contact.webp");
const FlashContact = () => {
  return (
    <div className="flash-contact">
      <img src={FLASH_CONTACT_IMG} alt="" />
      <div className="wrap-icons flash-contact__icons phone">
        <FiPhoneCall></FiPhoneCall>
        <span className="number">0376495840</span>
      </div>
      <div className="wrap-cons flash-contact__icons mess">
        <RiMessengerLine></RiMessengerLine>
      </div>
      <div className="wrap-cons flash-contact__icons zalo">
        <SiZalo></SiZalo>
      </div>
    </div>
  );
};

export default FlashContact;
