import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DesktopNavbarr.css";

import Usericon from "./Usericon.png";
import Unispherelogoicon from "./Unispherelogoicon.png";

// black and white icons
import Addwhite from './AddBlack.svg';
import Addblack from './Addwhite.svg';
import Homewhite from './Homewhite.svg';
import Homeblack from './Homeblack.svg';
import NetworkBlack from './NetworkBlack.svg';
import Networkwhite from './NetworkWhite.svg';
import Notificationblack from './Notificationblack.svg';
import Notificationwhite from './Notificationwhite.svg';

function DesktopNavbarr() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null); // Track which icon is active
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = () => {
    setIsUserDropdownOpen(false);
    console.log("User signed out");
  };

  const handleEditProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/ProfileEditSection/${userId}`);
    } else {
      console.error("User ID not found in localStorage.");
    }
  };

  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName); // Toggle active state
  };

  return (
    <div className="desktop-navbar-1">
      <img 
        src={activeIcon === 'home' ? Homewhite : Homeblack} 
        alt="Home" 
        className="desktop-icon" 
        onClick={() => handleIconClick('home')}
        style={{ cursor: "pointer" }}
      />
      <img 
        src={activeIcon === 'network' ? Networkwhite : NetworkBlack} 
        alt="Network" 
        className="desktop-icon" 
        onClick={() => handleIconClick('network')}
        style={{ cursor: "pointer" }}
      />
      <img 
        src={activeIcon === 'add' ? Addwhite : Addblack} 
        alt="Add" 
        className="desktop-icon" 
        onClick={() => handleIconClick('add')}
        style={{ cursor: "pointer" }}
      />
      <img 
        src={activeIcon === 'notifications' ? Notificationwhite : Notificationblack} 
        alt="Notifications" 
        className="desktop-icon" 
        onClick={() => handleIconClick('notifications')}
        style={{ cursor: "pointer" }}
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

            <button
              className="SelfProfile-edit-button"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>

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
                onClick={handleSignOut}
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