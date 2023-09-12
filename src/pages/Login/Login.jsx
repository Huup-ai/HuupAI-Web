import React from "react";
import "./Login.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

import Logo from "../../data/Logo.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

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
        {/* <h2>{isLogin ? "Login" : "Signup"}</h2> */}
        {isLogin ? (
          <LogIn
            onSignupClick={() => setIsLogin(false)}
            // onLogin={handleLogin}
          />
        ) : (
          <SignUp
            onLoginClick={() => setIsLogin(true)}
            // onSignup={handleSignup}
          />
        )}
      </div>

      {/* <LogIn />
      <SignUp /> */}
    </div>
  );
};
function LogIn({ onSignupClick, onLogin }) {
  const [selectedType, setSelectedType] = useState(" ");
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
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
          />
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
          <button className="button infoButton font-normal w-36">
            Login with Email
          </button>
          <button
            // onClick={""}
            className="button infoButton font-normal w-72"
          >
            Login with Email & Crypto Wallet
          </button>
        </div>
      </form>
    </div>
  );
}
function SignUp({ onLoginClick, onSignup }) {
  // const [selectedAction, setSelectedAction] = useState(" ");
  return (
    <div>
      <form className="infoForm authForm">
        <div className="flex flex-row align-middle">
          <h3>Sign Up</h3>
        </div>

        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>

        <div>
          <input
            type="email"
            className="infoInput"
            name="email"
            placeholder="Email"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
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
