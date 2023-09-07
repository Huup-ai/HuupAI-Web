import React from "react";
import "./Login.css";
import { useState } from "react";

import Logo from "../../data/Logo.png";

const Login = () => {
 
  
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

        <LogIn />
        {/* <SignUp /> */}
      </div>
  );
};
function LogIn() {
  const [selectedAction, setSelectedAction] = useState(" ");
  
  return (
    <div className="a-right">
    
      <form className="infoForm authForm">
        <div className="flex flex-row align-middle">
      
        <h3>Log In </h3>
          <select
       
        value={selectedAction} // ...force the select's value to match the state variable...
        onChange={(e) => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
      >
        <option value="">Select LogIn Type:</option>
        <option value="customer">Customer</option>
        <option value="admin">Administer</option>
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
          <span style={{ fontSize: "12px" }}>
            If your are first time renter, Please signup
          </span>
          <button className="button infoButton">OK</button>
        </div>
      </form>
    </div>
  );
}
function SignUp() {
  const [selectedAction, setSelectedAction] = useState(" ");
  return (
    <div className="a-right">
      <form className="infoForm authForm">
      <div className="flex flex-row align-middle">
      
      <h3>Sign Up</h3>
        <select
     
      value={selectedAction} // ...force the select's value to match the state variable...
      onChange={(e) => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
    >
      <option value="">Select SignUp Type:</option>
      <option value="customer">Customer</option>
      <option value="admin">Administer</option>
    </select>
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
        <button className="button infoButton" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Login;
