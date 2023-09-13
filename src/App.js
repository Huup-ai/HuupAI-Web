import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import Clouds from "./pages/Clouds/Clouds";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/clouds" /> : <Login />}
      />

      <Route
        path="/clouds"
        element={isAuthenticated ? <Clouds /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
