import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  onClickCallback, 
}) => {
  const { setIsClicked, initialState } = useStateContext();
  const handleClick = () => {
    // Call the onClickCallback function if it is provided
    if (onClickCallback) {
      onClickCallback();
    }

    // You can also keep your existing logic here if needed
    setIsClicked(initialState);
  };


  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
