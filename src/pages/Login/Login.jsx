import React from "react";
import "./Login.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { loginUser, registerUser, loginProvider } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../reducers/authSlicer";

import Logo from "../../data/Logo.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // password visibility
  const [selectedType, setSelectedType] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
      // onSignup(); // if want to direct to another page
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
