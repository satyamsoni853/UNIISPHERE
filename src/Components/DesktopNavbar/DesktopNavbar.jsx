import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import "./DesktopNavbar.css";

// Icons
import AddBlack from "./AddBlackIcon.svg";
import AddWhite from "./AddWhiteIcon.svg";
import BackIcon from "./BackIcon.svg";
import NetworkBlack from "./NetworkBlackIcon.svg";
import NetworkWhite from "./NetworkWhiteIcon.svg";
import NotificationBlack from "./NotificationBlackIcon.svg";
import NotificationWhite from "./NotificationWhiteIcon.svg";
import ProfileImage from "./ProfileImage.png";
import Trendimage from "./trend.png";
import UnisphereLogoIcon from "./UnisphereLogoIcon.svg";
import UserIcon from "./UserIcon.svg";
import ClenderBlack from "./ClenderBlackIcon.svg";
import ClenderWhite from "./ClenderWhiteIcon.svg";
import Background from "../Background/Background";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";

function DesktopNavbar() {
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
  const [showAddMore, setShowAddMore] = useState(true);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hideLikes, setHideLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [posts, setPosts] = useState(0);
  const [username, setUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [allUsersResponse, setAllUsersResponse] = useState(null);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Notification state
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState("Today");
  const [notifications, setNotifications] = useState([
    {
      time: "2 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "desktop-notification-border-blue-400",
    },
    {
      time: "3 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "desktop-notification-border-yellow-400",
    },
    {
      time: "6 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "desktop-notification-border-red-400",
    },
  ]);
  const buttonscolor = ["#DB3E3933", "#DDC058", "#A17A97"];

  // Search-related state
  const [activeTab, setActiveTab] = useState("Trend");
  const [suggestedUsers] = useState([
    {
      id: 7,
      name: "Rahul",
      university: "UPES",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "Satyam",
      university: "IITM",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 9,
      name: "Jack",
      university: "Delhi University",
      avatar: "https://via.placeholder.com/40",
    },
  ]);
  const [trends] = useState([
    {
      id: 1,
      title: "New Youth, New Power",
      description:
        "eufblueeblejdfrbr, irwe. hpleufblueeblejdfrbr ygbh hbd yfgqieufbluejd. L",
      image: "https://via.placeholder.com/60x40",
      category: "E-Books",
    },
  ]);
  const [events] = useState([]);
  const [news] = useState([]);

  // Click outside handler to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keydown events (e.g., Esc to close)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowResults(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fetch connections from the API
  useEffect(() => {
    const fetchConnections = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Please log in to continue");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          "https://uniisphere-1.onrender.com/api/connections",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log("Connections API Response:", response.data);
      } catch (err) {
        console.error(
          "Error fetching connections:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch connections");
      }
    };
    fetchConnections();
  }, [navigate, setError]);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Please log in to continue");
        navigate("/login");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          "https://uniisphere-1.onrender.com/users/getAll",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const users = Array.isArray(response.data) ? response.data : [];
        setAllUsersResponse(users);
        console.log(
          "All User IDs:",
          users.map((user) => user.id)
        );
      } catch (err) {
        console.error("Error fetching all users:", err);
        setError(err.response?.data?.message || "Failed to fetch users");
        setAllUsersResponse([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [navigate, setError]);

  // Time filters for notifications
  const timeFilters = {
    Today: (time) => time.includes("hrs"),
    "Last Week": (time) => time.includes("days") && parseInt(time) <= 7,
    "Last Month": (time) =>
      time.includes("days") && parseInt(time) > 7 && parseInt(time) <= 30,
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
        `https://uniisphere-1.onrender.com/getProfile/profile/?search=${encodeURIComponent(
          username
        )}`
      );
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Failed to fetch profiles");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch stats from /posts
  const fetchStats = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (!authToken || !userId) {
      setError("Please log in to continue");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(
        "https://uniisphere-1.onrender.com/posts",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile Stats response:", response.data);
      if (response.data.totalPosts && Array.isArray(response.data.totalPosts)) {
        const userPosts = response.data.totalPosts.filter(
          (post) => post.user.id === userId
        );
        if (userPosts.length > 0) {
          setUsername(userPosts[0].user.username || "");
          setUserProfileImage(userPosts[0].user.profilePictureUrl || "");
        }
        const totalLikesCount = userPosts.reduce(
          (sum, post) => sum + (post._count?.Likes || 0),
          0
        );
        const totalCommentsCount = userPosts.reduce(
          (sum, post) => sum + (post._count?.Comments || 0),
          0
        );
        setTotalLikes(totalLikesCount);
        setTotalComments(totalCommentsCount);
        setPosts(userPosts.length);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setError("Failed to load stats");
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch stats");
    }
  };

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((username) => fetchProfiles(username), 500),
    [fetchProfiles]
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const username = e.target.value;
    setSearchQuery(username);
    if (/^[a-z0-9_]*$/i.test(username)) {
      debouncedSearch(username);
    } else {
      setError("Only letters, numbers, and underscores allowed");
    }
  };

  // Handle profile click
  const handleProfileClick = (userId) => {
    localStorage.setItem("SearchUserId", userId);
    if (allUsersResponse && Array.isArray(allUsersResponse)) {
      const idExists = allUsersResponse.some((user) => user.id === userId);
      console.log(`Checking if User ID ${userId} exists: ${idExists}`);
      navigate(
        idExists
          ? `/AfterConnecting/${userId}`
          : "/DesFollowerMiddleSectionPrivacy"
      );
    } else {
      console.error("User data not loaded:", allUsersResponse);
      navigate("/DesFollowerMiddleSectionPrivacy");
    }
    setShowResults(false);
    setSearchQuery("");
  };

  // Initial load
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
    // Add sign-out logic here
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
    setShowDropdown(false);
    setActiveIcon((prev) =>
      prev === "notifications" ? null : "notifications"
    );
  };

  // Handle clender icon click (placeholder)
  const handleClenderClick = () => {
    setIsUserDropdownOpen(false);
    setShowDropdown(false);
    setShowNotificationDropdown(false);
    setActiveIcon((prev) => (prev === "clender" ? null : "clender"));
    // Add clender functionality here, e.g., navigate("/calendar") or open a calendar modal
  };

  // Navigation icon handlers
  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
    setShowNotificationDropdown(false);
    switch (iconName) {
      case "home":
        navigate("/view");
        break;
      case "network":
        // navigate("/network");
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
        setMediaList((prev) => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
            comment: "",
          },
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
        setMediaList((prev) => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
            comment: "",
          },
        ]);
      }
    });
  };

  const handlePostSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!authToken || !userId) {
        throw new Error("Please log in to continue");
      }
      const formData = new FormData();
      mediaList.forEach((media) => formData.append("media", media.file));
      formData.append("content", caption);
      formData.append("userId", userId);
      formData.append("visibility", hideLikes ? "private" : "public");
      formData.append("location", location || "");
      formData.append("tags", "");
      const postResponse = await axios.post(
        "https://uniisphere-1.onrender.com/posts",
        formData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Post created:", postResponse.data);
      setMediaList([]);
      setCaption("");
      setLocation("");
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
    setLocation("");
    setHideLikes(false);
    setDisableComments(false);
    setError(null);
  };

  useEffect(() => {
    return () => {
      mediaList.forEach((media) => URL.revokeObjectURL(media.previewURL));
    };
  }, [mediaList]);

  return (
    <div className="desktop-navbar-1">
      {/* Navigation Icons */}
      {activeIcon === "home" ? (
        <GoHome
          className="desktop-icon"
          onClick={() => handleIconClick("home")}
          title="Home"
          style={{ color: "white" }}
        />
      ) : (
        <FaHome
          className="desktop-icon"
          onClick={() => handleIconClick("home")}
          title="Home"
          style={{ color: "black" }}
        />
      )}
      <img
        src={activeIcon === "network" ? NetworkWhite : NetworkBlack}
        alt="Network"
        className="desktop-icon"
        onClick={() => {
          setShowDropdown((prev) => !prev);
          setShowNotificationDropdown(false);
          handleIconClick("network");
        }}
      />
      <img
        src={activeIcon === "add" ? AddWhite : AddBlack}
        alt="Add"
        className="desktop-icon"
        onClick={() => handleIconClick("add")}
      />
      <div className="desktop-notification-icon-container">
        <img
          src={
            activeIcon === "notification" || showDropdown
              ? NotificationWhite
              : NotificationBlack
          }
          alt="Network"
          className="desktop-icon"
          onClick={handleNotificationClick}
        />
        {showNotificationDropdown && (
          <div className="desktop-notification-dropdown">
            <div className="desktop-notification-tabs">
              {Object.keys(timeFilters).map((tab) => (
                <button
                  key={tab}
                  className={`desktop-notification-tab-button ${
                    activeNotificationTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveNotificationTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="desktop-notification-list">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`desktop-notification-item ${notif.color}`}
                  >
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="desktop-notification-profile-pic"
                    />
                    <div className="desktop-notification-content">
                      <p className="desktop-notification-sender">
                        Vijay Prasad
                      </p>
                      <p className="desktop-notification-message">
                        {notif.message}
                      </p>
                    </div>
                    <span className="desktop-notification-time">
                      {notif.time}
                    </span>
                    {notif.alert && (
                      <span className="desktop-notification-alert">🔔</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="desktop-notification-empty">
                  No notifications in this time range.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Dropdown */}
      <div className="desktop-user-icon-container">
        <img
          src={userProfileImage || UserIcon}
          alt="User"
          className="desktop-user-icon"
          onClick={handleUserIconClick}
        />
        {isUserDropdownOpen && (
          <div className="desktop-self-profile-card">
            <div className="desktop-self-profile-header">
              <img
                src={
                  localStorage.profilePicture ||
                  "https://via.placeholder.com/50"
                }
                alt="Profile"
                className="desktop-self-profile-pic"
              />
              <div className="desktop-self-profile-info">
                <h2 className="desktop-self-profile-name">
                  {localStorage.username || "User Name"}
                </h2>
                <p className="desktop-self-profile-label">Position</p>
              </div>
            </div>
            <button
              className="desktop-self-profile-edit-button"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <div className="desktop-self-profile-stats">
              <div className="desktop-self-profile-stat">
                <span>Posts</span>
                <span className="desktop-self-profile-stat-value">{posts}</span>
              </div>
              <div className="desktop-self-profile-stat">
                <span>Likes</span>
                <span className="desktop-self-profile-stat-value">
                  {totalLikes}
                </span>
              </div>
              <div className="desktop-self-profile-stat">
                <span>Comments</span>
                <span className="desktop-self-profile-stat-value">
                  {totalComments}
                </span>
              </div>
            </div>
            <div className="desktop-self-profile-menu">
              <div
                className="desktop-self-profile-menu-item"
                onClick={() => navigate("/SelfSetting")}
              >
                Settings
              </div>
              <div className="desktop-self-profile-menu-item">Help</div>
              <div
                className="desktop-self-profile-menu-item desktop-self-profile-sign-out"
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
        <div className="desktop-connections-card">
          <div className="desktop-connections-item">
            <Link to="/NetworkPage" className="desktop-connection-link">
              Connection
            </Link>
          </div>
          <div className="desktop-connections-item">Edu-vault</div>
          <div className="desktop-connections-item active">
            <Link to="/HumanLibGuidelines" className="desktop-connection-link">
              Human Library
            </Link>
          </div>
          <div className="desktop-connections-item">Guidance</div>
          <div className="desktop-connections-item">NGOs</div>
          <div className="desktop-connections-item">
            <Link
              to={
                localStorage.getItem("userId")
                  ? `/blog/${localStorage.getItem("userId")}`
                  : "/blog"
              }
              className="desktop-connection-link"
            >
              Blog
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar with Updated Interface */}
      <div className="desktop-search-container" ref={searchContainerRef}>
        <div className="desktop-search-input-wrapper">
          <input
            type="text"
            placeholder="Search for users, trends, events, news..."
            className="desktop-search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
          />
          <FiSearch className="desktop-search-icon" />
        </div>
        {showResults && (
          <div className="desktop-search-results">
            <Background />
            {/* Search Results Section */}
            <div className="desktop-search-section">
              <h4 className="desktop-search-section-title">Users</h4>
              <div className="desktop-recent-search-list">
                {isLoading ? (
                  <div className="desktop-search-loading">Searching...</div>
                ) : error ? (
                  <div className="desktop-search-error">{error}</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="desktop-recent-search-item"
                      onClick={() => handleProfileClick(item.id)}
                    >
                      <img
                        src={item.avatar || "https://via.placeholder.com/40"}
                        alt={item.name}
                        className="desktop-recent-search-avatar"
                      />
                      <span className="desktop-recent-search-name">
                        {item.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="desktop-search-no-results">
                    No users found
                  </div>
                )}
              </div>
            </div>

            {/* Suggested Users Section */}
            <div className="desktop-search-section">
              <h4 className="desktop-search-section-title">Suggested</h4>
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="desktop-suggested-user-item"
                  onClick={() => handleProfileClick(user.id)}
                >
                  <img
                    src={ProfileImage}
                    alt={user.name}
                    className="desktop-suggested-user-avatar"
                  />
                  <div className="desktop-suggested-user-info">
                    <span className="desktop-suggested-user-name">
                      {user.name}
                    </span>
                    <p className="desktop-suggested-user-university">
                      {user.university}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs for Trend/Event/News */}
            <div className="desktop-search-section">
              <h4 className="desktop-search-section-title desktop-search-section-title2">
                What you should put your eyes & thoughts on
              </h4>
              <div className="desktop-search-tabs">
                {["Trend", "Event", "News"].map((tab, index) => (
                  <button
                    style={{
                      backgroundColor:
                        buttonscolor[index % buttonscolor.length],
                    }}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`desktop-search-tab-button ${
                      activeTab === tab ? "active" : ""
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Trend" ? (
                <div className="desktop-trend-results">
                  {trends.map((trend) => (
                    <div key={trend.id} className="desktop-trend-item">
                      <img
                        src={Trendimage}
                        alt={trend.title}
                        className="desktop-trend-image"
                      />
                      <div className="desktop-trend-info">
                        <p className="desktop-trend-title">{trend.title}</p>
                        <p className="desktop-trend-description">
                          {trend.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === "Event" ? (
                <div className="desktop-event-results">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <div key={event.id} className="desktop-event-item">
                        <img
                          src={
                            event.image || "https://via.placeholder.com/60x40"
                          }
                          alt={event.title}
                          className="desktop-event-image"
                        />
                        <div className="desktop-event-info">
                          <p className="desktop-event-title">{event.title}</p>
                          <p className="desktop-event-description">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="desktop-no-results">No events found</p>
                  )}
                </div>
              ) : (
                <div className="desktop-news-results">
                  {news.length > 0 ? (
                    news.map((item) => (
                      <div key={item.id} className="desktop-news-item">
                        <img
                          src={
                            item.image || "https://via.placeholder.com/60x40"
                          }
                          alt={item.title}
                          className="desktop-news-image"
                        />
                        <div className="desktop-news-info">
                          <p className="desktop-news-title">{item.title}</p>
                          <p className="desktop-news-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="desktop-no-results">No news found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logo */}
      <img
        src={UnisphereLogoIcon}
        alt="Unisphere Logo"
        className="desktop-logo-icon"
      />

      {/* Upload Section Overlay */}
      {showUploadSection && (
        <div className="desktop-upload-overlay" onClick={handleCloseUpload}>
          <div
            className="desktop-upload-container"
            onClick={(e) => e.stopPropagation()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {mediaList.length === 0 && (
              <div className="desktop-upload-first-div">
                <p className="desktop-upload-text">
                  Drag & Drop your media here
                </p>
                <button
                  className="desktop-upload-button"
                  onClick={() => inputRef.current.click()}
                >
                  Upload from computer
                </button>
              </div>
            )}
            {mediaList.length !== 0 && showAddMore && (
              <div className="desktop-after-upload">
                <div className="desktop-create-post-navbar">
                  <img src={BackIcon} alt="Back" onClick={handleCloseUpload} />
                  <h6
                    onClick={() => {
                      setShowPostDetails(true);
                      setShowAddMore(false);
                    }}
                  >
                    Continue
                  </h6>
                </div>
                <div className="desktop-preview-container">
                  {mediaList.map((media, index) => (
                    <div key={index} className="desktop-media-item">
                      {media.mediaType === "image" ? (
                        <img
                          className="desktop-imageAndVideo"
                          src={media.previewURL}
                          alt="Uploaded media"
                        />
                      ) : (
                        <video
                          className="desktop-imageAndVideo"
                          src={media.previewURL}
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="desktop-add-more-btn"
                  onClick={() => inputRef.current.click()}
                >
                  Add More
                </button>
              </div>
            )}
            {showPostDetails && (
              <div className="desktop-create-post-main-container">
                <div className="desktop-create-post-after-upload">
                  <div className="desktop-create-post-navbar">
                    <div className="desktop-image-and-name">
                      <img src={ProfileImage} alt="Profile" />
                      <h3>{username || "Himanshu Choudary"}</h3>
                    </div>
                    <h6 onClick={handlePostSubmit} disabled={isLoading}>
                      {isLoading ? "Posting..." : "Create Post"}
                    </h6>
                  </div>
                  <div className="desktop-post-content-container">
                    <div className="desktop-image-and-caption">
                      {mediaList.map((media, index) => (
                        <div
                          key={index}
                          className="desktop-post-media-container"
                        >
                          {media.mediaType === "image" ? (
                            <img
                              className="desktop-create-post-imageAndVideo"
                              src={media.previewURL}
                              alt="Uploaded media"
                            />
                          ) : (
                            <video
                              className="desktop-create-post-imageAndVideo"
                              src={media.previewURL}
                              controls
                            />
                          )}
                        </div>
                      ))}
                      <div className="desktop-form-group">
                        <label className="desktop-input-label">Caption</label>
                        <textarea
                          className="desktop-caption-input"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Write a caption..."
                          rows="4"
                        />
                      </div>
                    </div>
                    <div className="desktop-privacy-settings">
                      <div className="desktop-post-mention">
                        <h1>Add Mention</h1>
                        <IoIosAdd className="desktop-post-mention-icon" />
                      </div>
                      <div className="desktop-setting-item">
                        <div className="desktop-setting-info">
                          <h4>Hide Likes</h4>
                          <p className="desktop-setting-description">
                            Only you can see the number of likes on your post.
                          </p>
                        </div>
                        <label className="desktop-toggle-switch">
                          <input
                            type="checkbox"
                            checked={hideLikes}
                            onChange={(e) => setHideLikes(e.target.checked)}
                          />
                          <span className="desktop-slider desktop-round"></span>
                        </label>
                      </div>
                      <div className="desktop-setting-item">
                        <div className="desktop-setting-info">
                          <h4>Turn Off Comments</h4>
                          <p className="desktop-setting-description">
                            No one will be able to comment on this post.
                          </p>
                        </div>
                        <label className="desktop-toggle-switch">
                          <input
                            type="checkbox"
                            checked={disableComments}
                            onChange={(e) =>
                              setDisableComments(e.target.checked)
                            }
                          />
                          <span className="desktop-slider desktop-round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="desktop-submit-section">
                      {error && (
                        <p className="desktop-error-message">{error}</p>
                      )}
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
    </div>
  );
}

export default DesktopNavbar;