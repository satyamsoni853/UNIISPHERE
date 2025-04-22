import React, { useEffect, useState, useRef } from "react";
import "./MobileMiddleSection.css"; // Corrected CSS file name
import MobileNavbar from "../MobileNavbar/MobileNavbar"; // Corrected component name
import MobileFooter from "../Mobilefooter/MobileFooter";
import ConnectMiddleImage from "./middleconnectimage.png"; // Corrected image name
import MiddlemainImage from "./Middle-image-main.png";
import Profileimage from "./Profile-image.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import Background from "../Background/Background";
// import SmallImage1 from '../Background/SmallImage1.png';
// import SmallImage2 from '../Background/SmallImage2.png';
// import SmallImage3 from '../Background/SmallImage3.png';
// import SmallImage4 from '../Background/SmallImage4.png';
// import SmallImage5 from '../Background/SmallImage5.png';
// import SmallImage6 from '../Background/SmallImage6.png';
// import SmallImage7 from '../Background/SmallImage7.png';
// import SmallImage8 from '../Background/SmallImage8.png';

// Comment box data
import profilePhoto from "./profilephoto.png";
import Connect from "./Connect.png";
import ShareIcon from "./Share.svg";
import LikeIcon from "./Like.svg";
import CommentIcon from "./Comment.svg";

// Share box data
import savedIcon from "./saved.svg";
import whatsappIcon from "./Whatsapp.svg";
import facebookIcon from "./Facebook.svg";
import InstagramIcon from "./insta.svg"; // Corrected to consistent naming
import linkIcon from "./Link.svg";
import xIcon from "./X.svg";
import { SearchIcon } from "lucide-react";

function MobileMiddleSection() { // Corrected component name
  const [showComment, setShowComment] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const optionsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Static user data
  const userData = {
    profilePicture: profilePhoto,
    name: "VIJAY PRASAD",
    education: "University of Delhi",
    workPlace: "Works at Google",
  };

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

  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId
      ? { token: storedToken, userId: storedUserId }
      : null;
  };

  // Fetch Feed API
  const fetchFeed = async () => {
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
          timeout: 10000,
        }
      );
      console.log("Feed API response:", response.data);

      if (response.data.userId) {
        setUserId(response.data.userId);
        localStorage.setItem("userId", response.data.userId);
      }

      if (response.data.posts && response.data.posts.length > 0) {
        const updatedPosts = response.data.posts.map((post) => ({
          ...post,
          _id: post._id || post.id,
          authorId: post.authorId || "unknown",
          authorName: post.authorName || "Unknown Author",
          authorDetails: post.authorDetails || "University of Delhi | Works at Google",
          likes: post.Likes ? post.Likes.length : 0,
          isLiked: post.Likes
            ? post.Likes.some((like) => like.userId === authData.userId)
            : false,
          comments: post.Comments || [],
          mediaUrl: post.mediaUrl || MiddlemainImage,
          caption: post.caption || post.content || "No caption available",
        }));
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Fetch feed error:", error.response?.data || error);
      setError(
        error.response?.data?.message ||
          "Failed to load content. Please try again."
      );
    } finally {
      setImageLoading(false);
    }
  };

  // Fetch Comments API
  const fetchComments = async (postId) => {
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to view comments");
      return [];
    }

    setCommentsLoading(true);
    try {
      const response = await axios.get(
        `https://uniisphere-1.onrender.com/posts/${postId}/comments`,
        {
          headers: { Authorization: `Bearer ${authData.token}` },
          timeout: 10000,
        }
      );
      console.log("Fetch Comments API response:", response.data);
      return response.data.comments || [];
    } catch (error) {
      console.error("Fetch comments error:", error.response?.data || error);
      setError(
        error.response?.data?.message || "Failed to fetch comments. Please try again."
      );
      return [];
    } finally {
      setCommentsLoading(false);
    }
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

    fetchFeed();
  }, [location.state]);

  const handleLike = async (index) => {
    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to like posts");
      return;
    }

    const previousPosts = [...posts];
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    };

    setPosts((prevPosts) =>
      prevPosts.map((p, i) => (i === index ? updatedPost : p))
    );

    try {
      const endpoint = post.isLiked
        ? `https://uniisphere-1.onrender.com/posts/${post._id}/unlike`
        : `https://uniisphere-1.onrender.com/posts/${post._id}/like`;

      const response = await axios({
        method: "post",
        url: endpoint,
        headers: {
          Authorization: `Bearer ${authData.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Like/Unlike response:", response.data);
    } catch (error) {
      console.error("Like/Unlike error:", error.response?.data || error.message);
      setPosts(previousPosts);
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
        {
          postId: post._id,
          userId: authData.userId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      console.log("Comment API response:", response.data);

      await fetchFeed();

      setNewComment("");
      setError(null);
    } catch (error) {
      console.error("Comment submission error:", error.response?.data || error);
      setError(
        error.response?.data?.message ||
          "Failed to post comment. Please try again."
      );
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
    setError(null);
  };

  const handleProfileClick = (userId) => {
    if (userId) {
      navigate(`/FullFlowerSectionPage/${userId}`);
    } else {
      console.log("Error: userId is missing!");
    }
  };

  return (
    <div className="mobile-middle-middle-card">
      {error && <div className="mobile-error-message">{error}</div>}

      {imageLoading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={post._id || index} className="mobile-post-container">
            {/* Profile Header */}
            <div className="mobile-middle-profile-header">
              <div className="mobile-image-and-name-holder">
                <div
                  onClick={() => handleProfileClick(post.authorId || userId)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={Profileimage}
                    alt="Profile"
                    className="mobile-middle-profile-pic"
                  />
                </div>
                <div className="mobile-middle-profile-info">
                  <div className="mobile-middle-profile-top">
                    <span className="mobile-middle-profile-name">
                      {post.authorName}
                    </span>
                    <span className="mobile-middle-post-time">18h</span>
                  </div>
                  <p className="mobile-middle-profile-details">
                    {post.authorDetails}
                  </p>
                </div>
              </div>
              <div className="mobile-middle-options-container" ref={optionsRef}>
                <BsThreeDotsVertical
                  className="mobile-middle-options-icon"
                  onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                  <div className="mobile-middle-options-dropdown">
                    <button className="mobile-middle-options-item">
                      <span>Interest</span> <hr />
                    </button>
                    <button className="mobile-middle-options-item">
                      <span>Not Interested</span> <hr />
                    </button>
                    <button className="mobile-middle-options-item">
                      <span>Block</span>
                      <hr />
                    </button>
                    <button className="mobile-middle-options-item">
                      <span>Report</span>
                      <hr />
                    </button>
                    <button className="mobile-middle-options-item">
                      <span>Message</span>
                      <hr />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Image */}
            <div className="mobile-middle-main-image">
              <img
                src={post.mediaUrl}
                alt={`Post ${index + 1}`}
                className="mobile-middle-content-image"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
              />
            </div>

            {/* Action Bar */}
            <div className="mobile-middle-action-bar">
              <img
                src={ConnectMiddleImage} // Corrected variable name
                alt="Connect"
                className="mobile-middle-connect-image"
              />
              <div className="mobile-middle-action-icons">
                <div
                  className="mobile-middle-icon-container"
                  onClick={() => handleLike(index)}
                >
                  <span className="mobile-middle-icon-count">{post.likes}</span>
                  <img
                    src={LikeIcon}
                    className={`mobile-middle-icon ${
                      post.isLiked ? "liked" : ""
                    }`}
                    alt="Like"
                  />
                </div>
                <div
                  className="mobile-middle-icon-container"
                  onClick={() => handleCommentClick(index)}
                >
                  <span className="mobile-middle-icon-count">
                    {post.comments.length}
                  </span>
                  <img src={CommentIcon} alt="Comment" className="mobile-middle-icon" />
                </div>
                <div
                  onClick={() => setShowShare(true)}
                  className="mobile-middle-icon-container"
                >
                  <img
                    src={ShareIcon}
                    className="mobile-middle-icon mobile-middle-icon-share"
                    alt="Share"
                  />
                </div>
              </div>
            </div>

            {/* Post Text */}
            <div className="mobile-middle-post-text">
              <span className="mobile-middle-post-author">
                {post.authorName}
              </span>{" "}
              {post.caption}
              <span className="mobile-middle-see-more">...more</span>
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
              {posts[activeCommentPostIndex]?.comments?.map((comment, index) => (
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
                        <span className="mobile-Fulli-comment-section-comment-username">
                          {comment.author || comment.username || "Anonymous"}
                        </span>
                        <span className="mobile-Full-comment-section-comment-timestamp">
                          {comment.timestamp || "Just now"}
                        </span>
                      </div>
                      <div className="mobile-Full-comment-section-comment-text">
                        {comment.content || comment.text}
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
              )) || <p>No comments available</p>}
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
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  handleCommentSubmit(activeCommentPostIndex)
                }
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
              <div className="mobile-Full-share-section-AvatarAndName-collection"> {/* Corrected class name */}
                {persons.map((val, i) => (
                  <div
                    className="mobile-Full-share-section-AvatarAndName" // Corrected class name
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
                <img src={InstagramIcon} alt="Instagram" /> // Corrected variable name
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

export default MobileMiddleSection; // Corrected component name