import React, { useState, useEffect, useCallback, useRef } from "react";
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
import backicon from "./backsvg.svg";
import profileImage from './profilephoto.png';

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
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [showAddmore, setShowAddMore] = useState(true);
  const [caption, setCaption] = useState("");
  const [hideLikes, setHideLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [mentions, setMentions] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0); // New state for total likes
  const [totalComments, setTotalComments] = useState(0); // New state for total comments
  const inputRef = useRef(null);
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

  // Fetch stats from /posts/stats/total
  const fetchStats = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (!authToken || !userId) {
      setError("Authentication required");
      return;
    }

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/posts/stats/total",
        { id: userId }, // Pass userId in the body as { id: userId }
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Profile Stats response:", JSON.stringify(response.data, null, 2)); // Print detailed response
      console.log("Profile Stats response:",response.data); 
      const stats = response.data[0]; // Assuming the response is an array with one object
      setTotalLikes(stats._count?.Likes || 0);
      setTotalComments(stats._count?.Comments || 0);
    } catch (err) {
      console.error("Stats fetch error:", err);
      setError("Failed to fetch stats");
    }
  };

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

  // Initial load - fetch all profiles and stats
  useEffect(() => {
    fetchProfiles();
    fetchStats();
  }, [fetchProfiles]);

  // User dropdown handlers
  const handleUserIconClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setShowNotificationDropdown(false);
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
    setIsUserDropdownOpen(false);
    setActiveIcon(prev => prev === "notifications" ? null : "notifications");
  };

  // Navigation icon handlers
  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
    setShowNotificationDropdown(false);
    
    switch (iconName) {
      case "home":
        navigate("/");
        break;
      case "network":
        navigate("/network");
        break;
      case "add":
        setShowUploadSection(true);
        break;
      case "notifications":
        handleNotificationClick();
        break;
      default:
        break;
    }
  };

  // Upload section handlers
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewURL = URL.createObjectURL(file);
        setMediaList(prev => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
            comment: ""
          }
        ]);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewURL = URL.createObjectURL(file);
        setMediaList(prev => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
            comment: ""
          }
        ]);
      }
    });
  };

  const handlePostSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const authToken = localStorage.getItem("authToken");
      console.log("Auth Token:", authToken);

      if (!authToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const formData = new FormData();
      mediaList.forEach((media, index) => {
        formData.append(`media_${index}`, media.file);
      });
      formData.append('caption', caption);
      formData.append('hideLikes', hideLikes);
      formData.append('disableComments', disableComments);
      
      const profileResponse = await axios.patch(
        `https://uniisphere-1.onrender.com/users/profile/`,
        { bio: caption },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("Profile updated:", profileResponse.data);

      const postResponse = await axios.post(
        `https://uniisphere-1.onrender.com/posts/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Post created:", postResponse.data);
      
      setMediaList([]);
      setCaption("");
      setHideLikes(false);
      setDisableComments(false);
      setShowPostDetails(false);
      setShowAddMore(true);
      setShowUploadSection(false);

    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseUpload = () => {
    setShowUploadSection(false);
    setShowPostDetails(false);
    setShowAddMore(true);
    setMediaList([]);
    setCaption("");
    setHideLikes(false);
    setDisableComments(false);
    setError(null);
  };

  useEffect(() => {
    return () => {
      mediaList.forEach(media => URL.revokeObjectURL(media.previewURL));
    };
  }, [mediaList]);

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
                <span className="SelfProfile-stat-value">{totalLikes}</span>
              </div>
              <div className="SelfProfile-stat">
                <span>Comments</span>
                <span className="SelfProfile-stat-value">{totalComments}</span>
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

      {/* Upload Section Overlay */}
      {showUploadSection && (
        <div className="upload-overlay" onClick={handleCloseUpload}>
          <div className="upload-container" onClick={(e) => e.stopPropagation()} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            {(mediaList.length === 0) && (
              <div>
                <p className="upload-text">Drag & Drop your media here</p>
                <button
                  className="upload-button"
                  onClick={() => inputRef.current.click()}
                >
                  Upload from computer
                </button>
              </div>
            )}
            
            {(mediaList.length !== 0 && showAddmore) && (
              <div className="after-upload">
                <div className="navbar">
                  <img src={backicon} alt="Back" onClick={handleCloseUpload} />
                  <h6
                    onClick={() => {
                      setShowPostDetails(true);
                      setShowAddMore(false);
                    }}
                  >
                    Continue
                  </h6>
                </div>

                <div className="preview-container">
                  {mediaList.map((media, index) => (
                    <div key={index} className="media-item">
                      {media.mediaType === "image" ? (
                        <img
                          className="imageAndVideo"
                          src={media.previewURL}
                          alt="Uploaded media"
                        />
                      ) : (
                        <video
                          className="imageAndVideo"
                          src={media.previewURL}
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="add-more-btn"
                  onClick={() => inputRef.current.click()}
                >
                  Add More
                </button>
              </div>
            )}

            {showPostDetails && (
              <div className="create-post-main-container">
                <div className="create-post-after-upload">
                  <div className="create-post-navbar">
                    <div className="image-and-name">
                      <img src={profileImage} alt="profileImage" />  
                      <h3>Himanshu Choudary</h3>
                    </div>
                    <h6>Create Post</h6>
                  </div>

                  <div className="post-content-container">
                    <div className="image-and-caption">
                      {mediaList.map((media, index) => (
                        <div key={index} className="post-media-container">
                          {media.mediaType === "image" ? (
                            <img
                              className="create-post-imageAndVideo"
                              src={media.previewURL}
                              alt="Uploaded media"
                            />
                          ) : (
                            <video
                              className="create-post-imageAndVideo"
                              src={media.previewURL}
                              controls
                            />
                          )}
                        </div>
                      ))}
                      <div className="form-group">
                        <label className="input-label">Caption</label>
                        <textarea
                          className="caption-input"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Write a caption..."
                          rows="4"
                        />
                      </div>
                    </div>

                    <div className="mention-form-group">
                      <label className="input-label">Add Mentions</label>
                      <div className="mention-button">
                        +  
                      </div>
                    </div>

                    <div className="privacy-settings">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Hide Likes</h4>
                          <p className="setting-description">
                            No one will be able to see the number of likes on your post. Except you
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={hideLikes}
                            onChange={(e) => setHideLikes(e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Turn Off Comments</h4>
                          <p className="setting-description">
                            No one will be able to comment on this post
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={disableComments}
                            onChange={(e) => setDisableComments(e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div className="submit-section">
                      <button 
                        className="submit-button" 
                        onClick={handlePostSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? "Posting..." : "Post"}
                      </button>
                      {error && <p className="error-message">{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*,video/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
      )}

      {/* Hidden file input (for initial upload if needed outside overlay) */}
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default DesktopNavbarr;