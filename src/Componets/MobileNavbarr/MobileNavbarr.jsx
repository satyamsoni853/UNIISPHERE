import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../Background/Background";
import "./MobileNavbarr.css";
import { FiSearch } from "react-icons/fi";
import Messageicon from "./Messageicon.png";
import Usericon from "./Usericon.png";
import Unispherelogoicon from "./Unispherelogoicon.png";
import axios from "axios";
import debounce from "lodash/debounce";

import { CiSearch } from "react-icons/ci";

function MobileNavbarr() {
  // Search functionality state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      setError("Failed to search. Please try again.");
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

  return (
    <div className="mobile-navbarr-container">
      <Background />
      <div className="mobile-navbarr">
        {/* Logo */}
        <img
          src={Unispherelogoicon}
          alt="Logo"
          className="mobile-navbarr-logo"
        />

        {/* Search Bar with Results */}
        <div className="mobile-navbarr-search-container">
          <div className="mobile-navbarr-search">
            <FiSearch className="mobile-navbarr-search-icon" />
            <input
              type="text"
              placeholder="Search username"
              className="mobile-navbarr-input"
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

        {/* Message Icon */}
        <img src={Messageicon} alt="Message" className="mobile-navbarr-icon" />

        {/* User Icon */}
        <img src={Usericon} alt="User" className="mobile-navbarr-icon" />
      </div>
    </div>
  );
}

export default MobileNavbarr;
