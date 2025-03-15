import React, { useEffect, useState } from "react";
import "./MobileMiddlesection.css";
import MobileNavbarr from "../MobileNavbarr/MobileNavbarr";
import MobileFooter from "../Mobilefooter/MobileFooter";
import ConnectMidlleimage from "./middleconnectimage.png";
import MiddlemainImage from "./Middle-image-main.png";
import Profileimage from "./Profile-image.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiShareFatThin } from "react-icons/pi";
import Background from "../Background/Background";
import Smallimage1 from "./small-image1.png";
import Smallimage2 from "./small-image2.png";
import Smallimage3 from "./small-image3.png";
import Smallimage4 from "./small-image4.png";
import Smallimage5 from "./small-image5.png";
import Smallimage6 from "./small-image6.png";
import Smallimage7 from "./small-image7.png";
import Smallimage8 from "./small-image8.png";

function MobileMiddlesection() {
  const [posts, setPosts] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  const authData = getAuthData();

  useEffect(() => {
    if (location.state?.userToken) {
      localStorage.setItem("authToken", location.state.userToken);
    }
    if (location.state?.userId) {
      localStorage.setItem("userId", location.state.userId);
    }

    const fetchData = async () => {
      if (!authData) {
        setError("You are not logged in. Please log in to view content.");
        setImageLoading(false);
        return;
      }

      setImageLoading(true);
      try {
        const response = await axios.get("https://uniisphere-1.onrender.com/api/feed", {
          headers: { Authorization: `Bearer ${authData.token}` },
        });
        console.log(response.data);
        console.log(response);

        if (response.data.posts && response.data.posts.length > 0) {
          const updatedPosts = response.data.posts.map(post => ({
            ...post,
            likes: post.likes || 0,
            isLiked: false, // Initial like state per post
            comments: post.comments || [],
          }));
          setPosts(updatedPosts);
        }
      } catch (error) {
        setError("Failed to load content. Please try again later.");
        setPosts([]);
      } finally {
        setImageLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  return (
    <div className="middle-middle-card">
      {error && <div className="error-message">{error}</div>}
      

      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="post-container">
            {/* Profile Header */}
            <div className="middle-profile-header">
              <img src={Profileimage} alt="Profile" className="middle-profile-pic" />
              <div className="middle-profile-info">
                <div className="middle-profile-top">
                  <span className="middle-profile-name">{post.name || "Unknown Author"}</span>
                  <span className="middle-post-time">18h</span>
                </div>
                <p className="middle-profile-details">{post.authorDetails || "University of Delhi | Works at Google"}</p>
              </div>
              <BsThreeDotsVertical className="middle-options-icon" />
            </div>

            {/* Main Image */}
            <div className="middle-main-image">
              {imageLoading ? (
                <div>Loading image...</div>
              ) : post.mediaUrl ? (
                <img src={post.mediaUrl} alt={`Post ${index + 1}`} className="middle-content-image" onError={(e) => (e.target.src = "https://via.placeholder.com/300")} />
              ) : (
                <img src={MiddlemainImage} alt="Default Post" className="middle-content-image" />
              )}
            </div>

            {/* Action Bar */}
            <div className="middle-action-bar">
              <img src={ConnectMidlleimage} alt="Connect" className="middle-connect-image" />
              <div className="middle-action-icons">
                {/* Like Button */}
                <div className="middle-icon-container" onClick={() => handleLike(index)}>
                  <span className="middle-icon-count">{post.likes}</span>
                  <CiHeart className={`middle-icon ${post.isLiked ? "liked" : ""}`} />
                </div>

                {/* Comments Count */}
                <div className="middle-icon-container">
                  <span className="middle-icon-count">{post.comments.length}</span>
                  <TfiCommentsSmiley className="middle-icon" />
                </div>

                {/* Share Placeholder */}
                <div className="middle-icon-container">
                  <PiShareFatThin className="middle-icon" />
                </div>
              </div>
            </div>

            {/* Post Text */}
            <div className="middle-post-text">
              <span className="middle-post-author">{post.authorName || "Unknown Author"}</span> {post.caption || "No caption available"}
              <span className="middle-see-more">...more</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default MobileMiddlesection;
