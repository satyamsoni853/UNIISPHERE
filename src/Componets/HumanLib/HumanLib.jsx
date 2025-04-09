import React, { useState } from "react";
import "./HumanLib.css"; // Import the external CSS file
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import Background from "../Background/Background.jsx";

function HumanLib() {
  // State to track the current phase (1: Nickname entry, 2: Get connected, 3: Connecting)
  const [phase, setPhase] = useState(1);

  // Handler to transition to the next phase
  const handleNextPhase = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  return (
    <div className="HumanLib-wrapper">
      {/* Navbar at the top */}
      <DesktopNavbarr />

      {/* Background component (assumed to provide abstract shapes) */}
      <Background />

      {/* Main content area with the form and right sidebar */}
      <div className="HumanLib-main-content">
        {/* Form container (left/center section) */}
        <div className="HumanLib-container">
          {phase === 1 ? (
            // First page: Nickname entry form
            <div>
              <h2 className="HumanLib-title">Enter Your Nickname</h2>
              <p className="HumanLib-description">
                We respect your privacy & keep it safe we suggest to
                <br />
                pick up a nickname for your display.
              </p>
              <input type="text" placeholder="" className="HumanLib-input" />
              <div className="HumanLib-button-container">
                <button className="HumanLib-button HumanLib-cancel">Cancel</button>
                <button
                  className="HumanLib-button HumanLib-start"
                  onClick={handleNextPhase}
                >
                  Start searching
                </button>
              </div>
            </div>
          ) : phase === 2 ? (
            // Second page: "Get connected" content
            <div className="HumanLib-second-page-content">
              <div className="HumanLib-image-container">
                {/* Concentric circles and orbiting images */}
                <div className="HumanLib-concentric-circles">
                  {/* Pink outer circle (static) */}
                  <div className="HumanLib-circle HumanLib-circle-pink"></div>
                  {/* Light blue inner circle (static) */}
                  <div className="HumanLib-circle HumanLib-circle-blue"></div>
                  {/* Central image (static) */}
                  <div className="HumanLib-central-image"></div>
                  {/* Orbiting images on the pink circle */}
                  <div className="HumanLib-orbiting-image HumanLib-orbiting-image-1"></div>
                  <div className="HumanLib-orbiting-image HumanLib-orbiting-image-2"></div>
                  <div className="HumanLib-orbiting-image HumanLib-orbiting-image-3"></div>
                  <div className="HumanLib-orbiting-image HumanLib-orbiting-image-4"></div>
                </div>
              </div>
              <h2 className="HumanLib-title">
                Get connected with the ones who are just like you. And want to share there feelings
              </h2>
              <p className="HumanLib-description">
                With just a click get connected to some other student who will never judge on your feelings.
              </p>
              <div className="HumanLib-button-container">
                <button
                  className="HumanLib-button HumanLib-start"
                  onClick={handleNextPhase}
                >
                  Start searching
                </button>
              </div>
            </div>
          ) : (
            // Third page: "Connecting" content
            <div className="HumanLib-third-page-content">
              <div className="HumanLib-image-container">
                {/* Concentric circles for the third phase */}
                <div className="HumanLib-concentric-circles">
                  {/* Pink outer circle */}
                  <div className="HumanLib-circle HumanLib-circle-pink"></div>
                  {/* Light blue middle circle */}
                  <div className="HumanLib-circle HumanLib-circle-blue"></div>
                  {/* Purple inner circle */}
                  <div className="HumanLib-circle HumanLib-circle-purple"></div>
                </div>
              </div>
              <p className="HumanLib-description">
                Connecting with the most accurate person for you.
              </p>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="HumanLib-right-section">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default HumanLib;