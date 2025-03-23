import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DesktopNavbarr.css";
import Addicon from "./Addicon.png";
import Clendericon from "./Clendericon.png";
import Homeicon from "./Homeicon.png";
import Messageicon from "./Messageicon.png";
import Networkicon from "./Networkicon.png";
import Nottificationicon from "./Notificationicon.png";
import Usericon from "./Usericon.png";
import Unispherelogoicon from "./Unispherelogoicon.png";

function DesktopNavbarr() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen); // Toggle dropdown visibility
  };

  const handleSignOut = () => {
    setIsUserDropdownOpen(false); // Close dropdown on sign out
    // Add your sign-out logic here (e.g., clear auth token, redirect)
    console.log("User signed out");
  };
  const handleEditProfile = () => {
    navigate("/ProfileEditSection"); // Navigate to /editpage
  };

  return (
    <div className="desktop-navbar-1">
      <img src={Homeicon} alt="Home" className="desktop-icon" />
      <img src={Networkicon} alt="Network" className="desktop-icon" />
      <img src={Clendericon} alt="Calendar" className="desktop-icon" />
      <img src={Addicon} alt="Add" className="desktop-icon" />
      <img src={Messageicon} alt="Messages" className="desktop-icon" />
      <img
        src={Nottificationicon}
        alt="Notifications"
        className="desktop-icon"
      />

      <div className="user-icon-container">
        <img
          src={Usericon}
          alt="User"
          className="desktop-user-icon"
          onClick={handleUserIconClick}
          style={{ cursor: "pointer" }}
        />
        {isUserDropdownOpen && (
          <div className="SelfProfile-card">
            {/* Profile Header */}
            <div className="SelfProfile-header">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile Picture"
                className="SelfProfile-pic"
              />
              <div className="SelfProfile-info">
                <h2 className="SelfProfile-name">Himanshu Sir</h2>
                <p className="SelfProfile-label">SBM</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              className="SelfProfile-edit-button"
              onClick={handleEditProfile} // Add onClick handler
            >
              Edit Profile
            </button>

            {/* Stats Section */}
            <div className="SelfProfile-stats">
              <div className="SelfProfile-stat">
                <span>Posts</span>
                <span className="SelfProfile-stat-value">23</span>
              </div>
              <div className="SelfProfile-stat">
                <span>Likes</span>
                <span className="SelfProfile-stat-value">56</span>
              </div>
              <div className="SelfProfile-stat">
                <span>Comments</span>
                <span className="SelfProfile-stat-value">12</span>
              </div>
              <div className="SelfProfile-stat">
                <span>Profile Visits</span>
                <span className="SelfProfile-stat-value">348</span>
              </div>
            </div>

            {/* Menu Section */}
            <div className="SelfProfile-menu">
              <div>
                <Link
                  to="/SelfSetting"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="SelfProfile-menu-item">Settings</div>
                </Link>
                <hr className="SelfProfile-divider" />
              </div>
              <div>
                <div className="SelfProfile-menu-item">Help</div>
                <hr className="SelfProfile-divider" />
              </div>
              <Link
                to="/"
                className="SelfProfile-menu-item SelfProfile-sign-out"
                onClick={handleSignOut} // Close dropdown and handle sign-out
              >
                Sign Out
              </Link>
            </div>
          </div>
        )}
      </div>

      <input type="text" placeholder="Search" className="desktop-search-bar" />
      <img
        src={Unispherelogoicon}
        alt="Unisphere Logo"
        className="desktop-logo-icon"
      />
    </div>
  );
}

export default DesktopNavbarr;
