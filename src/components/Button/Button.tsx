import { useState } from "react";
import "./Button.css";

interface ButtonProps {
  children: JSX.Element | string;
  onClick: () => void;
  contained?: boolean;
  className?: string;
}

const Button = ({ children, onClick, contained = false }: ButtonProps) => {
  const [clicked, setClicked] = useState(false);

  const getColorStyle = () => {
    const notClickedStyle = { color: "#FF8989" };
    const clickedStyle = { color: "#FFF", backgroundColor: "#FF8989" };

    if (!contained) return {};
    if (!clicked) return notClickedStyle;
    return clickedStyle;
  }

  const handleClick = () => {
    onClick();
    if (contained) setClicked(!clicked);
  }

  return (
    <button
      className={`button ${contained ? "contained" : ""}`}
      onClick={handleClick}
      style={getColorStyle()}
    >
      {children}
    </button>
  );
};

export default Button;
