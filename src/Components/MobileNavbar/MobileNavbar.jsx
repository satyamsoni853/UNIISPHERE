import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../Background/Background";
import "./MobileNavbar.css";
import { FiSearch } from "react-icons/fi";
import Messageicon from "./Messageicon.png";
import Usericon from "./Usericon.png";
import axios from "axios";
import debounce from "lodash/debounce";
import { IoIosArrowForward } from "react-icons/io";

// Icons
import UserIcon from "./Usericon.png";

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

  const searchContainerRef = useRef(null); // Ref for the search container

  // Search-related state
  const buttonscolor = ["#DB3E3933", "#DDC058", "#A17A97"];
  const [activeTab, setActiveTab] = useState("Trend");
  const [recentSearches] = useState([]); // Initialize as empty array
  const [suggestedUsers] = useState([
    {
      id: 7,
      name: "Rahul",
      university: "UPES",
      profilePictureUrl: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "Satyam",
      university: "IITM",
      profilePictureUrl: "https://via.placeholder.com/40",
    },
    {
      id: 9,
      name: "Jack",
      university: "Delhi University",
      profilePictureUrl: "https://via.placeholder.com/40",
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

  // Combine filtered recent searches with search results
  const filteredRecentSearches = recentSearches.filter((search) =>
    search.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const combinedRecentResults = searchQuery
    ? [
        ...filteredRecentSearches,
        ...searchResults.filter(
          (user) =>
            !filteredRecentSearches.some((search) => search.id === user.id)
        ),
      ]
    : recentSearches;

  // Click outside handler to close the search results
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

  // Fetch profiles by username
  const fetchProfiles = useCallback(async (username = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://uniisphere-1.onrender.com/getProfile/profile/?search=${encodeURIComponent(username)}`
      );
      console.log("Search API Response:", response.data);
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Failed to fetch profiles");
      setSearchResults([]);
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
        <div className="mobile-navbar-search-container" ref={searchContainerRef}>
          <div className="mobile-navbar-search">
            <FiSearch className="mobile-navbar-search-icon" />
            <input
              type="text"
              placeholder="Search username"
              className="mobile-navbar-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
            />
          </div>

          {/* Search Bar with Updated Interface */}
          {showResults && (
            <div className="mobile-search-results">
              {/* Recent Searches Section with Search Results */}
              <div className="mobile-search-section">
                <h4 className="mobile-search-section-title">Recent</h4>
                <div className="mobile-recent-search-list">
                  {isLoading ? (
                    <div className="mobile-search-loading">Searching...</div>
                  ) : error ? (
                    <div className="mobile-search-error">{error}</div>
                  ) : combinedRecentResults.length > 0 ? (
                    <div className="mobile-search-recents-list">
                      {combinedRecentResults.map((item) => (
                        <div
                          key={item.id}
                          className="mobile-recent-search-item"
                          onClick={() => handleProfileClick(item.id)}
                          onKeyDown={(e) => handleKeyDown(e, item.id)}
                          tabIndex={0}
                        >
                          <img
                            src={item.profilePictureUrl || UserIcon}
                            alt={item.name || item.username}
                            className="mobile-recent-search-avatar"
                            loading="lazy"
                            onError={(e) => (e.target.src = UserIcon)}
                          />
                          <span className="mobile-recent-search-name">
                            {item.name || item.username}
                          </span>
                        </div>
                      ))}
                      <IoIosArrowForward className="mobile-recent-search-arrow" />
                    </div>
                  ) : (
                    <div className="mobile-search-no-results">
                      No recent searches
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested Users Section */}
              <div className="mobile-search-section">
                <h4 className="mobile-search-section-title">Suggested</h4>
                {suggestedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="mobile-suggested-user-item"
                    onClick={() => handleProfileClick(user.id)}
                    onKeyDown={(e) => handleKeyDown(e, user.id)}
                    tabIndex={0}
                  >
                    <img
                      src={user.profilePictureUrl || UserIcon}
                      alt={user.name}
                      className="mobile-suggested-user-avatar"
                      loading="lazy"
                      onError={(e) => (e.target.src = UserIcon)}
                    />
                    <div className="mobile-suggested-user-info">
                      <span className="mobile-suggested-user-name">{user.name}</span>
                      <p className="mobile-suggested-user-university">
                        {user.university}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs for Trend/Event/News */}
              <div className="mobile-search-section">
                <div className="mobile-search-title-wrapper">
                  <h4 className="mobile-search-section-title2">
                    What you should put your eyes & thoughts on
                  </h4>
                </div>
                <div className="mobile-search-tabs">
                  {["Trend", "Event", "News"].map((tab, index) => (
                    <button
                      style={{
                        backgroundColor:
                          buttonscolor[index % buttonscolor.length],
                      }}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`mobile-search-tab-button ${
                        activeTab === tab ? "active" : ""
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content based on active tab */}
                {activeTab === "Trend" ? (
                  <div className="mobile-trend-results">
                    {trends.map((trend) => (
                      <div key={trend.id} className="mobile-trend-item">
                        <img
                          src={trend.image}
                          alt={trend.title}
                          className="mobile-trend-image"
                          loading="lazy"
                          onError={(e) => (e.target.src = UserIcon)}
                        />
                        <div className="mobile-trend-info">
                          <p className="mobile-trend-title">{trend.title}</p>
                          <p className="mobile-trend-description">{trend.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activeTab === "Event" ? (
                  <div className="mobile-event-results">
                    {events.length > 0 ? (
                      events.map((event) => (
                        <div key={event.id} className="mobile-event-item">
                          <img
                            src={event.image || "https://via.placeholder.com/60x40"}
                            alt={event.title}
                            className="mobile-event-image"
                            loading="lazy"
                            onError={(e) => (e.target.src = UserIcon)}
                          />
                          <div className="mobile-event-info">
                            <p className="mobile-event-title">{event.title}</p>
                            <p className="mobile-event-description">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="mobile-no-results">No events found</p>
                    )}
                  </div>
                ) : (
                  <div className="mobile-news-results">
                    {news.length > 0 ? (
                      news.map((item) => (
                        <div key={item.id} className="mobile-news-item">
                          <img
                            src={item.image || "https://via.placeholder.com/60x40"}
                            alt={item.title}
                            className="mobile-news-image"
                            loading="lazy"
                            onError={(e) => (e.target.src = UserIcon)}
                          />
                          <div className="mobile-news-info">
                            <p className="mobile-news-title">{item.title}</p>
                            <p className="mobile-news-description">{item.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="mobile-no-results">No news found</p>
                    )}
                  </div>
                )}
              </div>
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