import React, { useState, useEffect } from "react";
import "./DesktopMiddle.css";
import ConnectMidlleimage from "./middleconnectimage.png";
import MiddlemainImage from "./Middle-image-main.png";
import Profileimage from "./Profile-image.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiShareFatThin } from "react-icons/pi";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation to access state

function DesktopMiddle() {
  // State to store the mediaUrl from the API
  const [mediaUrl, setMediaUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true); // Separate loading state for the image

  // Get token and userId from location state
  const location = useLocation();
  const { userToken, userId } = location.state || {};

  // Fetch data from the API when the component mounts or when userId/token changes
  useEffect(() => {
    const fetchData = async () => {
      if (!userToken || !userId) {
        console.error("Missing userToken or userId");
        setImageLoading(false);
        return;
      }

      setImageLoading(true);

      try {
        const response = await axios.get(
          `https://uniisphere-1.onrender.com/api/feed?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // Check if response contains posts and update state
        if (response.data.posts && response.data.posts.length > 0) {
          setMediaUrl(response.data.posts[0].mediaUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMediaUrl(null);
      } finally {
        setImageLoading(false);
      }
    };

    fetchData();
  }, [userToken, userId]); // Dependencies include userToken and userId

  return (
    <div className="middle-middle-card">
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
          <div>Loading image...</div> // Show loading text while fetching
        ) : mediaUrl ? (
          <img
            src={mediaUrl}
            alt="Main"
            className="middle-content-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300"; // Fallback if image fails to load
            }}
          />
        ) : (
          <img
            src={MiddlemainImage} // Fallback image if no mediaUrl
            alt="Main"
            className="middle-content-image"
          />
        )}
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