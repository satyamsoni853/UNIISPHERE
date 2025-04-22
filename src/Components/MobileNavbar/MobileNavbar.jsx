import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../Background/Background";
import "./MobileNavbar.css";
import { FiSearch } from "react-icons/fi";
import Messageicon from "./Messageicon.png";
import Usericon from "./Usericon.png";

import axios from "axios";
import debounce from "lodash/debounce";

function MobileNavbar() {
  // Search functionality state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "your-user-id-here";
  const token = localStorage.getItem("authToken");

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
      // setError("Failed to search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch unread messages count
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/messages/conversations?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch conversations: ${response.status}`);
        }

        const data = await response.json();
        const unread = data.filter(
          (msg) => msg.status === "unread" || !msg.read
        );
        setUnreadCount(unread.length);
      } catch (err) {
        console.error("Error fetching unread messages:", err);
      }
    };

    if (token) {
      fetchUnreadMessages();
    }
  }, [userId, token]);

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

  // Handle key press for accessibility
  const handleKeyDown = (e, userId) => {
    if (e.key === "Enter" || e.key === " ") {
      handleProfileClick(userId);
    }
  };

  // Initial load - fetch all profiles
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <div className="mobile-navbar-container">
      <Background />
      <div className="mobile-navbar">
        {/* Logo */}
        <img src={Usericon} alt="Logo" className="mobile-navbar-logo" />

        {/* Search Bar with Results */}
        <div className="mobile-navbar-search-container">
          <div className="mobile-navbar-search">
            <FiSearch className="mobile-navbar-search-icon" />
            <input
              type="text"
              placeholder="Search username"
              className="mobile-navbar-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="mobile-search-results">
              {isLoading ? (
                <div className="mobile-search-loading">Searching...</div>
              ) : error ? (
                <div className="mobile-search-error">{error}</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="mobile-search-result-item"
                    onClick={() => handleProfileClick(user.id)}
                    onKeyDown={(e) => handleKeyDown(e, user.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={user.profilePicture || Usericon}
                      alt={user.username}
                      className="mobile-search-result-avatar"
                    />
                    <div className="mobile-search-result-info">
                      <span className="mobile-search-result-name">
                        {user.username}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mobile-search-no-results">No users found</div>
              )}
            </div>
          )}
        </div>

        {/* Message Icon with Unread Badge */}
        <Link to="/MessageMobileInbox">
          <img
            src={Messageicon}
            alt="Message"
            className="mobile-navbarr-icon"
          />
        </Link>
      </div>
    </div>
  );
}

export default MobileNavbar;