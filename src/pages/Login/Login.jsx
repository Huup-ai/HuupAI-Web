import React from "react";
import "./Login.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { loginUser, registerUser, loginProvider } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../reducers/authSlicer";
import { useNavigate } from "react-router-dom";
import Logo from "../../data/Logo.png";
import { API_KEY, sponsorAddress } from "../../Address";

// import { someFunction } from '@fun-xyz/core';
// import { ethers } from "ethers";
// import {faucetContract} from "../../ethereum/faucet";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // password visibility
  const [selectedType, setSelectedType] = useState("");
  
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['walletAddress']);
  const walletAddress = cookies.walletAddress || null;

  const updateWalletAddress = (address) => {
    setCookie('walletAddress', address, { path: '/' });
  };

  const {
    FunWallet,
    Auth,
    configureEnvironment,
    generatePrivateKey,
  } = require("@funkit/core");

  // Generate a private key for the wallet
  const PRIVATE_KEY = generatePrivateKey();

  const options = {
    chain: "goerli",
    gasSponsor: {
      sponsorAddress: sponsorAddress,
    },
    apiKey: API_KEY,
  };

  // Configure the environment with the specified options
 configureEnvironment(options);

 const createWallet = async (event) => {
  event.preventDefault();
  const auth = new Auth({ privateKey: PRIVATE_KEY });

  try {
    // Create a FunWallet instance for the user
    const funWallet = new FunWallet({
      users: [{ userId: await auth.getAddress() }],
      uniqueId: await auth.getWalletUniqueId(),
    });

    // Create a user operation
    const userOp = await funWallet.create(auth, await auth.getAddress());
    // console.log("OP", userOp)

    // deploy wallet
    // await funWallet.executeOperation(auth, userOp);

    // Extract the wallet address from userOp
    const walletAddress = userOp.walletAddr;

    // Store the wallet address in a cookie
    updateWalletAddress(walletAddress);

    console.log('Wallet Address:', walletAddress);
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
};


  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (selectedType === "provider") {
        response = await loginProvider(email, password);
      } else {
        response = await loginUser(email, password);
      }

      console.log("Login successful", response);
      setEmail("");
      setPassword("");
      dispatch(loginSuccess());
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          {/* console.log({FunWallet}) */}
        </div>
      </div>
      <div>
        {/* <h2>{isLogin ? "Login" : "Signup"}</h2> */}
        {isLogin ? (
          <LogIn
            onSignupClick={() => setIsLogin(false)}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLoginClick={handleLoginClick}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            createWallet={createWallet}
            // onLogin={handleLogin}
          />
        ) : (
          <SignUp
            onLoginClick={() => setIsLogin(true)}
            navigate={navigate} // pass navigate function to SignUp component
          />
        )}
      </div>

      {/* <LogIn />
      <SignUp /> */}
    </div>
  );
};
function LogIn({
  onSignupClick,
  // onLogin,
  email,
  setEmail,
  password,
  setPassword,
  onLoginClick,
  showPassword,
  toggleShowPassword,
  selectedType,
  setSelectedType,
  createWallet,
}) {
  // const [selectedType, setSelectedType] = useState(" ");
  // const [selectedWay, setSelectedWay] = useState(" ");
  const [cookies, setCookie] = useCookies(["selectedType"]);
  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedType(newValue);
    setCookie("selectedType", newValue, { path: "/" });
  };

  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <div className="flex flex-row align-middle">
          <h3>Log In </h3>
          <select
            value={selectedType} // ...force the select's value to match the state variable...
            onChange={handleSelectChange} // ... and update the state variable on any change!
          >
            <option value="">Select Role:</option>
            <option value="customer">Customer</option>
            <option value="provider">Provider</option>
          </select>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="infoInput"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type={showPassword ? "text" : "password"}
            className="infoInput"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* button for toggling password visibility */}
          <button
            type="button"
            onClick={toggleShowPassword}
            className="password-toggle-button"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <div>
          <p className="text-xs">
            Don't have an account?{" "}
            <span
              onClick={onSignupClick}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Signup
            </span>
          </p>
        </div>
        <div>
          <button
            className="button infoButton font-normal w-36"
            onClick={onLoginClick}
          >
            Login with Email
          </button>
          <button
            // onClick={""}
            onClick={createWallet}
            className="button infoButton font-normal w-72"
          >
            Login with Email & Crypto Wallet
          </button>
        </div>
      </form>
    </div>
  );
}
function SignUp({ onLoginClick, navigate }) {
  // receive navigate function as props
  // const [selectedAction, setSelectedAction] = useState(" ");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpass) {
      alert("Passwords do not match!");
      return;
    }

    const dataToSend = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      is_provider: formData.is_provider,
      company: formData.company,
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

    if (response.status === "success") {
      alert(response.message);
      navigate("/login"); // navigate to login page
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <div className="flex flex-row align-middle">
          <h3>Sign Up</h3>
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
              onClick={onLoginClick}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login
            </span>
          </p>
        </div>
        <button className="button infoButton w-24" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Login;
