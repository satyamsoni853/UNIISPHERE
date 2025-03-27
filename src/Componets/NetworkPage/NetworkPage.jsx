import React, { useState, useEffect } from "react";
import "./NetworkPage.css";
import profilePhoto from "./profilephoto.png"; // Default profile photo
import connectsvg from "./Connection.svg"; // Importing the connect SVG
import DesktopRightsection from "../DesktopRight/DesktopRight"; // Importing the DesktopRightsection component
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import Background from "../Background/Background.jsx";
import MobileFooter from "../Mobilefooter/MobileFooter";
import redXIcon from "./close.png"; // Red X icon
import greenCheckIcon from "./check.png"; // Green checkmark icon

function NetworkPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showRequestMode, setShowRequestMode] = useState(false); // State to toggle request mode

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Static user data for the network page
  const users = [
    {
      name: "Karan",
      education: "Delhi University",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 17,
      collaborations: 2,
    },
    {
      name: "Vikash Dubey",
      education: "UPES",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 88,
      collaborations: 8,
    },
    {
      name: "Anjali Verma",
      education: "IIT Varanasi",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 92,
      collaborations: 4,
    },
    {
      name: "Yash Jadoun",
      education: "Delhi University",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 54,
      collaborations: 18,
    },
    {
      name: "Rishi Sagar",
      education: "UPES",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 28,
      collaborations: 8,
    },
    {
      name: "Ajay Pratap Singh",
      education: "IIT Varanasi",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 789,
      collaborations: 64,
    },
    {
      name: "Karan",
      education: "Delhi University",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 17,
      collaborations: 2,
    },
    {
      name: "Vikash Dubey",
      education: "UPES",
      description: "The actual idea of Unlisphere is of the founder Himanshu ...",
      connections: 88,
      collaborations: 8,
    },
  ];

  // Array of background colors for the cards
  const backgroundColors = [
    "#f0f8ff", // AliceBlue
    "#fafad2", // LightGoldenRodYellow
    "#e6e6fa", // Lavender
    "#fff5ee", // SeaShell
    "#f5f5dc", // Beige
    "#e0ffff", // LightCyan
    "#f0fff0", // Honeydew
    "#fff0f5", // LavenderBlush
    "#f5fffa", // MintCream
    "#f0ffff", // Azure
    "#ffe4e1", // MistyRose
  ];

  // State to manage whether the right section is visible
  const [showRightSection, setShowRightSection] = useState(false);

  // Function to handle connect button click
  const handleConnectClick = () => {
    setShowRightSection(true);
  };

  // Function to close the right section
  const handleCloseRightSection = () => {
    setShowRightSection(false);
  };

  // Function to handle request button click
  const handleRequestClick = () => {
    setShowRequestMode(true);
  };

  // Function to handle catch up button click
  const handleCatchUpClick = () => {
    setShowRequestMode(false); // Exit request mode and return to default view
  };

  return (
    <div className="networkpage-main-container">
      <DesktopNavbarr />
      <div>
        <Background />
        <div className="networkpage">
          <div className="networkpage-container">
            {/* Left Section: Grid of Users */}
            <div className="networkpage-left-section">
              <div className="networkpage-grid">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="networkpage-card"
                    style={{
                      backgroundColor: backgroundColors[index % backgroundColors.length],
                    }}
                  >
                    <div className="networkpage-profile-pic-container">
                      <img
                        src={profilePhoto}
                        alt={`${user.name}'s profile`}
                        className="networkpage-profile-pic"
                      />
                    </div>
                    <h3 className="networkpage-name">{user.name}</h3>
                    <p className="networkpage-education">{user.education}</p>
                    <p className="networkpage-description">{user.description}</p>
                    {showRequestMode ? (
                      <div className="networkpage-actions">
                        <img
                          src={redXIcon}
                          alt="Not Connected"
                          className="action-icon"
                        />
                        <img
                          src={greenCheckIcon}
                          alt="Connected"
                          className="action-icon"
                        />
                      </div>
                    ) : (
                      <div className="networkpage-connect-icon" onClick={handleConnectClick}>
                        <img src={connectsvg} alt="Connect" />
                      </div>
                    )}
                    <div className="networkpage-stats">
                      <span>{user.connections} connect</span>
                      <span>{user.collaborations} collaborate</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons Section */}
              <div className="networkpage-buttons">
                <button className="networkpage-action-btn" onClick={handleCatchUpClick}>
                  CATCH UP
                </button>
                <button className="networkpage-action-btn" onClick={handleRequestClick}>
                  REQUEST
                </button>
                <button className="networkpage-action-btn">NEW CONNECTION</button>
                {isMobile && <MobileFooter />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Networkpage-rightsection">
        <DesktopRightsection className="Networkpage-rightsection-1" />
      </div>
    </div>
  );
}

export default NetworkPage;