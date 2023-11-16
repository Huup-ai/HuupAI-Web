import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../reducers/authSlicer";
import { useNavigate } from "react-router-dom";
import Logo from "../../data/Logo.png";
import { googleSignIn } from "../../api";

const GoogleLogin = () => {
  const [selectedType, setSelectedType] = useState("customer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle what happens after sign-in
  async function onSignIn(response) {
    const token_id = response.credential;
    try {
      const data = await googleSignIn(token_id);
      dispatch(loginSuccess(data.jwt_token));
      localStorage.setItem('jwtToken', data.jwt_token);
      navigate('/clouds'); // Adjust if necessary
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Load the Google Identity Services library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '857153619993-12tmpju7pdq3oqoqvhvkg2iv7dr2i5qs.apps.googleusercontent.com',
        callback: onSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
      window.google.accounts.id.prompt();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="Alert">
      <div className="a-left">
        <img src={Logo} alt="Huup AI" />
        <div className="Webname w-64">
          <h1>Huup AI</h1>
          <p className="text-xl">Explore your Market Cloud</p>
          <p className="text-sm">
            Green AI - Infrastructure for AI Democratization, Efficiency, and Privacy
          </p>
        </div>
      </div>
      <div className="login-container">
        <form className="infoForm authForm">
          <div className="typeSelect rounded-t-xl">
            <button
              type="button"
              onClick={() => setSelectedType("customer")}
              className={`px-6 py-3 mt-2 ${selectedType === "customer" ? "bg-white rounded-t-xl py-4" : "bg-gray-200 rounded-t-lg"}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("provider")}
              className={`px-6 py-3 mt-2 ${selectedType === "provider" ? "bg-white rounded-t-xl py-4" : "bg-gray-200 rounded-t-lg"}`}
            >
              Provider
            </button>
          </div>
          <div id="googleSignInButton" className="google-button"></div>
          {/* {selectedType === "customer" && (
            // Add your login with Email & Crypto Wallet button here
          )} */}
        </form>
      </div>
    </div>
  );
};

export default GoogleLogin;

