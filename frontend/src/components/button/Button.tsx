import React, { useRef } from "react";

import "./Button.scss";
interface IProps {
  btn_type?: "button" | "submit" | "reset" | undefined;
  customClass?: string;
  type?: string;
  color?: string;
  size?: {
    frontSize?: string;
    width?: string;
    height?: string;
  };
  text?: string;
  border?: boolean;
  textcolor?: string;
  onClick?: () => void;
}

const Button = ({
  customClass = "",
  type = "primary",
  color = "#453728",
  size = { width: "121px", height: "32px" },
  text = "Button",
  textcolor = "white",
  border = false,
  btn_type = "button",
  onClick,
}: IProps) => {
  return (
    <button
      className={`btn ${type} ${customClass}`}
      style={{
        fontSize: `${size.frontSize}`,
        backgroundColor: `${color}`,
        height: `${size?.height}`,
        width: `${size?.width}`,
        color: `${textcolor}`,
        borderRadius: `${border ? "4px" : ""}`,
      }}
      type={btn_type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
