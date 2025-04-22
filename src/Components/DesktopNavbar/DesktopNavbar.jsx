import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./DesktopNavbar.css";

// Icons (standardized casing to match typical file naming)
import AddBlack from "./AddBlack.svg";
import AddWhite from "./AddWhite.svg";
import BackIcon from "./BackSvg.svg";
import HomeBlack from "./HomeBlack.svg";
import HomeWhite from "./HomeWhite.svg";
import NetworkBlack from "./NetworkBlack.svg";
import NetworkWhite from "./NetworkWhite.svg";
import NotificationBlack from "./NotificationBlack.svg";
import NotificationWhite from "./NotificationWhite.svg";
import ProfileImage from "./ProfileImage.png";
import UnisphereLogoIcon from "./UnisphereLogoIcon.png";
import UserIcon from "./UserIcon.png";

function DesktopNavbar() {
  // State (using camelCase for consistency)
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
  const [showAddMore, setShowAddMore] = useState(true); // Fixed 'showAddmore'
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hideLikes, setHideLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [mentions, setMentions] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [posts, setPosts] = useState(0);
  const [username, setUsername] = useState(""); // Changed 'Username' to 'username'
  const [userProfileImage, setUserProfileImage] = useState(""); // Changed 'UserProfileImage' to 'userProfileImage'
  const [loading, setLoading] = useState(true);
  const [allUsersResponse, setAllUsersResponse] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Notification state
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState("Today");
  const [notifications, setNotifications] = useState([
    {
      time: "2 hrs",
      message: "Hello brother, how are you? I'm doing that ...", // Fixed message clarity
      alert: true,
      color: "notification-border-blue-400",
    },
    {
      time: "3 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "notification-border-yellow-400",
    },
    {
      time: "6 hrs",
      message: "Hello brother, how are you? I'm doing that ...",
      alert: true,
      color: "notification-border-red-400",
    },
    {
      time: "8 hrs",
      message: "Hello brother, how are you? I'm sure that ...",
      alert: false,
      color: "notification-border-gray-400",
    },
    {
      time: "12 hrs",
      message: "Hello brother, how are you? I'm sure that ...",
      alert: false,
      color: "notification-border-gray-400",
    },
    {
      time: "18 hrs",
      message: "Hello brother, how are you? I'm sure that ...",
      alert: false,
      color: "notification-border-blue-400",
    },
    {
      time: "2 days",
      message: "Hello brother, how are you? I'm sure that ...",
      alert: false,
      color: "notification-border-gray-400",
    },
  ]);

  // Fetch connections from the API
  useEffect(() => {
    const fetchConnections = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("Authentication token not found");
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
          err.response ? err.response.data : err.message
        );
      }
    };
    fetchConnections();
  }, []);

  // Fetch all users and print user IDs
  useEffect(() => {
    const fetchAllUsers = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          "https://uniisphere-1.onrender.com/users/getAll",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        // Ensure response.data is an array
        const users = Array.isArray(response.data) ? response.data : [];
        setAllUsersResponse(users);
        // Print all user IDs to console
        console.log("All User IDs:");
        users.forEach((user) => {
          console.log(`User ID: ${user.id}`);
        });
      } catch (err) {
        console.error("Error fetching all users:", err);
        setError(err.message || "Failed to fetch users");
        setAllUsersResponse([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

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
        `https://uniisphere-1.onrender.com/getProfile/profile/?search=${username}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch stats from /posts
  const fetchStats = async () => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (!authToken || !userId) {
      setError("Authentication required");
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
      if (response.data.totalPosts && response.data.totalPosts.length > 0) {
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
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
      // setError("Failed to fetch stats");
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
      setError("Only letters, numbers, and underscores allowed");
    }
  };

  // Handle profile click with ID comparison
  const handleProfileClick = (userId) => {
    localStorage.setItem("SearchUserId", userId);
    // Check if allUsersResponse is loaded and is an array
    if (allUsersResponse && Array.isArray(allUsersResponse)) {
      // Check if userId exists in allUsersResponse
      const idExists = allUsersResponse.some((user) => user.id === userId);
      console.log(`Checking if User ID ${userId} exists: ${idExists}`);
      if (idExists) {
        navigate(`/AfterConnecting/${userId}`);
      } else {
        navigate(`/DesFollowerMiddleSectionPrivacy`);
      }
    } else {
      // Fallback if allUsersResponse is not loaded
      console.error("User data not loaded yet or invalid:", allUsersResponse);
      navigate(`/DesFollowerMiddleSectionPrivacy`);
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
    setActiveIcon((prev) =>
      prev === "notifications" ? null : "notifications"
    );
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
        throw new Error("User not authenticated. Please log in.");
      }

      const formData = new FormData();
      mediaList.forEach((media) => {
        formData.append("media", media.file);
      });

      formData.append("content", caption);
      formData.append("userId", userId);
      formData.append("visibility", hideLikes ? "private" : "public");
      formData.append("location", location || "");
      formData.append("tags", "");

      const postResponse = await axios.post(
        "https://uniisphere-1.onrender.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Post created:", postResponse.data);

      // Reset form state
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
      <img
        src={activeIcon === "home" ? HomeWhite : HomeBlack}
        alt="Home"
        className="desktop-icon"
        onClick={() => handleIconClick("home")}
      />
      <img
        src={activeIcon === "network" ? NetworkWhite : NetworkBlack}
        alt="Network"
        className="desktop-icon"
        onClick={() => {
          setShowDropdown((prev) => !prev);
          setShowNotificationDropdown(false);
        }}
      />
      <img
        src={activeIcon === "add" ? AddWhite : AddBlack}
        alt="Add"
        className="desktop-icon"
        onClick={() => handleIconClick("add")}
      />

      {/* Notification Icon with Dropdown */}
      <div className="notification-icon-container">
        <img
          src={
            activeIcon === "notifications"
              ? NotificationWhite
              : NotificationBlack
          }
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
                  className={`notification-tab-button ${
                    activeNotificationTab === tab ? "active" : ""
                  }`}
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
                    {notif.alert && (
                      <span className="notification-alert">🔔</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="notification-empty">
                  No notifications in this time range.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Dropdown */}
      <div className="user-icon-container">
        <img
          src={userProfileImage || UserIcon}
          alt="User"
          className="desktop-user-icon"
          onClick={handleUserIconClick}
        />
        {isUserDropdownOpen && (
          <div className="self-profile-card">
            <div className="self-profile-header">
              <img
                src={
                  localStorage.profilePicture ||
                  "https://via.placeholder.com/50"
                }
                alt="Profile"
                className="self-profile-pic"
              />
              <div className="self-profile-info">
                <h2 className="self-profile-name">
                  {localStorage.username || "User Name"}
                </h2>
                <p className="self-profile-label">Position</p>
              </div>
            </div>
            <button
              className="self-profile-edit-button"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <div className="self-profile-stats">
              <div className="self-profile-stat">
                <span>Posts</span>
                <span className="self-profile-stat-value">{posts}</span>
              </div>
              <div className="self-profile-stat">
                <span>Likes</span>
                <span className="self-profile-stat-value">{totalLikes}</span>
              </div>
              <div className="self-profile-stat">
                <span>Comments</span>
                <span className="self-profile-stat-value">{totalComments}</span>
              </div>
            </div>
            <div className="self-profile-menu">
              <div
                className="self-profile-menu-item"
                onClick={() => navigate("/SelfSetting")}
              >
                Settings
              </div>
              <div className="self-profile-menu-item">Help</div>
              <div
                className="self-profile-menu-item self-profile-sign-out"
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
            <Link to="/NetworkPage" className="connection-link">
              Connection
            </Link>
          </div>
          <div className="connections-item">Edu-vault</div>
          <div className="connections-item active">
            <Link to="/HumanLib" className="connection-link">
              Human Library
            </Link>
          </div>
          <div className="connections-item">Guidance</div>
          <div className="connections-item">NGOs</div>
          <div className="connections-item">
            <Link
              to={
                localStorage.getItem("userId")
                  ? `/blog/${localStorage.getItem("userId")}`
                  : "/blog"
              }
              className="connection-link"
            >
              Blog
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="desktop-search-container">
        <div className="desktop-search-input-wrapper">
          <input
            type="text"
            placeholder="Search for users" // Improved placeholder
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
                    src={user.profilePicture || UserIcon}
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
      <img
        src={UnisphereLogoIcon}
        alt="Unisphere Logo"
        className="desktop-logo-icon"
      />

      {/* Upload Section Overlay */}
      {showUploadSection && (
        <div className="upload-overlay" onClick={handleCloseUpload}>
          <div
            className="upload-container"
            onClick={(e) => e.stopPropagation()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {mediaList.length === 0 && (
              <div className="upload-first-div">
                <p className="upload-text">Drag & Drop your media here</p>
                <button
                  className="upload-button"
                  onClick={() => inputRef.current.click()}
                >
                  Upload from computer
                </button>
              </div>
            )}

            {mediaList.length !== 0 && showAddMore && (
              <div className="after-upload">
                <div className="navbar">
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
                      <img src={ProfileImage} alt="Profile" />
                      <h3>{username || "Himanshu Choudary"}</h3>
                    </div>
                    <h6 onClick={handlePostSubmit} disabled={isLoading}>
                      {isLoading ? "Posting..." : "Create Post"}
                    </h6>
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
                      <div className="mention-button">+</div>
                    </div>
                    <div className="privacy-settings">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Hide Likes</h4>
                          <p className="setting-description">
                            Only you can see the number of likes on your post.
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
                            No one will be able to comment on this post.
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={disableComments}
                            onChange={(e) =>
                              setDisableComments(e.target.checked)
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="submit-section">
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

      {/* Hidden file input */}
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default DesktopNavbar;