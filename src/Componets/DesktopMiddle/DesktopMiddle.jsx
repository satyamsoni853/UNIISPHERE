

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { PiShareFatThin } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import "./DesktopMiddle.css";

// Replace these imports with your actual images/paths
import MiddlemainImage from "./Middle-image-main.png";
import ConnectMidlleimage from "./middleconnectimage.png";
import Profileimage from "./Profile-image.png";
import Commenticonsvg from "./Commenticon.svg";
import profilePhoto from "./profilephoto.png";
import Threedot from "./Threedot.svg";
import Connect from "./Connect.png";
import ShareIcon from "./Share.svg";
import LikeIcon from "./Like.svg";
import CommentIcon from "./Comment.svg";

// Share box icons
import savedIcon from "./saved.svg";
import whatsappIcon from "./Whatsapp.svg";
import facebookIcon from "./Facebook.svg";
import instaIcon from "./insta.svg";
import linkIcon from "./Link.svg";
import xIcon from "./X.svg";

function DesktopMiddle() {
  // Static user data
  const userData = {
    profilePicture: profilePhoto,
    name: "VIJAY PRASAD",
    education: " University of Delhi ",
    workPlace: " Works at Google",
  };

  // Static comments data
  const comments = [
    {
      profilePicture: profilePhoto,
      username: "Updesh",
      timestamp: "1d ago",
      text: "It's so true men.",
      likes: 10054,
    },
    {
      profilePicture: profilePhoto,
      username: "Ajiket",
      timestamp: "5d ago",
      text: "Damnn.",
      likes: 2457,
    },
    {
      profilePicture: profilePhoto,
      username: "Rohit",
      timestamp: "1w ago",
      text: "I am with you brother",
      likes: 150,
    },
    {
      profilePicture: profilePhoto,
      username: "Anjali",
      timestamp: "1m ago",
      text: "There is no way in which they will now.",
      likes: 91,
    },
  ];

  const [showComment, setShowComment] = useState(false);

  // Share box data
  const persons = [
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
  ];

  const [showShare, setShowshare] = useState(false);

  const [posts, setPosts] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId
      ? { token: storedToken, userId: storedUserId }
      : null;
  };

  useEffect(() => {
    if (location.state?.userToken) {
      localStorage.setItem("authToken", location.state.userToken);
    }
    if (location.state?.userId) {
      localStorage.setItem("userId", location.state.userId);
      setUserId(location.state.userId);
    }

    const fetchData = async () => {
      const authData = getAuthData();
      if (!authData) {
        setError("You are not logged in. Please log in to view content.");
        setImageLoading(false);
        return;
      }

      setImageLoading(true);
      try {
        const response = await axios.get(
          "https://uniisphere-1.onrender.com/api/feed",
          {
            headers: { Authorization: `Bearer ${authData.token}` },
          }
        );

        // Extract and store userId from API response if available
        if (response.data.userId) {
          setUserId(response.data.userId);
          localStorage.setItem("userId", response.data.userId);
        }

        if (response.data.posts && response.data.posts.length > 0) {
          const updatedPosts = response.data.posts.map((post) => {
            return {
              ...post,
              authorId: post.authorId || "unknown",
              likes: post.likes || 0,
              isLiked: false,
              comments: post.comments || [],
            };
          });
          setPosts(updatedPosts);
        }
      } catch (error) {
        setError("Failed to load content. Please try again later.");
        console.error("Fetch error:", error);
      } finally {
        setImageLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleLike = (index) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleCommentClick = (index) => {
    setActiveCommentPostIndex(index);
    setNewComment("");
  };

  const handleCloseCommentModal = () => {
    setActiveCommentPostIndex(null);
  };

  const handleCommentSubmit = (index) => {
    if (!newComment.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? {
              ...post,
              comments: [...post.comments, { text: newComment, author: "You" }],
            }
          : post
      )
    );
    setNewComment("");
  };

  const handleProfileClick = (userId) => {
    if (userId) {
      navigate(`/FollowerMiddleSectionPrivacy/${userId}`);
    } else {
      console.log("Error: userId is missing!");
    }
  };

  return (
    <div className="middle-container">
      <div className="middle-middle-card">
        {error && <div className="error-message">{error}</div>}

        {imageLoading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-container">
              <div className="middle-profile-header">
                <div
                  onClick={() => handleProfileClick(userId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={Profileimage}
                    alt="Profile"
                    className="middle-profile-pic"
                  />
                </div>

                <div className="middle-profile-info">
                  <div className="middle-profile-top">
                    <span className="middle-profile-name">
                      {post.authorName || "Unknown Author"}
                    </span>
                    <span className="middle-post-time">18h</span>
                  </div>
                  <p className="middle-profile-details">
                    {post.authorDetails ||
                      "University of Delhi | Works at Google"}
                  </p>
                </div>
                <BsThreeDotsVertical className="middle-options-icon" />
              </div>

              <div className="middle-main-image">
                {post.mediaUrl ? (
                  <img
                    src={post.mediaUrl}
                    alt={`Post ${index + 1}`}
                    className="middle-content-image"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/300")
                    }
                  />
                ) : (
                  <img
                    src={MiddlemainImage}
                    alt="Default Post"
                    className="middle-content-image"
                  />
                )}
              </div>

              <div className="middle-action-bar">
                <img
                  src={ConnectMidlleimage}
                  alt="Connect"
                  className="middle-connect-image"
                />
                <div className="middle-action-icons">
                  <div
                    className="middle-icon-container"
                    onClick={() => handleLike(index)}
                  >
                    <span className="middle-icon-count">{post.likes}</span>
                    <img
                      src={LikeIcon}
                      className={`middle-icon ${post.isLiked ? "liked" : ""}`}
                      alt="Like"
                    />
                  </div>
                  <div
                    className="middle-icon-container"
                    onClick={() => {
                      setShowComment((prev) => !prev);
                      handleCommentClick(index);
                    }}
                  >
                    <span className="middle-icon-count">
                      {post.comments.length}
                    </span>
                    <img src={Commenticonsvg} alt="Comment" />
                  </div>
                  <div
                    onClick={() => setShowshare(true)}
                    className="middle-icon-container"
                  >
                    <img src={ShareIcon} className="middle-icon" alt="Share" />
                  </div>
                </div>
              </div>

              <div className="middle-post-text">
                <span className="middle-post-author">
                  {post.authorName || "Unknown Author"}
                </span>{" "}
                {post.caption || "No caption available"}
                <span className="middle-see-more">...more</span>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {/* ===================== COMMENT BOX ===================== */}
      {showComment && (
        <div className="Comment-box-container">
          <div className="Full-comment-section-desktop-main-container">
            {/* Left Section */}
            <div className="Full-comment-section-desktop-left-section">
              <div className="Full-comment-section-desktop-user-profile-header">
                <div className="Full-comment-section-profile-image-and-heading">
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="Full-comment-section-desktop-profile-picture"
                  />
                  <div className="Full-comment-section-desktop-user-info">
                    <div className="Full-comment-section-desktop-name-and-postTime">
                      <span className="Full-comment-section-desktop-user-name">
                        {userData.name}
                      </span>
                      <span className="Full-comment-section-desktop-user-details">
                        18h
                      </span>
                    </div>
                    <div className="Full-comment-section-desktop-work-and-education">
                      <span className="Full-comment-section-desktop-user-details">
                        {userData.education}
                      </span>
                      <span className="Full-comment-section-desktop-user-details">
                        ||
                      </span>
                      <span className="Full-comment-section-desktop-user-details">
                        {userData.workPlace}
                      </span>
                    </div>
                  </div>
                </div>
                <img
                  src={Threedot}
                  className="Full-comment-section-desktop-menu-icon"
                  alt="Menu"
                />
              </div>
              <div className="Full-comment-section-desktop-photo-container">
                <img
                  src={userData.profilePicture}
                  alt="Post"
                  className="Full-comment-section-desktop-post-photo"
                />
                <div className="Full-comment-section-desktop-action-buttons">
                  <div className="Full-comment-section-desktop-connect-div">
                    <img
                    
                      src={Connect}
                      className="Full-comment-section-desktop-connect-icon"
                      alt="Connect"
                    />
                  </div>
                  <div className="Full-comment-section-desktop-share-like-comment-icon">
                    <img
                      src={ShareIcon}
                      className="Full-comment-section-desktop-post-icons"
                      alt="Share"
                    />
                    <img
                      src={CommentIcon}
                      className="Full-comment-section-desktop-post-icons"
                      alt="Comment"
                    />
                    <img
                      src={LikeIcon}
                      className="Full-comment-section-desktop-post-icons"
                      alt="Like"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="Full-comment-section-desktop-right-section">
              <div className="Full-comment-section-desktop-comments-header">
                <h1 className="Full-comment-section-desktop-heading">
                  Comments
                </h1>
              </div>
              <div className="Full-comment-section-desktop-comments-list">
                {comments.map((comment, index) => (
                  <div
                    className="Full-comment-section-desktop-comment-main-parent"
                    key={index}
                  >
                    <div className="Full-comment-section-desktop-comment">
                      <img
                        src={comment.profilePicture}
                        alt="Profile"
                        className="Full-comment-section-desktop-comment-profile-picture"
                      />
                      <div className="Full-comment-section-desktop-comment-content">
                        <div className="Full-comment-section-desktop-comment-user-info">
                          <span className="Full-comment-section-desktop-comment-username">
                            {comment.username}
                          </span>
                          <span className="Full-comment-section-desktop-comment-timestamp">
                            {comment.timestamp}
                          </span>
                        </div>
                        <div className="Full-comment-section-desktop-comment-text">
                          {comment.text}
                        </div>
                        <div className="Full-comment-section-desktop-comment-actions">
                          <span className="Full-comment-section-desktop-reply-link">
                            REPLY
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="Full-comment-section-desktop-comment-likes">
                      <img
                        src={LikeIcon}
                        alt="Like"
                        className="Full-comment-section-desktop-like-button"
                      />
                      <span>{comment.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="Full-comment-section-desktop-comment-input-and-image">
                <img
                  src={profilePhoto}
                  className="Full-comment-section-desktop-commentPerson-image"
                  alt="Comment Person"
                />
                <input
                  type="text"
                  placeholder="Write a comment to VIJAY PRASAD"
                />
              </div>
              <button
                onClick={() => setShowComment(false)}
                className="Full-comment-section-desktop-cross-button"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SHARE BOX ===================== */}
      {showShare && (
        <div className="Full-share-section-desktop-main-container">
          {/* Left Section */}
          <div className="Full-share-section-desktop-left-section">
            <div className="Full-share-section-desktop-user-profile-header">
              <div className="Full-share-section-desktop-top-image-and-names">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="Full-share-section-desktop-profile-picture"
                />
                <div className="Full-share-section-desktop-user-info">
                  <div className="Full-share-section-desktop-name-and-postTime">
                    <span className="Full-share-section-desktop-user-name">
                      {userData.name}
                    </span>
                    <span className="Full-share-section-desktop-user-details">
                      18h
                    </span>
                  </div>
                  <div className="Full-share-section-desktop-work-and-education">
                    <span className="Full-share-section-desktop-user-details">
                      {userData.education}
                    </span>
                    <span className="Full-share-section-desktop-user-details">
                      ||
                    </span>
                    <span className="Full-share-section-desktop-user-details">
                      {userData.workPlace}
                    </span>
                  </div>
                </div>
              </div>
              <img
                src={Threedot}
                className="Full-share-section-desktop-menu-icon"
                alt="Menu"
              />
            </div>
            <div className="Full-share-section-desktop-photo-container">
              <img
                src={userData.profilePicture}
                alt="Post"
                className="Full-share-section-desktop-post-photo"
              />
              <div className="Full-share-section-desktop-action-buttons">
                <div className="Full-share-section-desktop-connect-div">
                  <img
                    src={Connect}
                    className="Full-share-section-desktop-connect-icon"
                    alt="Connect"
                  />
                </div>
                <div className="Full-share-section-desktop-share-like-share-icon">
                  <img
                    src={ShareIcon}
                    className="Full-share-section-desktop-post-icons"
                    alt="Share"
                  />
                  <img
                    src={CommentIcon}
                    className="Full-share-section-desktop-post-icons"
                    alt="Comment"
                  />
                  <img
                    src={LikeIcon}
                    className="Full-share-section-desktop-post-icons"
                    alt="Like"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="Full-share-section-desktop-right-section">
            <h1 className="Full-share-section-desktop-heading">Share</h1>
            <div className="Full-share-section-desktop-innerDiv">
              <div className="Full-share-section-desktop-AvtaarAndName-collection">
                {persons.map((val, i) => (
                  <div
                    className="Full-share-section-desktop-AvtaarAndName"
                    key={i}
                  >
                    <img src={val.avatar} alt={val.name} />
                    <h1>{val.name}</h1>
                  </div>
                ))}
              </div>
              <div className="Full-share-section-desktop-AllIcons">
                <img src={savedIcon} alt="Saved" />
                <img src={linkIcon} alt="Link" />
                <img src={xIcon} alt="X" />
                <img src={whatsappIcon} alt="WhatsApp" />
                <img src={facebookIcon} alt="Facebook" />
                <img src={instaIcon} alt="Instagram" />
              </div>
            </div>

            <div className="Full-share-section-desktop-share-input-and-image">
              <img
                src={profilePhoto}
                className="Full-share-section-desktop-sharePerson-image"
                alt="Share Person"
              />
              <input type="text" placeholder="Write a share to VIJAY PRASAD" />
            </div>
            <button
              onClick={() => setShowshare(false)}
              className="Full-share-section-desktop-cross-button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopMiddle;
