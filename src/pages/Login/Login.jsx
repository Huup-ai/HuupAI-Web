import React from "react";
import "./Login.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  loginUser,
  registerUser,
  loginProvider,
  addWallet,
  getWallet,
  googleSignIn,
} from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, hasExternalWallet } from "../../reducers/authSlicer";
import { useNavigate } from "react-router-dom";
import Logo from "../../data/Logo.png";
import { API_KEY, sponsorAddress } from "../../Address";
import { faucetContract } from "../../ethereum/faucet";
import { contractAddress, customerToken } from "../../Address";
import { ethers } from "ethers";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // password visibility
  const [selectedType, setSelectedType] = useState("customer");
  const [metaAddress, setMetaAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [isChecked, setIsChecked] = useState(true);
  const [loginType, setLoginType] = useState(null);
  
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const externalWallet = useSelector((state) => state.auth.externalWallet);
  // console.log("ex", externalWallet)
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["walletAddress"]);

  const walletAddress = cookies.walletAddress || null;

  const updateWalletAddress = (address) => {
    setCookie("walletAddress", address, { path: "/" });
  };
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [showWalletConnectButton, setShowWalletConnectButton] = useState(false);

  const {
    FunWallet,
    Auth,
    configureEnvironment,
    generatePrivateKey,
    Goerli,
  } = require("@funkit/core");

  // Generate a private key for the wallet
  const PRIVATE_KEY = generatePrivateKey();
  // console.log("PRIVATE_KEY:", PRIVATE_KEY);

  const options = {
    chain: Goerli,
    gasSponsor: {
      sponsorAddress: sponsorAddress,
    },
    apiKey: API_KEY,
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '857153619993-12tmpju7pdq3oqoqvhvkg2iv7dr2i5qs.apps.googleusercontent.com', 
        // callback: handleGoogleSignIn,
        callback: (googleCredential) => handleGoogleSignIn(googleCredential, true),
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectedType(e.target.value);
    setCookie("selectedType", e.target.value, { path: "/" });
  };

  // Configure the environment with the specified options
  configureEnvironment(options);
  
 
const connectWallet = async () => {
  console.log("Attempting to connect wallet...");

  if (isWalletConnecting) {
    console.log("Wallet connection already in progress.");
    return false;
  }

  setIsWalletConnecting(true);

  if (window.ethereum) {
    console.log("Ethereum object found.");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("Requesting account access...");
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Accounts received:", accounts);
      setMetaAddress(accounts[0]);
      setCookie("walletAddress", accounts[0], { path: "/" });
      console.log("Wallet connected:", accounts[0]);
      setIsWalletConnecting(false);
      return true;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setIsWalletConnecting(false);
      return false;
    }
  } else {
    console.log("MetaMask is not installed.");
    setIsWalletConnecting(false);
    return false;
  }
};


const handleGoogleSignIn = async (googleCredential, connectWalletAfterSignIn = false) => {
  try {
    const data = await googleSignIn(googleCredential.credential);
    if (data && data.jwt_token) {
      dispatch(loginSuccess(data.jwt_token));
      localStorage.setItem('jwtToken', data.jwt_token);
      console.log("Google Sign-In processed successfully.");

      if (connectWalletAfterSignIn) {
        const walletConnected = await connectWallet();
        if (walletConnected) {
          dispatch(hasExternalWallet());
          navigate("/clouds");
        } else {
          console.error("Failed to connect to the wallet.");
        }
      } else {
        navigate("/clouds");
      }
    } else {
      console.error('Google Sign-In failed:', data ? data.message : 'No response');
    }
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
  }
};

const initiateGoogleSignIn = (connectWalletAfterSignIn = false) => {
  window.google.accounts.id.prompt(); // This triggers the Google Sign-In prompt
  // The response will be handled by the callback set in the useEffect
};

const handleGoogleAndWalletSignIn = async (event) => {
  event.preventDefault();
  window.google.accounts.id.prompt(async (notification) => {
    if (notification.isDisplayMoment()) {
      const signInSuccess = await handleGoogleSignIn(notification.getCredential());
      if (signInSuccess) {
        console.log("Google Sign-In successful. Now connecting wallet...");
        const walletConnected = await connectWallet();
        if (walletConnected) {
          dispatch(hasExternalWallet());
          navigate("/clouds");
        } else {
          console.error("Failed to connect to the wallet.");
        }
      } else {
        console.error("Google Sign-In failed.");
      }
    }
  });
};


  return (
    <div className="Alert">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname w-64">
          <h1>Huup AI</h1>
          <p className="text-xl">Explore your Market Cloud</p>
          <p className="text-sm">
            Green AI - Infrastructure for AI Democratization, Efficiency and
            Privacy{" "}
          </p>
          
        </div>
      </div>
      <div>
      <form className="infoForm authForm">
        <div className="typeSelect rounded-t-xl " >
          <button
            onClick={handleSelectChange}
            value="customer"
            className={`px-6 py-3 mt-2 ${selectedType === "customer" ? "bg-white rounded-t-xl py-4" : "bg-gray-200 rounded-t-lg" }`}
          >
            Customer
          </button>
          <button
            onClick={handleSelectChange}
            value="provider"
            className={`px-6 py-3 mt-2 ${selectedType === "provider" ? "bg-white rounded-t-xl py-4" : "bg-gray-200 rounded-t-lg "}`}
          >
            Provider
          </button>
        </div>

        <div className="flex align-middle">
          <h3>Log In </h3>
        </div>

      <div>
        <div id="googleSignInButton" className="google-button"></div>

        <button 
          onClick={() => initiateGoogleSignIn(true)}
          type="button"
          className="button infoButton font-normal w-72"
          disabled={isWalletConnecting}
        >
          Login with Gmail & Crypto Wallet
        </button>
      </div>
        <div className="px-4">
          <p className="text-xs">
            {" "}
            If you are provider, please contact@huupai.xyz to obtain login
            access.
          </p>
        </div>
        <div className="px-4">
        
        </div>
      </form>
    </div>
      
    </div>
  );
};


export default Login;