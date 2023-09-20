import React from "react";
import "./App.css";
// import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Clouds from "./pages/Clouds/Clouds";
// import GPU from "./pages/GPU";
// import Confirmation_GPU from "./pages/Confirmation_GPU";
import Login from "./pages/Login/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import Billing from "./pages/Billing";
// import Profile from "./pages/Profile";
// import Instances from "./pages/Instances";
//import GPU from "./pages/GPU";
// import CPU from "./pages/CPU";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const [cookies] = useCookies(["loggedIn"]);
  // const isLoggedIn = cookies.loggedIn === "true";
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  useEffect(() => {
    setIsLoggedIn(cookies.loggedIn === "true");
    // console.log(isAuthenticated, "1",isLoggedIn)
    
  }, [cookies.loggedIn]);


  

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      {/* <Routes>
        <Route path="/" element={isAuthenticated ? <Clouds /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clouds/*" element={<Clouds />} />
      </Routes> */}

      {isAuthenticated? <Clouds /> : <Login />}
      {/* {isAuthenticated && isLoggedIn ? <Clouds /> : <Login />} */}
      {/* {isLoggedIn? <Clouds /> : <Login />} */}
    </div>
  );
}

export default App;
