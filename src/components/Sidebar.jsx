import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar } from "../components";

import { links, provider } from "../data/dummy";
import { useCookies } from "react-cookie";
import { useStateContext } from "../contexts/ContextProvider";
// import { fabClasses } from "@mui/material";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };


  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const [cookies] = useCookies(['selectedType']);
  const [displayContent, setDisplayContent] = useState(false);
  useEffect(() => {
    setDisplayContent(cookies.selectedType === 'provider'); 
  }, [cookies.selectedType]);



  const Consumer = [
    <div className="mt-20 ">
      {links.map((item) => (
        <div key={item.title}>
          <p className="text-gray-400 dark:text-gray-400 m-3 mt-20 uppercase">
            {item.title}
          </p>
          {item.links.map((link) => (
            <NavLink
              to={`/clouds/${link.name}`}
              key={link.name}
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {link.icon}
              <span className="capitalize text-m">{link.name}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>,
  ];

  const Provider = [
    <div className="mt-20 ">
      {provider.map((item) => (
        <div key={item.title}>
          <p className="text-gray-400 dark:text-gray-400 m-3 mt-20 uppercase">
            {item.title}
          </p>
          {item.links.map((link) => (
            <NavLink
              to={`/clouds/${link.name}`}
              key={link.name}
        
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {link.icon}
              <span className="capitalize text-m">{link.name}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>,
  ];



  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => setActiveMenu(false)}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware className="text-4xl mt-20" />{" "}
              <span className="text-4xl mt-20">HuupAI</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={handleCloseSideBar}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
         
        </>
      )}
      {displayContent ? (
        <>{Provider}</>
      ) : (
        <>{Consumer}</>
      )}
    </div>
  );
};

export default Sidebar;
