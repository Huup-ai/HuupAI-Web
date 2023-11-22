import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleStartClick = () => {
    navigate("/signup");
  };

  return (
    <div className="landing-page-re">
      <div className="div">
        <div className="overlap">
        {/* <img  className="overlap" src="images/LooperGroup.png" /> */}
          <div>
            <p className="enhance-GEN-AI-s">
                Meet Reliable,  <br />
                Affordable, Efficient GEN AI <br />
            <button className="start-button-2" onClick={handleLoginClick}>Log In</button>
            </p>
          </div>

          <div className="frame">
            <p className="ai-model">
              <span className="text-wrapper">AI M</span>
              <span className="text-wrapper">odel</span>
            </p>

            <div className="group">
              <div className="overlap-group">
                <div className="text-wrapper-2">340,000+</div>
                <div className="text-wrapper-3">340,000+</div>
              </div>
            </div>
          </div>

          <div className="frame-2">
            <p className="GPU-cloud">
              <span className="text-wrapper">G</span>
              <span className="text-wrapper">PU Cloud</span>
            </p>

            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <p className="element-hr">
                  <span className="span">$0.99/H</span>
                  <span className="span">r</span>
                </p>

                <p className="hr">
                  <span className="text-wrapper-4">$0.99/H</span>
                  <span className="text-wrapper-4">r</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="navigation-bar">
          <div className="frame-3">
            <div className="logo-with-company">
              <div className="text-wrapper-5">Huup AI</div>
            </div>
            <button className="button-container">
              {/* <div className="login-button" onClick={handleLoginClick}>
                Log in
              </div> */}
              <div className="start-button" onClick={handleStartClick}>
                Get Started
              </div>
            </button>
          </div>
        </div>
        <footer className="footer">
          <div className="frame-4">
            <div className="frame-5">
              <div className="text-wrapper-7">©</div>
              <div className="text-wrapper-8">2023</div>
              <div className="text-wrapper-9">HuupAI. All rights reserved.</div>
            </div>
            <div className="text-wrapper-10">Contact@HuupAI.xyz</div>
          </div>
        </footer>

        <div className="frame-6">
          {/* <div className="box">
                <img className="ellipse" alt="Ellipse" />
            </div> */}
          <div className="div-wrapper">
            <div className="text-wrapper-11">Our partnership</div>
          </div>
          <img
            className="element"
            src="images/aw.png"
          />
          <img
            className="img"
            src="images/Te.png"
          />
          <img
            className="element-2"
            src="images/AM.png"
          />
          <img
            className="element-3"
            src="images/bi.png"
          />
          <img className="XMLID" src="images/XMLID_1_.png" />
          <img
            className="tencent-cloud-logo"
            src="images/tencent-cloud logo.png"
          />
          <img className="frame-7" src="images/Frame 9.png" />
          <img className="AI-logo" src="images/AI logo.png" />
        </div>
      </div>
    </div>
  );
}
export default Landing;
