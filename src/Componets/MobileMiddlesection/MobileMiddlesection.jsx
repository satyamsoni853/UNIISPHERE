import React, { useEffect, useState, useRef } from "react";
import "./MobileMiddlesection.css";
import MobileNavbarr from "../MobileNavbarr/MobileNavbarr";
import MobileFooter from "../Mobilefooter/MobileFooter";
import ConnectMidlleimage from "./middleconnectimage.png";
import MiddlemainImage from "./Middle-image-main.png";
import Profileimage from "./Profile-image.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiShareFatThin } from "react-icons/pi";
import { IoSendOutline } from "react-icons/io5";
import Background from "../Background/Background";
import Smallimage1 from "./small-image1.png";
import Smallimage2 from "./small-image2.png";
import Smallimage3 from "./small-image3.png";
import Smallimage4 from "./small-image4.png";
import Smallimage5 from "./small-image5.png";
import Smallimage6 from "./small-image6.png";
import Smallimage7 from "./small-image7.png";
import Smallimage8 from "./small-image8.png";

// Comment box data
import profilePhoto from "./profilephoto.png";
import Threedot from "./Threedot.svg";
import Connect from "./Connect.png";
import ShareIcon from "./Share.svg";
import LikeIcon from "./Like.svg";
import CommentIcon from "./Comment.svg";

// Share box data
import savedIcon from "./saved.svg";
import whatsappIcon from "./Whatsapp.svg";
import facebookIcon from "./Facebook.svg";
import instaIcon from "./insta.svg";
import linkIcon from "./Link.svg";
import xIcon from "./X.svg";
import { SearchIcon } from "lucide-react";

function MobileMiddlesection() {
  const [showComment, setShowComment] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);
  const optionsRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Static user data
  const userData = {
    profilePicture: profilePhoto,
    name: "VIJAY PRASAD",
    education: " University of Delhi ",
    workPlace: " Works at Google",
  };

  const userComments = [
    {
      id: 1,
      name: "Vijay Singh",
      time: "18h",
      msg: "Its really good.",
      likes: 1245,
    },
    {
      id: 2,
      name: "Vijay Singh",
      time: "18h",
      msg: "Its really good.",
      likes: 1245,
    },
    {
      id: 3,
      name: "Vijay Singh",
      time: "18h",
      msg: "Its really good.",
      likes: 1245,
    },
    {
      id: 4,
      name: "Vijay Singh",
      time: "18h",
      msg: "Its really good.",
      likes: 1245,
    },
  ];

  const persons = [
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
    { name: "Anjali", avatar: profilePhoto },
    { name: "Rohit", avatar: profilePhoto },
  ];

  const [posts, setPosts] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId
      ? { token: storedToken, userId: storedUserId }
      : null;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        if (response.data.userId) {
          setUserId(response.data.userId);
          localStorage.setItem("userId", response.data.userId);
        }

        if (response.data.posts && response.data.posts.length > 0) {
          const updatedPosts = response.data.posts.map((post) => ({
            ...post,
            _id: post.id,
            authorId: post.authorId || "unknown",
            likes: post.likes || 0,
            isLiked: post.isLiked || false,
            comments: post.comments || [],
          }));
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

  const handleLike = async (index) => {
    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to like posts");
      return;
    }

    try {
      const endpoint = post.isLiked
        ? `https://uniisphere-1.onrender.com/posts/${post._id}/unlike`
        : `https://uniisphere-1.onrender.com/posts/${post._id}/like`;

      const response = await axios.post(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${authData.token}` },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((p, i) =>
          i === index
            ? {
                ...p,
                isLiked: !p.isLiked,
                likes:
                  response.data.likes ||
                  (p.isLiked ? p.likes - 1 : p.likes + 1),
              }
            : p
        )
      );
    } catch (error) {
      console.error("Like/Unlike error:", error);
      setError("Failed to update like status");
    }
  };

  const handleCommentSubmit = async (index) => {
    if (!newComment.trim()) return;

    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to comment");
      return;
    }

    try {
      const response = await axios.post(
        `https://uniisphere-1.onrender.com/posts/${post._id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${authData.token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((p, i) =>
          i === index
            ? {
                ...p,
                comments: response.data.comments || [
                  ...p.comments,
                  { text: newComment, author: "You" },
                ],
              }
            : p
        )
      );
      setNewComment("");
    } catch (error) {
      console.error("Comment error:", error);
      setError("Failed to post comment");
    }
  };

  const fetchComments = async (postId) => {
    const authData = getAuthData();
    if (!authData) return [];

    try {
      const response = await axios.get(
        `https://uniisphere-1.onrender.com/posts/${postId}/comments`,
        { headers: { Authorization: `Bearer ${authData.token}` } }
      );
      return response.data.comments;
    } catch (error) {
      console.error("Fetch comments error:", error);
      return [];
    }
  };

  const handleCommentClick = async (index) => {
    setActiveCommentPostIndex(index);
    setShowComment(true);
    setNewComment("");

    const post = posts[index];
    const comments = await fetchComments(post._id);
    setPosts((prevPosts) =>
      prevPosts.map((p, i) =>
        i === index ? { ...p, comments: comments || p.comments } : p
      )
    );
  };

  const handleCloseCommentModal = () => {
    setActiveCommentPostIndex(null);
    setShowComment(false);
  };

  const handleProfileClick = (userId) => {
    if (userId) {
      navigate(`/FullFlowerSectionPage/${userId}`);
    } else {
      console.log("Error: userId is missing!");
    }
  };

  return (
    <div className="middle-middle-card">
      {error && <div className="error-message">{error}</div>}

      {imageLoading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="post-container">
            {/* Profile Header */}
            <div className="middle-profile-header">
              <div
                onClick={() => handleProfileClick(post.authorId || userId)}
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
              <div className="middle-options-container" ref={optionsRef}>
                <BsThreeDotsVertical
                  className="middle-options-icon"
                  onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                  <div className="middle-options-dropdown">
                    <button className="middle-options-item">
                      <span>Interest</span> <hr />{" "}
                    </button>
                    <button className="middle-options-item">
                      <span>Not Interest</span> <hr />
                    </button>
                    <button className="middle-options-item">
                      <span>Block</span>
                      <hr />
                    </button>
                    <button className="middle-options-item">
                      <span>Report</span>
                      <hr />
                    </button>
                    <button className="middle-options-item">
                      <span>Message</span>
                      <hr />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Image */}
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

            {/* Action Bar */}
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
                  onClick={() => handleCommentClick(index)}
                >
                  <span className="middle-icon-count">
                    {post.comments.length}
                  </span>
                  <img src={CommentIcon} alt="Comment" />
                </div>
                <div
                  onClick={() => setShowShare(true)}
                  className="middle-icon-container"
                >
                  <img src={ShareIcon} className="middle-icon" alt="Share" />
                </div>
              </div>
            </div>

            {/* Post Text */}
            <div className="middle-post-text">
              <span className="middle-post-author">
                {post.authorName || "Unknown Author"}
              </span>{" "}
              {post.caption || post.content || "No caption available"}
              <span className="middle-see-more">...more</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}

      {/* Comment Modal */}
      {showComment && activeCommentPostIndex !== null && (
        <div className="mobile-Full-comment-section-main-container">
          <div className="mobile-Full-comment-section-right-section">
            <div className="mobile-Full-comment-section-comments-header">
              <h1 className="mobile-Full-comment-section-heading">Comments</h1>
            </div>
            <div className="mobile-Full-comment-section-comments-list">
              {userComments.map((comment, index) => (
                <div
                
                  className="mobile-Full-comment-section-comment-main-parent"
                  key={index}
                >
                  <div className="mobile-Full-comment-section-comment">
                    <img
                      src={comment.profilePicture || profilePhoto}
                      alt="Profile"
                      className="mobile-Full-comment-section-comment-profile-picture"
                    />
                    <div className="mobile-Full-comment-section-comment-content">
                      <div className="mobile-Full-comment-section-comment-user-info">
                        <span className="mobile-Full-comment-section-comment-username">
                          {comment.author || comment.username || "Anonymous"}
                        </span>
                        <span className="mobile-Full-comment-section-comment-timestamp">
                          {comment.timestamp || "Just now"}
                        </span>
                      </div>
                      <div className="mobile-Full-comment-section-comment-text">
                        {comment.text}
                      </div>
                      <div className="mobile-Full-comment-section-comment-actions">
                        <span className="mobile-Full-comment-section-reply-link">
                          REPLY
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-Full-comment-section-comment-likes">
                    <img
                      src={LikeIcon}
                      alt="Like"
                      className="mobile-Full-comment-section-like-button"
                    />
                    <span>{comment.likes || 0}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mobile-Full-comment-section-comment-input-and-image">
              <img
                src={profilePhoto}
                className="mobile-Full-comment-section-commentPerson-image"
                alt="Comment Person"
              />
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <IoSendOutline
                className="comment-send-icon"
                onClick={() => handleCommentSubmit(activeCommentPostIndex)}
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  fontSize: "20px",
                }}
              />
            </div>
            <button
              onClick={handleCloseCommentModal}
              className="mobile-Full-comment-section-cross-button"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="mobile-Full-share-section-main-container">
          <div className="mobile-Full-share-section-heading-and-cross">
            <h1 className="mobile-Full-share-section-heading">Share</h1>
            <button
              onClick={() => setShowShare(false)}
              className="mobile-Full-share-section-cross-button"
            >
              ×
            </button>
          </div>
          <div className="mobile-Full-share-section-right-section">
            <div className="mobile-Full-share-section-innerDiv">
              <div className="mobile-Full-share-section-AvtaarAndName-collection">
                {persons.map((val, i) => (
                  <div
                    className="mobile-Full-share-section-AvtaarAndName"
                    key={i}
                  >
                    <img src={val.avatar} alt={val.name} />
                    <h1>{val.name}</h1>
                  </div>
                ))}
              </div>
              <div className="mobile-Full-share-section-AllIcons">
                <img src={linkIcon} alt="Link" />
                <img src={xIcon} alt="X" />
                <img src={whatsappIcon} alt="WhatsApp" />
                <img src={facebookIcon} alt="Facebook" />
                <img src={instaIcon} alt="Instagram" />
              </div>
            </div>

            <div className="mobile-Full-share-section-share-input-and-image">
              <div className="mobile-Full-share-comment-box-and-image-and-searchIcon">
                <input
                  type="text"
                  placeholder="Write a share to VIJAY PRASAD"
                />
                <SearchIcon className="mobile-Full-share-search-icon" />
              </div>

              <img src={savedIcon} alt="Saved" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMiddlesection;
