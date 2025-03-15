import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { PiShareFatThin } from "react-icons/pi";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";
import "./DesktopMiddle.css";
import MiddlemainImage from "./Middle-image-main.png";
import ConnectMidlleimage from "./middleconnectimage.png";
import Profileimage from "./Profile-image.png";

function DesktopMiddle() {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Access location state and navigation
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get authentication data from multiple sources
  const getAuthData = () => {
    // First check location state (from direct navigation)
    if (location.state?.userToken && location.state?.userId) {
      return {
        token: location.state.userToken,
        userId: location.state.userId
      };
    }
    
    // Then try localStorage (for persistence across refreshes)
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedToken && storedUserId) {
      return {
        token: storedToken,
        userId: storedUserId
      };
    }
    
    // Return null if no auth data found
    return null;
  };
  
  // Get authentication data
  const authData = getAuthData();

  useEffect(() => {
    // Store authentication in localStorage if available in location state
    if (location.state?.userToken) {
      localStorage.setItem('authToken', location.state.userToken);
    }
    if (location.state?.userId) {
      localStorage.setItem('userId', location.state.userId);
    }
    
    const fetchData = async () => {
      // Check for authentication data
      if (!authData) {
        console.error("No authentication data available");
        setError("You are not logged in. Please log in to view content.");
        setImageLoading(false);
        // Optional: Redirect to login page
        // navigate('/login');
        return;
      }

      setImageLoading(true);
      
      try {
        console.log(`Making API request with token: ${authData.token.substring(0, 15)}...`);
        
        const response = await axios.get(
          `https://uniisphere-1.onrender.com/api/feed`,
          {
            headers: {
              Authorization: `Bearer ${authData.token}`
            }
          }
        );
        
        console.log(response);
        console.log("API response received:", response.data);
        
        if (response.data.posts && response.data.posts.length > 0) {
          setMediaUrl(response.data.posts[0].mediaUrl);
        } else {
          console.log("No posts found in response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
        // Handle 401/403 errors specially
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setError("Your session has expired. Please log in again.");
          // Clear invalid tokens
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          // Optional: Redirect to login
          // navigate('/login');
        } else {
          setError("Failed to load content. Please try again later.");
        }
        
        setMediaUrl(null);
      } finally {
        setImageLoading(false);
      }
    };

    fetchData();
  }, [location.state]); // Dependencies include location.state to react to navigation changes

  return (
    <div className="middle-middle-card">
      {/* Display error message if there's an error */}
      {error && (
        <div className="error-message" style={{ color: "red", padding: "10px", textAlign: "center" }}>
          {error}
        </div>
      )}
      
      {/* Rest of your component remains the same */}
      {/* Profile Header */}
      <div className="middle-profile-header">
        <img src={Profileimage} alt="Profile" className="middle-profile-pic" />
        <div className="middle-profile-info">
          <div className="middle-profile-top">
            <span className="middle-profile-name">Vijay Prasad</span>
            <span className="middle-post-time">18h</span>
          </div>
          <p className="middle-profile-details">
            University of Delhi | Works at Google
          </p>
        </div>
        <BsThreeDotsVertical className="middle-options-icon" />
      </div>
      
      {/* Main Image Container with Loading State */}
      <div className="middle-main-image">
        {imageLoading ? (
          <div>Loading image...</div>
        ) : mediaUrl ? (
          <img
            src={mediaUrl}
            alt="Main"
            className="middle-content-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
        ) : !error ? (
          <img
            src={MiddlemainImage}
            alt="Main"
            className="middle-content-image"
          />
        ) : null}
      </div>
      
      {/* Action Bar */}
      <div className="middle-action-bar">
        <img
          src={ConnectMidlleimage}
          alt="Connect"
          className="middle-connect-image"
        />
        <div className="middle-action-icons">
          <PiShareFatThin className="middle-icon" />
          <TfiCommentsSmiley className="middle-icon" />
          <CiHeart className="middle-icon" />
        </div>
      </div>

      {/* Post Text */}
      <div className="middle-post-text">
        <span className="middle-post-author">Vijay Prasad</span> Been have
        evolved to go in the university and will probably prefer the university
        of... <span className="middle-see-more">more</span>
      </div>
    </div>
  );
}

export default DesktopMiddle;
