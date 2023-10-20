import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Cookies from 'js-cookie'; // Import Cookies
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../../components";
import {
  CPU,
  GPU,
  Instances,
  Profile,
  Billing,
  Confirmation_CPU,
  Confirmation_GPU,
  Inventory,
  Invoice,
} from "../../pages";
import "./Clouds.css";

import { useStateContext } from "../../contexts/ContextProvider";

const Clouds = () => {
  const navigate = useNavigate(); // Get the navigate function
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const handleCPURouteClick = () => {
    console.log('CPU link clicked');

    // Set a CPU cookie when the user clicks on the /CPU route
    Cookies.set('userClickedCPU', true); // 'userClickedCPU' is the cookie name
    //navigate('/CPU');
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              {/* Market  */}
              <Route path="/" element={<Instances />} />
              <Route path="/GPU" element={<GPU />} />
              <Route path="/CPU" element={<CPU />} onClick={handleCPURouteClick}/>

              {/* My Clouds  */}
              <Route path="/instances" element={<Instances />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/billing" element={<Billing />} />

              {/* Order  */}

              <Route
                path="/confirmation GPU/:id"
                element={<Confirmation_GPU />}
              />
              <Route path="/confirmation CPU/:id" element={<Confirmation_CPU />} />

              {/* Provider */}
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Clouds;
