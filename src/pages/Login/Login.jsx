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


// '857153619993-12tmpju7pdq3oqoqvhvkg2iv7dr2i5qs.apps.googleusercontent.com', 
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
        callback: handleGoogleSignIn,
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

  // const handleSelectChange = (e) => {
  //   e.preventDefault();
  //   const newValue = e.target.value;
  //   // setType(newValue);
  //   setSelectedType(newValue);
  //   setCookie("selectedType", newValue, { path: "/" });
  // };
  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectedType(e.target.value);
    setCookie("selectedType", e.target.value, { path: "/" });
  };

  // Configure the environment with the specified options
  configureEnvironment(options);
  
  const createWallet = async (is_provider) => {
    try {
      const auth = new Auth({ privateKey: PRIVATE_KEY });
      
      const funWallet = new FunWallet({
        users: [{ userId: await auth.getAddress() }],
        uniqueId: await auth.getWalletUniqueId(),
      });
      
      const userOp = await funWallet.create(auth, await auth.getAddress());
      const walletAddress = userOp.walletAddr;
      updateWalletAddress(walletAddress);
      
      const token = localStorage.getItem("jwtToken");

      // Send Wallet Address to backend
      const walletResponse = await addWallet(walletAddress, is_provider, token); 
      // console.log("store", walletResponse)

      // Validate if the response from addWallet indicates success
      if (!walletResponse || walletResponse.error) {
          throw new Error('Failed to save the wallet address to the backend.');
      }

      console.log("Wallet Address saved:", walletAddress);
      return walletAddress; // Returning the new wallet address
    } catch (error) {
      console.error("Error creating wallet:", error);
      throw error;  // Propagate the error to be handled in the calling function
    }
};
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

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const initiateGoogleSignIn = async () => {
  //   return new Promise((resolve) => {
  //     window.google.accounts.id.prompt(async (response) => {
  //       if (!response.isNotDisplayed() && !response.isSkippedMoment()) {
  //         const googleSignInSuccess = await handleGoogleSignIn(response);
  //         resolve(googleSignInSuccess);
  //       } else {
  //         resolve(false);
  //       }
  //     });
  //   });
  // };

  // const handleLoginClick = async (e) => {
  //   e.preventDefault();
    
  //   const googleSignInSuccess = await initiateGoogleSignIn();
  //   if (googleSignInSuccess) {
  //     const walletConnected = await connectWallet();
  //     if (walletConnected) {
  //       dispatch(hasExternalWallet());
  //       navigate("/clouds");
  //     }
  //   }
  // };


  // Regular Gmail sign-in
  // const handleGoogleSignIn = async (googleResponse) => {
  //   try {
  //     console.log("Processing Google Sign-In response...");
  //     const data = await googleSignIn(googleResponse.credential);
  //     dispatch(loginSuccess(data.jwt_token));
  //     localStorage.setItem('jwtToken', data.jwt_token);
  //     console.log("Google Sign-In processed successfully.");
  //     return true;
  //   } catch (error) {
  //     console.error('Error during Google Sign-In:', error);
  //     return false;
  //   }
  // };
  const handleGoogleSignIn = async (googleCredential) => {
    try {
      console.log("Processing Google Sign-In response...");
      // Call your googleSignIn function with the Google credential token
      const data = await googleSignIn(googleCredential.credential);
  
      // Check for successful response
      if (data && data.jwt_token) {
        dispatch(loginSuccess(data.jwt_token));
        localStorage.setItem('jwtToken', data.jwt_token);
        console.log("Google Sign-In processed successfully.");
  
        // After Google Sign-In, try to connect the wallet
        const walletConnected = await connectWallet();
        if (walletConnected) {
          dispatch(hasExternalWallet());
          navigate("/clouds");
        } else {
          console.error("Failed to connect to the wallet.");
        }
        return true;
      } else {
        console.error('Google Sign-In failed:', data ? data.message : 'No response');
        return false;
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      return false;
    }
  };

  const handleWalletConnection = async () => {
    const walletConnected = await connectWallet();
    if (walletConnected) {
      dispatch(hasExternalWallet());
      navigate("/clouds");
    }
  };

  const handleWalletLogin = async (e) => {
    e.preventDefault();
  
    window.google.accounts.id.prompt(async (googleResponse) => {
      if (googleResponse && googleResponse.credential) {
        // Process Google Sign-In
        const googleSignInSuccess = await handleGoogleSignIn(googleResponse);
        if (googleSignInSuccess) {
          // After successful Google Sign-In, initiate wallet connection
          const walletConnected = await connectWallet();
          if (walletConnected) {
            // If wallet connection is successful, navigate to /clouds
            dispatch(hasExternalWallet());
            navigate("/clouds");
          } else {
            console.error("Failed to connect to the wallet.");
          }
        } else {
          console.error("Google Sign-In failed.");
        }
      } else {
        console.log("Google Sign-In was cancelled or failed.");
      }
    });
  };

  // const handleWalletLogin = async (googleResponse) => {
  //   try {
  //     console.log("Processing Google Sign-In response...");
  //     const response = await googleSignIn(googleResponse.credential);
  //     if (response.status === 200) {
  //       // Process successful Google Sign-In
  //       dispatch(loginSuccess());
  //       localStorage.setItem('jwtToken', response.data.jwt_token);
  //       console.log("Google Sign-In processed successfully.");

  //       // Immediately attempt to connect wallet
  //       await handleWalletConnection();
  //     } else {
  //       // Handle Google Sign-In failure
  //       console.error('Google Sign-In failed:', response.message);
  //       alert("Google Sign-In failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error('Error during Google Sign-In:', error);
  //     alert("Google Sign-In failed. Please try again.");
  //   }
  // };

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
          {/* console.log({FunWallet}) */}
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

        {/* <div className="px-4">
          <input
            type="email"
            placeholder="Email"
            className="infoInput"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}

        {/* <div className="px-4">
          <input
            type={showPassword ? "text" : "password"}
            className="infoInput"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button
            type="button"
            onClick={toggleShowPassword}
            className="password-toggle-button"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div> */}

        {/* <div className="px-4">
          <p className="text-xs">
            Don't have an account?{" "}
            <span
              onClick={onSignupClick}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Signup
            </span>
          </p>
        </div> */}

      <div>
        <div id="googleSignInButton" className="google-button"></div>

        <button 
        onClick={() => window.google.accounts.id.prompt()}
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