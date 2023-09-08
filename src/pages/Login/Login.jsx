import React from "react";
import "./Login.css";
import { useState } from "react";
import { loginUser } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../data/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // password visibility

  const handleLoginClick = async () => {
    try {
      const response = await loginUser(email, password);
      console.log("Login successful", response);

      setEmail("");
      setPassword("");
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
        </div>
      </div>

      <LogIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLoginClick={handleLoginClick}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />
      {/* <SignUp /> */}
    </div>
  );
};
function LogIn({
  email,
  setEmail,
  password,
  setPassword,
  onLoginClick,
  showPassword,
  toggleShowPassword,
}) {
  const [selectedType, setSelectedType] = useState(" ");

  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <div className="flex flex-row align-middle">
          <h3>Log In</h3>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Role:</option>
            <option value="customer">Customer</option>
            <option value="admin">Provider</option>
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
          <span style={{ fontSize: "12px" }}>
            If you are a first-time renter, please sign up
          </span>
        </div>
<<<<<<< HEAD
        <div>
          <button
            className="button infoButton font-normal"
            onClick={onLoginClick}
          >
            Login with Email
          </button>
          <button onClick={""} className="button infoButton">
=======
        <div >
          <button className="button infoButton font-normal w-36">
            Login with Email
          </button>
          <button
            // onClick={""}
            className="button infoButton font-normal w-72"
          >
>>>>>>> 9aa8749 (Login Button Update)
            Login with Email & Crypto Wallet
          </button>
        </div>
      </form>
    </div>
  );
}

function SignUp() {
  // const [selectedAction, setSelectedAction] = useState(" ");
  return (
    <div>
      <form className="infoForm authForm">
        <div className="flex flex-row align-middle">
          <h3>Sign Up</h3>
          {/* <select
     
      value={selectedAction} // ...force the select's value to match the state variable...
      onChange={(e) => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
    >
      <option value="">Select SignUp Type:</option>
      <option value="customer">Customer</option>
      <option value="admin">Administer</option>
    </select> */}
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
          <span style={{ fontSize: "12px" }}>
            Already have an account. Login!
          </span>
        </div>
        <button className="button infoButton w-24" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Login;
