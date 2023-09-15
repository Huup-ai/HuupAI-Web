import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Clouds from "./pages/Clouds/Clouds";
import GPU from "./pages/GPU";
import Confirmation_GPU from "./pages/Confirmation_GPU";
import Login from "./pages/Login/Login";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import Instances from "./pages/Instances";
//import GPU from "./pages/GPU";
import CPU from "./pages/CPU";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/GPU" element={<GPU />} />
        <Route path="/confirmation/:id" element={<Confirmation_GPU />} /> */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/clouds" /> : <Login />}
        />
        <Route
          path="/clouds"
          element={isAuthenticated ? <Clouds /> : <Navigate to="/login" />}
        />
        <Route
          path="/billing"
          element={isAuthenticated ? <Billing /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/instances"
          element={isAuthenticated ? <Instances /> : <Navigate to="/login" />}
        />
        <Route
          path="/gpu"
          element={isAuthenticated ? <GPU /> : <Navigate to="/login" />}
        />
        <Route
          path="/cpu"
          element={isAuthenticated ? <CPU /> : <Navigate to="/login" />}
        />
        <Route path="/GPU" element={<GPU />} />
        <Route path="/confirmation/:id" element={<Confirmation_GPU />} />
      </Routes>
    </div>
  );
}

export default App;
