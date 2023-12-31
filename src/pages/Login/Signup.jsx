import React from "react";
import "./Login.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
    loginUser,
    registerUser,
    loginProvider,
    addWallet,
    getWallet,
  } from "../../api";
import { loginSuccess, hasExternalWallet } from "../../reducers/authSlicer";
import Logo from "../../data/Logo.png";
import { API_KEY, sponsorAddress } from "../../Address";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { faucetContract } from "../../ethereum/faucet";

function SignUp({
    onLoginClick,
    // navigate,
    // createWallet,
    // isChecked,
    // setIsChecked,
    SignUpLogin,
  }) {
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpass: "",
      // walletAddress: "",
      is_provider: false,
    });
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // password visibility
    const [selectedType, setSelectedType] = useState("customer");
    const [metaAddress, setMetaAddress] = useState("");
    const [signer, setSigner] = useState();
    const [fcContract, setFcContract] = useState();
    const [isChecked, setIsChecked] = useState(true);
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
  
const {
      FunWallet,
      Auth,
      configureEnvironment,
      generatePrivateKey,
    } = require("@funkit/core");

// Generate a private key for the wallet
const PRIVATE_KEY = generatePrivateKey();
// console.log("PRIVATE_KEY:", PRIVATE_KEY);
  
const options = {
    chain: "goerli",
    gasSponsor: {
    sponsorAddress: sponsorAddress,
    },
    apiKey: API_KEY,
};
configureEnvironment(options);

const createWallet = async () => {
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
        const walletResponse = await addWallet(walletAddress, true, token); // Since it's provider, setting is_provider to true
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
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);
        /* set active wallet address */
        setMetaAddress(accounts[0]);
        /* get signer */
        updateWalletAddress(metaAddress);
        // updateWalletAddress(accounts[0]);
        setSigner(provider.getSigner());
        /* local contract instance */
        setFcContract(faucetContract(provider));
        console.log("connected", accounts[0]);
      } catch (err) {
        console.log("err", err.messgae);
        alert(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
      alert("Please install MetaMask");
    }
  };

const handleWalletLogin = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (selectedType === "provider") {
        response = await loginProvider(email, password);
      } else {
        response = await loginUser(email, password);
      }
      //JWT
      //const token = response.data.token;
      //localStorage.setItem('jwtToken', token); // storing token in localStorage

      console.log("outside");
      console.log("Received response: ", response);

      // Check if the response is as expected. This is a placeholder.
      // You need to replace this with an acter logged in succeual check based on your API's response.
      if (response && response.status === 200) {
        const data = await response.json();
        const token = data.access; // Assuming the token is directly on the response object
        console.log(token);
        localStorage.setItem("jwtToken", token); // storing token in localStorage
        await connectWallet();
        console.log("Login successful", response);
        setEmail("");
        setPassword("");
        dispatch(loginSuccess());

        dispatch(hasExternalWallet());
        navigate("/clouds");
      } else {
        // Handle login failure, perhaps pop up an error message
        console.error("Login failed: ", response.message);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmpass) {
        alert("Passwords do not match!");
        return;
      }
      // console.log(formData);
  
      const dataToSend = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        is_provider: formData.is_provider,
        company: formData.company,
        // walletAddress: formData.walletAddress,
        payment_method: formData.payment_method,
        card_number: formData.card_number,
        card_exp: formData.card_exp,
        card_name: formData.card_name,
        tax: formData.tax,
        role: formData.role,
      };
  
      const response = await registerUser(
        formData.email,
        formData.password,
        dataToSend
      );
      console.log(response);
  
      if (response.message === "User registered successfully") {
        alert(response.message);
  
        const loginResponse = await loginUser(formData.email, formData.password);
  
        if (loginResponse && loginResponse.status === 200) {
          // Handle successful login, e.g., store token, dispatch actions, etc.
          const data = await loginResponse.json();
          const token = data.access;
          localStorage.setItem("jwtToken", token);
          if (isChecked) {
            await createWallet(); // create wallet
          }
  
          dispatch(loginSuccess());
          navigate("/clouds");
        } else {
          // Handle login failure after registration
          console.error("Auto-login failed after registration.");
        }
  
        alert(response.message);
      } else {
        alert("Registration failed!");
      }
    };


return (
    <div>
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
        <form className="infoForm authForm md:p-4" onSubmit={handleSubmit}>
          <div>
            <h3 className="mt-4">Sign Up</h3>
  
            <div className="mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span>Create a built-in wallet</span>
            </div>
          </div>
  
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
  
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <input
              type="email"
              className="infoInput"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              value={formData.confirmpass}
              onChange={handleChange}
            />
          </div>

          <div>
            <p className="text-xs">
              Already have an account?{" "}
              <span
                onClick={() => navigate('/login')}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Login
              </span>
            </p>
          </div>
          <button
            onClick={SignUpLogin}
            className="button infoButton w-24"
            type="submit"
          >
            Signup
          </button>
        </form>
        </div>
      </div>
      </div>
);
  }

export default SignUp;