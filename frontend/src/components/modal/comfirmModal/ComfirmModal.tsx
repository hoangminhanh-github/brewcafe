import Button from "components/button/Button";
import React, { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface IProps {
  customClass?: string;
  isOpen: boolean;
  size?: { width?: string; height?: string };
  type?: "confirm" | "delete";
  textHead?: string;
  textBody?: string;
  btnAgreeText?: string;
  btnDisAgreeText?: string;
  onAgree?: () => void;
  onDisAgree?: () => void;
}

import "./ComfirmModal.scss";
const Modal = ({
  customClass,
  isOpen = true,
  size = { width: "56%", height: "50%" },
  type = "confirm",
  textHead = "Change the text...",
  textBody = "Change the text...",
  btnAgreeText = "Đồng ý",
  btnDisAgreeText = "Hủy",
  onAgree,
  onDisAgree,
}: IProps) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);
  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);
  return (
    <div
      className={`modal-outline ${isOpenState ? "" : "hidden"}`}
      onClick={() => {
        setIsOpenState(false);
      }}
    >
      <div
        style={size}
        className={`modal ${customClass}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-content">
          <div className="modal-content__head">
            <div className="modal-content__head-text">{textHead}</div>
            <RiCloseCircleFill
              onClick={() => {
                setIsOpenState(false);
              }}
            />
          </div>
          <div className="modal-content__body">{textBody}</div>
          <div className="modal-content__footer">
            <Button onClick={onAgree} text={btnAgreeText} customClass={type} />
            <Button onClick={onDisAgree} text={btnDisAgreeText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
