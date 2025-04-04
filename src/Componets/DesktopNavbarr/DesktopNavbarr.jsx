import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DesktopNavbarr.css";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";

// Icons
import Usericon from "./Usericon.png";
import Unispherelogoicon from "./Unispherelogoicon.png";
import Addwhite from "./Addwhite.svg";
import Addblack from "./AddBlack.svg";
import Homewhite from "./Homewhite.svg";
import Homeblack from "./homeblack.svg";
import NetworkBlack from "./NetworkBlack.svg";
import Networkwhite from "./NetworkWhite.svg";
import Notificationblack from "./notificationblack.svg";
import Notificationwhite from "./notificationwhite.svg";

function DesktopNavbarr() {
  // State
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Notification state
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState("Today");
  const [notifications, setNotifications] = useState([
    { time: "2 hrs", message: "Hello brother how are you. I that ....", alert: true, color: "notification-border-blue-400" },
    { time: "3 hrs", message: "Hello brother how are you. I that ....", alert: true, color: "notification-border-yellow-400" },
    { time: "6 hrs", message: "Hello brother how are you. I that ....", alert: true, color: "notification-border-red-400" },
    { time: "8 hrs", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-gray-400" },
    { time: "12 hrs", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-gray-400" },
    { time: "18 hrs", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-blue-400" },
    { time: "2 days", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-gray-400" },
  ]);

  // Time filters for notifications
  const timeFilters = {
    Today: (time) => time.includes("hrs"),
    "Last Week": (time) => time.includes("days") && parseInt(time) <= 7,
    "Last Month": (time) => time.includes("days") && parseInt(time) > 7 && parseInt(time) <= 30,
    "Last Year": (time) => time.includes("days") && parseInt(time) > 30,
  };

  const filteredNotifications = notifications.filter((notif) =>
    timeFilters[activeNotificationTab](notif.time)
  );

  // Fetch profiles by username
  const fetchProfiles = useCallback(async (username = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://uniisphere-1.onrender.com/getProfile/profile/?search=${username}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((username) => {
      fetchProfiles(username);
    }, 500),
    [fetchProfiles]
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const username = e.target.value;
    setSearchQuery(username);

    if (/^[a-z0-9_]*$/i.test(username)) {
      debouncedSearch(username);
    } else {
      setError("Only letters, numbers and underscores allowed");
    }
  };

  // Handle profile click
  const handleProfileClick = (userId) => {
    localStorage.setItem("SearchUserId", userId);
    navigate(`/FollowerMiddleSectionPrivacy/${userId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  // Initial load - fetch all profiles
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // User dropdown handlers
  const handleUserIconClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setShowNotificationDropdown(false); // Close notification dropdown if open
  };

  const handleSignOut = () => {
    setIsUserDropdownOpen(false);
    console.log("User signed out");
    // Add your sign out logic here
  };

  const handleEditProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/ProfileEditSection/${userId}`);
    } else {
      console.error("User ID not found");
    }
  };

  // Handle notification icon click
  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setIsUserDropdownOpen(false); // Close user dropdown if open
    setActiveIcon(prev => prev === "notifications" ? null : "notifications");
  };

  // Navigation icon handlers
  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
    setShowNotificationDropdown(false); // Close notification dropdown when clicking other icons
    
    switch (iconName) {
      case "home":
        navigate("/");
        break;
      case "network":
        navigate("/network");
        break;
      case "add":
        navigate("/create-post");
        break;
      case "notifications":
        handleNotificationClick();
        break;
      default:
        break;
    }
  };

  return (
    <div className="desktop-navbar-1">
      {/* Navigation Icons */}
      <img
        src={activeIcon === "home" ? Homewhite : Homeblack}
        alt="Home"
        className="desktop-icon"
        onClick={() => handleIconClick("home")}
      />
      <img
        src={activeIcon === "network" ? Networkwhite : NetworkBlack}
        alt="Network"
        className="desktop-icon"
        onClick={() => {
          setShowDropdown((prev) => !prev);
          setShowNotificationDropdown(false);
        }}
      />
      <img
        src={activeIcon === "add" ? Addwhite : Addblack}
        alt="Add"
        className="desktop-icon"
        onClick={() => handleIconClick("add")}
      />
      
      {/* Notification Icon with Dropdown */}
      <div className="notification-icon-container">
        <img
          src={activeIcon === "notifications" ? Notificationwhite : Notificationblack}
          alt="Notifications"
          className="desktop-icon"
          onClick={handleNotificationClick}
        />
        {showNotificationDropdown && (
          <div className="notification-dropdown">
            <div className="notification-tabs">
              {Object.keys(timeFilters).map((tab) => (
                <button
                  key={tab}
                  className={`notification-tab-button ${activeNotificationTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveNotificationTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="notification-list">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`notification-item ${notif.color}`}
                  >
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Profile"
                      className="notification-profile-pic"
                    />
                    <div className="notification-content">
                      <p className="notification-sender">Vijay Prasad</p>
                      <p className="notification-message">{notif.message}</p>
                    </div>
                    <span className="notification-time">{notif.time}</span>
                    {notif.alert && <span className="notification-alert">🔔</span>}
                  </div>
                ))
              ) : (
                <p className="notification-empty">No notifications in this time range.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Dropdown */}
      <div className="user-icon-container">
        <img
          src={Usericon}
          alt="User"
          className="desktop-user-icon"
          onClick={handleUserIconClick}
        />
        {isUserDropdownOpen && (
          <div className="SelfProfile-card">
            <div className="SelfProfile-header">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="SelfProfile-pic"
              />
              <div className="SelfProfile-info">
                <h2 className="SelfProfile-name">User Name</h2>
                <p className="SelfProfile-label">Position</p>
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
            </div>

            <div className="SelfProfile-menu">
              <div
                className="SelfProfile-menu-item"
                onClick={() => navigate("/SelfSetting")}
              >
                Settings
              </div>
              <div className="SelfProfile-menu-item">Help</div>
              <div
                className="SelfProfile-menu-item SelfProfile-sign-out"
                onClick={handleSignOut}
              >
                Sign Out
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Network Dropdown */}
      {showDropdown && (
        <div className="connections-card">
          <div className="connections-item">
            <Link to="/NetworkPage" className="connection-link">Connection</Link>
          </div>
          <div className="connections-item">Edu-vault</div>
          <div className="connections-item active">Human Library</div>
          <div className="connections-item">Guidance</div>
          <div className="connections-item">NGOs</div>
        </div>
      )}

      {/* Search Bar */}
      <div className="desktop-search-container">
        <div className="desktop-search-input-wrapper">
          <input
            type="text"
            placeholder="Search username"
            className="desktop-search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          <FiSearch className="desktop-search-icon" />
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="desktop-search-results">
            {isLoading ? (
              <div className="desktop-search-loading">Searching...</div>
            ) : error ? (
              <div className="desktop-search-error">{error}</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user.id}
                  className="desktop-search-result-item"
                  onClick={() => handleProfileClick(user.id)}
                >
                  <img
                    src={user.profilePicture || Usericon}
                    alt={user.username}
                    className="desktop-search-result-avatar"
                  />
                  <div className="desktop-search-result-info">
                    <span className="desktop-search-result-name">
                      {user.username}
                    </span>
                    <span className="desktop-search-result-id">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="desktop-search-no-results">No users found</div>
            )}
          </div>
        )}
      </div>

      {/* Logo */}
      <img src={Unispherelogoicon} alt="Logo" className="desktop-logo-icon" />
    </div>
  );
}

export default DesktopNavbarr;