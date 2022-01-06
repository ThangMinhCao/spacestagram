import { useState } from "react";
import "./Button.css";

interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => void;
  color: string;
  clicked?: boolean;
  contained?: boolean;
  className?: string;
}

const Button = ({ children, onClick, color, clicked, contained = false }: ButtonProps) => {
  const getColorStyle = () => {
    const notClickedStyle = { color: color };
    const clickedStyle = { color: "#FFF", backgroundColor: color };

    if (!contained || !clicked) return notClickedStyle;
    return clickedStyle;
  }

  return (
    <button
      className={`button ${contained ? "contained" : ""}`}
      onClick={onClick}
      style={getColorStyle()}
    >
      {children}
    </button>
  );
};

export default Button;
