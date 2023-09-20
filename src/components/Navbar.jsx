import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
// import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
// import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// import avatar from "../data/avatar.jpg";
// import wenxuan from "../data/wenxuan.jpg";

import { Market, MyCloud, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setIsClicked,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  const [cookies] = useCookies(["selectedType"]);
  const [displayContent, setDisplayContent] = useState(false);

  const Consumer = [
    <div className="flex ml-20 relative">
      <NavButton
        title="Market"
        customFunc={() => handleClick("Market")}
        color={currentColor}
        icon={<AiOutlineHome />}
      />
      <NavButton
        title="MyCloud"
        // dotColor="#03C9D7"
        customFunc={() => handleClick("MyCloud")}
        color={currentColor}
        icon={<BsPerson />}
      />
      <NavButton
        title="Alert"
        // dotColor="rgb(254, 201, 15)"
        customFunc={() => handleClick("userProfile")}
        color={currentColor}
        icon={<RiNotification3Line />}
      />
      {isClicked.Market && <Market />}
      {isClicked.MyCloud && <MyCloud />}
      {isClicked.userProfile && <UserProfile />}
    </div>,
  ];

  const Provider = [
    <div className="flex ml-20 relative">
      <NavButton
        title="MyCloud"
        // dotColor="#03C9D7"
        customFunc={() => handleClick("MyCloud")}
        color={currentColor}
        icon={<BsPerson />}
      />
      <NavButton
        title="Alert"
        // dotColor="rgb(254, 201, 15)"
        customFunc={() => handleClick("userProfile")}
        color={currentColor}
        icon={<RiNotification3Line />}
      />
      {isClicked.MyCloud && <MyCloud />}
      {isClicked.userProfile && <UserProfile />}
    </div>,
  ];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    setDisplayContent(cookies.selectedType === "provider");
  }, [cookies.selectedType]);


  return (
    <div className="flex justify-start p-2 md:ml-6 md:mr-6 relative ">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      {displayContent ? <>{Provider}</> : <>{Consumer}</>}
    </div>
  );
};

export default Navbar;
