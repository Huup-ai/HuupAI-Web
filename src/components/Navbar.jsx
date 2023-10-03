import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
// import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
// import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { addWallet } from "../api";
import { Button } from "../components";

import { faucetContract } from "../ethereum/faucet";
import { contractAddress, customerToken } from "../Address";
import { ethers } from "ethers";

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

const Navbar = ({ currentPage }) => {
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

  // const [walletAddress, setWalletAddress] = useState("");
  const [walletCookie, setWalletCookie] = useCookies(["walletAddress"]);
  const [metaAddress, setMetaAddress] = useState("");

  const updateWalletAddress = (address) => {
    // console.log("enter")
    // Set the updated cookie value
    setWalletCookie("walletAddress", address, { path: "/" });
    if (address !== "undefined") {
      const token = localStorage.getItem("jwtToken");

      const walletres = addWallet(
        address,
        cookies.selectedType === "provider",
        token
      );

      // console.log("wwresnav", walletres);
    }
  };

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [metaAddress]);

  useEffect(() => {
    setDisplayContent(cookies.selectedType === "provider");
  }, [cookies.selectedType]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      if (walletCookie.walletAddress === "undefined") {
        try {
          /* get provider */
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          /* get accounts */
          const accounts = await provider.send("eth_requestAccounts", []);
          /* set active wallet address */
          setMetaAddress(accounts[0]);
          /* get signer */

          // update wallet address in cookie
          updateWalletAddress(metaAddress);

          console.log("connected", metaAddress);
        } catch (err) {
          console.log("err", err.messgae);
          alert(err.message);
        }
      } else {
        console.log("wallet already connected", walletCookie.walletAddress);
        alert("wallet already connected");
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
      alert("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setMetaAddress(accounts[0]);
          // console.log(accounts[0]);
          updateWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setMetaAddress(accounts[0]);
        updateWalletAddress(accounts[0]);

        // console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setMetaAddress("");
      console.log("Please install MetaMask");
    }
  };

  return (
    <div className="flex justify-between px-2 pt-2 md:ml-6 md:mr-6 relative ">
      <div className="flex justify-start ">
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />

        {displayContent ? <>{Provider}</> : <>{Consumer}</>}
      </div>

      <div className="mt-2">
        <button
          type="button"
          className=" hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
          style={{ background: currentColor }}
          onClick={connectWallet}
        >
          <span>
            {walletCookie.walletAddress !== "undefined"
              ? `Wallet Connected: ${walletCookie.walletAddress}`
              : "Connect Wallet"}
            {/* {walletCookie.walletAddress} */}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
