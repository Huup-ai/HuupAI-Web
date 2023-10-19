import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from ".";
import { useSelector, useDispatch } from "react-redux";
// import { userProfileData } from '../data/dummy';
import { useStateContext } from "../contexts/ContextProvider";
import wenxuan from "../data/wenxuan.jpg";
import { logout } from "../reducers/authSlicer";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // const handleLogout = async () => {
    
  //   localStorage.clear(); // Clears all data in localStorage
  //   const cookies = document.cookie.split("; ");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookieParts = cookies[i].split("=");
  //     const cookieName = cookieParts[0];
  //     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //   }

  //   dispatch(logout());
  //   navigate("/login");
  // };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white drop-shadow-xl dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={wenxuan}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            Wenxuan Wu{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> Client </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
          </p>
        </div>
      </div>

      {/* <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClickCallback={handleLogout}
        />
      </div> */}
    </div>
  );
};

export default UserProfile;
