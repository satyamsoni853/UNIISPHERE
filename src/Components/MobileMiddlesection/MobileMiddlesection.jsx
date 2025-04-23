
import React, { useEffect, useState, useRef } from "react";
import "../MobileMiddlesection/MobileMiddlesection.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import MobileFooter from "../Mobilefooter/MobileFooter";
import ConnectMiddleImage from "./middleconnectimage.png";
import MiddlemainImage from "./Middle-image-main.png";
import Profileimage from "./Profile-image.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import Background from "../Background/Background";
import profilePhoto from "./profilephoto.png";
import ShareIcon from "./Share.svg";
import LikeIcon from "./Like.svg";
import CommentIcon from "./Comment.svg";
import savedIcon from "./saved.svg";
import whatsappIcon from "./Whatsapp.svg";
import facebookIcon from "./Facebook.svg";
import InstagramIcon from "./insta.svg";
import linkIcon from "./Link.svg";
import xIcon from "./X.svg";
import { SearchIcon } from "lucide-react";

function MobileMiddleSection() {
  const [showComment, setShowComment] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [activeOptionsPostId, setActiveOptionsPostId] = useState(null);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [connections, setConnections] = useState([]);
  const [connectionStatuses, setConnectionStatuses] = useState({});
  const optionsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  const fetchConnections = async (token) => {
    try {
      const response = await axios.get(
        "https://uniisphere-1.onrender.com/api/connections",
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );
      console.log("Connections API Response:", response.data);
      if (response.data && Array.isArray(response.data)) {
        setConnections(response.data);
      } else {
        setConnections([]);
        console.log("No connections found.");
      }
    } catch (err) {
      console.error("Error fetching connections:", err.response?.data || err.message);
      setConnections([]);
      setError("Failed to fetch connections. Please try again.");
    }
  };

  const fetchSentConnectionRequests = async (token) => {
    try {
      const response = await axios.get(
        "https://uniisphere-1.onrender.com/api/connections/sent",
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );
      console.log("Sent Connection Requests API Response:", response.data);
      const statuses = {};
      response.data.forEach((request) => {
        if (request.status === "requested") {
          statuses[request.receiverId] = "requested";
        }
      });
      return statuses;
    } catch (err) {
      console.error("Error fetching sent connection requests:", err.response?.data || err.message);
      return {};
    }
  };

  const fetchFeed = async () => {
    const authData = getAuthData();
    if (!authData) {
      setError("You are not logged in. Please log in to view content.");
      setImageLoading(false);
      return;
    }

    setImageLoading(true);
    try {
      const [feedResponse, sentRequests] = await Promise.all([
        axios.get("https://uniisphere-1.onrender.com/api/feed", {
          headers: { Authorization: `Bearer ${authData.token}` },
          timeout: 10000,
        }),
        fetchSentConnectionRequests(authData.token),
      ]);

      setConnectionStatuses(sentRequests);

      if (feedResponse.data.userId) {
        setUserId(feedResponse.data.userId);
        localStorage.setItem("userId", feedResponse.data.userId);
        await fetchConnections(authData.token);
      }

      if (feedResponse.data.posts && feedResponse.data.posts.length > 0) {
        const updatedPosts = feedResponse.data.posts.map((post) => ({
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
      } else {
        console.log("No posts found in the feed.");
      }
    } catch (error) {
      console.error("Fetch feed error:", error.response?.data || error);
      setError(
        error.response?.data?.message || "Failed to load content. Please try again."
      );
    } finally {
      setImageLoading(false);
    }
  };

  const sendConnectionRequest = async (receiverId) => {
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to send connection requests.");
      return;
    }

    try {
      const response = await axios.post(
        `https://uniisphere-1.onrender.com/api/connect/${receiverId}`,
        {
          userId: authData.userId,
          senderName: userData.name || "Anonymous",
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      console.log("Connection request response:", response.data);
      setConnectionStatuses((prev) => ({
        ...prev,
        [receiverId]: "requested",
      }));
      setError(null);
    } catch (error) {
      console.error("Connection request error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Failed to send connection request."
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setActiveOptionsPostId(null);
        console.log("Closed options menu by clicking outside.");
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
      console.log("User token stored.");
    }
    if (location.state?.userId) {
      localStorage.setItem("userId", location.state.userId);
      setUserId(location.state.userId);
      console.log("User ID stored:", location.state.userId);
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

    console.log(`Attempting to ${post.isLiked ? "unlike" : "like"} post ID: ${post._id}`);

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
    if (!newComment.trim()) {
      console.log("Cannot submit an empty comment.");
      return;
    }

    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to comment");
      return;
    }

    console.log(`Submitting comment on post ID: ${post._id}`);

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
    console.log(`Opening comments for post index: ${index}`);
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

  const handleCloseCommentModal = () => {
    console.log("Closing comment modal.");
    setActiveCommentPostIndex(null);
    setShowComment(false);
    setError(null);
  };

  const handleProfileClick = (userId) => {
    if (userId) {
      console.log(`Navigating to profile: ${userId}`);
      navigate(`/FullFlowerSectionPage/${userId}`);
    } else {
      console.log("Error: Profile user ID is missing!");
    }
  };

  const handleOptionClick = (option, postId) => {
    console.log(`Selected option: ${option} for post ID: ${postId}`);
    setActiveOptionsPostId(null);
  };

  const handleSharePersonClick = (name) => {
    console.log(`Sharing with person: ${name}`);
  };

  const handleSharePlatformClick = (platform) => {
    console.log(`Sharing to platform: ${platform}`);
  };

  return (
    <div className="mobile-middle-middle-card">
      {error && <div className="mobile-error-message">{error}</div>}

      {imageLoading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        posts.map((post, index) => {
          const authData = getAuthData();
          const isSelf = authData && post.authorId === authData.userId;
          const isConnected = connections.some((conn) => conn.id === post.authorId);
          const isRequestSent = connectionStatuses[post.authorId] === "requested";

          return (
            <div key={post._id || index} className="mobile-post-container">
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
                  <div className="mobile-middle-connect-container">
                    {isSelf ? (
                      <div className="mobile-connection-status-message">
                        You cannot send a connection request to yourself.
                      </div>
                    ) : isConnected ? (
                      <div className="mobile-connection-status-message">
                        Connection already exists.
                      </div>
                    ) : isRequestSent ? (
                      <div className="mobile-connection-status-message">
                        Request Sent!
                      </div>
                    ) : (
                      <img
                        src={ConnectMiddleImage}
                        alt="Connect"
                        className="mobile-middle-connect-image"
                        onClick={() => sendConnectionRequest(post.authorId)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
                <div className="mobile-middle-options-container" ref={optionsRef}>
                  <BsThreeDotsVertical
                    className="mobile-middle-options-icon"
                    onClick={() => {
                      console.log(`Toggling options for post ID: ${post._id}`);
                      setActiveOptionsPostId(
                        activeOptionsPostId === post._id ? null : post._id
                      );
                    }}
                  />
                  {activeOptionsPostId === post._id && (
                    <div className="mobile-middle-options-dropdown">
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Interest", post._id)}
                      >
                        <span>Interest</span> <hr />
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Not Interested", post._id)}
                      >
                        <span>Not Interested</span> <hr />
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Block", post._id)}
                      >
                        <span>Block</span> <hr />
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Report", post._id)}
                      >
                        <span>Report</span> <hr />
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Message", post._id)}
                      >
                        <span>Message</span> <hr />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile-middle-main-image">
                <img
                  src={post.mediaUrl}
                  alt={`Post ${index + 1}`}
                  className="mobile-middle-content-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                    console.log(`Failed to load image for post ID: ${post._id}`);
                  }}
                />
              </div>

              <div className="mobile-middle-action-bar">
                <div className="mobile-middle-action-icons">
                  <div
                    className="mobile-middle-icon-container"
                    onClick={() => handleLike(index)}
                  >
                    <span className="mobile-middle-icon-count">{post.likes}</span>
                    <img
                      src={LikeIcon}
                      className={`mobile-middle-icon ${post.isLiked ? "liked" : ""}`}
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
                    <img
                      src={CommentIcon}
                      alt="Comment"
                      className="mobile-middle-icon"
                    />
                  </div>
                  <div
                    onClick={() => {
                      console.log("Opening share modal.");
                      setShowShare(true);
                    }}
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

              <div className="mobile-middle-post-text">
                <span className="mobile-middle-post-author">
                  {post.authorName}
                </span>{" "}
                {post.caption}
                <span
                  className="mobile-middle-see-more"
                  onClick={() => console.log(`Clicked 'See more' for post ID: ${post._id}`)}
                >
                  ...more
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <p>No posts available</p>
      )}

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
                        <span
                          className="mobile-Full-comment-section-reply-link"
                          onClick={() => console.log(`Replying to comment: ${comment.content}`)}
                        >
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
                      onClick={() => console.log(`Liking comment: ${comment.content}`)}
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

      {showShare && (
        <div className="mobile-Full-share-section-main-container">
          <div className="mobile-Full-share-section-heading-and-cross">
            <h1 className="mobile-Full-share-section-heading">Share</h1>
            <button
              onClick={() => {
                console.log("Closing share modal.");
                setShowShare(false);
              }}
              className="mobile-Full-share-section-cross-button"
            >
              ×
            </button>
          </div>
          <div className="mobile-Full-share-section-right-section">
            <div className="mobile-Full-share-section-innerDiv">
              <div className="mobile-Full-share-section-AvatarAndName-collection">
                {persons.map((val, i) => (
                  <div
                    className="mobile-Full-share-section-AvatarAndName"
                    key={i}
                    onClick={() => handleSharePersonClick(val.name)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={val.avatar} alt={val.name} />
                    <h1>{val.name}</h1>
                  </div>
                ))}
              </div>
              <div className="mobile-Full-share-section-AllIcons">
                <img
                  src={linkIcon}
                  alt="Link"
                  onClick={() => handleSharePlatformClick("Link")}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={xIcon}
                  alt="X"
                  onClick={() => handleSharePlatformClick("X")}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  onClick={() => handleSharePlatformClick("WhatsApp")}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  onClick={() => handleSharePlatformClick("Facebook")}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  onClick={() => handleSharePlatformClick("Instagram")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="mobile-Full-share-section-share-input-and-image">
              <div className="mobile-Full-share-comment-box-and-image-and-searchIcon">
                <input
                  type="text"
                  placeholder="Write a share to VIJAY PRASAD"
                  onChange={(e) => console.log(`Typing in share input: ${e.target.value}`)}
                />
                <SearchIcon
                  className="mobile-Full-share-search-icon"
                  onClick={() => console.log("Clicked search icon in share modal.")}
                />
              </div>
              <img
                src={savedIcon}
                alt="Saved"
                onClick={() => console.log("Clicked saved icon in share modal.")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMiddleSection;
