import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../reducers/authSlicer";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authSlicer";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const MyCloud = () => {
  const [cookies] = useCookies();
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    // Check the type
    // consumer sidebar
    if (cookies.selectedType !== "provider") {
      setDisplayContent(
        <ul className="py-2">
          <Link to="./profile">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
          </Link>
          <Link to="./billing">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Billing
            </li>
          </Link>
          <Link to="./instances">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Instances
            </li>
          </Link>
        </ul>
      );
    }
    // provider sidebar
    else if (cookies.selectedType === "provider") {
      setDisplayContent(
        <ul className="py-2">
          <Link to="./profile">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
          </Link>
          <Link to="./inventory">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Inventory
            </li>
          </Link>
          <Link to="./invoice">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Invoice
            </li>
          </Link>
        </ul>
      );
    } else {
      setDisplayContent(
        <div>
          <h3>Type not recognized</h3>
          <p>Please set a LogIn Type.</p>
        </div>
      );
    }
  }, [cookies.selectedType]);

  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    
    localStorage.clear(); // Clears all data in localStorage
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookieParts = cookies[i].split("=");
      const cookieName = cookieParts[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white drop-shadow-xl dark:bg-[#42464D] p-8 rounded-lg w-56">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-100">My Cloud</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>

      {displayContent}

      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClickCallback={handleLogout}
        />
      </div>
    </div>
  );
};

export default MyCloud;
