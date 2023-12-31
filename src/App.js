import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import Clouds from "./pages/Clouds/Clouds";
// import GPU from "./pages/GPU";
// import Confirmation_GPU from "./pages/Confirmation_GPU";
import Login from "./pages/Login/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Inventory from "./pages/Inventory";
// import Billing from "./pages/Billing";
// import Profile from "./pages/Profile";
// import Instances from "./pages/Instances";
//import GPU from "./pages/GPU";
// import CPU from "./pages/CPU";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/Login/Signup";






function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);
  
  

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Landing />} /> 
      <Route path="/signup" element={ <SignUp />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/clouds" /> : <Login />}
      />
      <Route
        path="/clouds/*"
        element={isAuthenticated ? <Clouds /> : <Navigate to="/login" />}
      />
      <Route
        path="/inventory"
        element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
      />
      {/*  <Route path="/gpu" element={<GPU />} />
        {/* <Route path="/" element={isAuthenticated ? <Clouds /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clouds/*" element={<Clouds />} /> */}
      </Routes>

    </div>
  );
}


export default App;
