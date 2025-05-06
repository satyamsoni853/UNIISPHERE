import axios from "axios"; // Ensure axios is installed: `npm install axios`
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import "./DesktopMiddle.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import MobileFooter from "../Mobilefooter/MobileFooter";
import Commenticonsvg from "./Commenticon.svg";
import LikeIcon from "./Like.svg";
import ConnectMidlleimage from "./middleconnectimage.png";
import Profileimage from "./Profile-image.png";
import ShareIcon from "./Share.svg";
import Threedot from "./Threedot.svg";
import facebookIcon from "./Facebook.svg";
import instaIcon from "./insta.svg";
import linkIcon from "./Link.svg";
import savedIcon from "./saved.svg";
import whatsappIcon from "./Whatsapp.svg";
import xIcon from "./X.svg";

function DesktopMiddle() {
  const [showComment, setShowComment] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [showShare, setShowshare] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // Added for image modal
  const [selectedImage, setSelectedImage] = useState(null); // Added for image modal
  const [shareMessage, setShareMessage] = useState("");
  const [activeSharePostIndex, setActiveSharePostIndex] = useState(null);
  const [connections, setConnections] = useState([]);
  const [shareError, setShareError] = useState(null);
  const [activeOptionsPostIndex, setActiveOptionsPostIndex] = useState(null);
  const [connectionStatuses, setConnectionStatuses] = useState({});
  const [seeMore, setSeeMore] = useState({});
  const optionsRef = useRef(null);
  const commentModalRef = useRef(null);
  const shareModalRef = useRef(null);
  const imageModalRef = useRef(null); // Added for image modal

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setActiveOptionsPostIndex(null);
      }
      if (
        showComment &&
        commentModalRef.current &&
        !commentModalRef.current.contains(event.target)
      ) {
        handleCloseCommentModal();
      }
      if (
        showShare &&
        shareModalRef.current &&
        !shareModalRef.current.contains(event.target)
      ) {
        handleCloseShareModal();
      }
      if (
        showImageModal &&
        imageModalRef.current &&
        !imageModalRef.current.contains(event.target)
      ) {
        setShowImageModal(false);
        setSelectedImage(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showComment, showShare, showImageModal]);

  const [posts, setPosts] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const getAuthData = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    return token && userId ? { token, userId } : null;
  };

  const fetchUserProfile = async (userId, token) => {
    try {
      const response = await axios.get(
        `https://uniisphere-1.onrender.com/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        }
      );
      setUserProfile({
        profilePicture: response.data.profilePictureUrl || Profileimage,
        name: response.data.username || "Anonymous",
        education: response.data.education || "Not specified",
        workPlace: response.data.workPlace || "Not specified",
      });
    } catch (error) {
      console.error("Fetch user profile error:", error.response?.data || error);
      setUserProfile({
        profilePicture: Profileimage,
        name: "Anonymous",
        education: "Not specified",
        workPlace: "Not specified",
      });
    }
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
        console.log("All Connections:");
        response.data.forEach((conn, index) => {
          console.log(
            `Connection ${index + 1}: ID = ${conn.id}, Name = ${
              conn.username || "Unknown"
            }`
          );
        });
        setConnections(response.data);
      } else {
        console.log("No connections found or invalid response format.");
        setConnections([]);
      }
    } catch (err) {
      console.error(
        "Error fetching connections:",
        err.response ? err.response.data : err.message
      );
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
      console.error(
        "Error fetching sent connection requests:",
        err.response ? err.response.data : err.message
      );
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
        await fetchUserProfile(feedResponse.data.userId, authData.token);
        await fetchConnections(authData.token);
      }

      if (feedResponse.data.posts && feedResponse.data.posts.length > 0) {
        const updatedPosts = feedResponse.data.posts.map((post) => ({
          _id: post.id,
          authorId: post.user?.id,
          profilePhoto: post.user?.profilePictureUrl || Profileimage,
          authorName: post.user?.username || "Unknown Author",
          authorDetails: post.user?.headline || "No headline available",
          mediaUrl: post.mediaUrl || [],
          caption: post.content,
          createdAt: post.createdAt,
          likes: post.totalLikes || 0,
          isLiked:
            post.Likes?.some((like) => like.userId === authData.userId) ||
            false,
          comments: post.Comments || [],
          totalComments: post.totalComments || 0,
          totalShares: post.totalShares || 0,
          location: post.location || "",
          postType: post.postType || "text",
          tags: post.tags || [],
          updatedAt: post.updatedAt,
          visibility: post.user?.visibility || "public",
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
          senderName: userProfile?.name || "Anonymous",
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
      console.error(
        "Connection request error:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Failed to send connection request."
      );
    }
  };

  const handleLike = async (index) => {
    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to like posts.");
      return;
    }

    const originalPost = { ...post };

    try {
      const endpoint = post.isLiked
        ? `https://uniisphere-1.onrender.com/posts/${post._id}/unlike`
        : `https://uniisphere-1.onrender.com/posts/${post._id}/like`;

      setPosts((prevPosts) =>
        prevPosts.map((p, i) =>
          i === index
            ? {
                ...p,
                isLiked: !p.isLiked,
                likes: p.isLiked ? p.likes - 1 : p.likes + 1,
              }
            : p
        )
      );

      const response = await axios.post(
        endpoint,
        { userId: authData.userId },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      const isSuccessful = post.isLiked
        ? response.data.message === "Post unliked successfully"
        : !!response.data;

      if (!isSuccessful) {
        setPosts((prevPosts) =>
          prevPosts.map((p, i) => (i === index ? originalPost : p))
        );
        throw new Error("Operation failed");
      }
    } catch (error) {
      console.error(
        "Like/Unlike error:",
        error.response?.data || error.message
      );

      setPosts((prevPosts) =>
        prevPosts.map((p, i) => (i === index ? originalPost : p))
      );

      setError("Failed to update like status. Please try again.");
    }
  };

  const handleCommentSubmit = async (index) => {
    if (!newComment.trim()) return;

    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to comment.");
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
    setCommentsLoading(false);
  };

  const handleCloseCommentModal = () => {
    setActiveCommentPostIndex(null);
    setShowComment(false);
    setError(null);
  };

  const handleShareClick = (index) => {
    setActiveSharePostIndex(index);
    setShowshare(true);
    setShareMessage("");
    setShareError(null);
  };

  const handleCloseShareModal = () => {
    setActiveSharePostIndex(null);
    setShowshare(false);
    setShareMessage("");
    setShareError(null);
  };

  const handleShareSubmit = async () => {
    if (!shareMessage.trim()) {
      setShareError("Please enter a share message.");
      return;
    }

    const post = posts[activeSharePostIndex];
    const authData = getAuthData();
    if (!authData) {
      setShareError("Please log in to share posts.");
      return;
    }

    try {
      const response = await axios.post(
        `https://uniisphere-1.onrender.com/posts/${post._id}/share`,
        {
          postId: post._id,
          userId: authData.userId,
          message: shareMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      console.log("Share API response:", response.data);

      await fetchFeed();
      setShareMessage("");
      setShareError(null);
      setShowshare(false);
    } catch (error) {
      console.error("Share submission error:", error.response?.data || error);
      setShareError(
        error.response?.data?.message ||
          "Failed to share post. Please try again."
      );
    }
  };

  const handleCopyLink = () => {
    const post = posts[activeSharePostIndex];
    const postUrl = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        setShareError("Failed to copy link.");
      });
  };

  const handleShareToWhatsApp = () => {
    const post = posts[activeSharePostIndex];
    const postUrl = `${window.location.origin}/post/${post._id}`;
    const message = encodeURIComponent(`${shareMessage} ${postUrl}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleShareToFacebook = () => {
    const post = posts[activeSharePostIndex];
    const postUrl = `${window.location.origin}/post/${post._id}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      "_blank"
    );
  };

  const handleShareToX = () => {
    const post = posts[activeSharePostIndex];
    const postUrl = `${window.location.origin}/post/${post._id}`;
    const message = encodeURIComponent(`${shareMessage} ${postUrl}`);
    window.open (`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleShareToInstagram = () => {
    setShareError(
      "Instagram sharing is not supported directly. Please copy the link and share manually."
    );
  };

  const handleSavePost = async () => {
    const post = posts[activeSharePostIndex];
    const authData = getAuthData();
    if (!authData) {
      setShareError("Please log in to save posts.");
      return;
    }

    try {
      const response = await axios.post(
        `https://uniisphere-1.onrender.com/posts/${post._id}/save`,
        { userId: authData.userId },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      console.log("Save post response:", response.data);
      alert("Post saved successfully!");
    } catch (error) {
      console.error("Save post error:", error.response?.data || error);
      setShareError(
        error.response?.data?.message ||
          "Failed to save post. Please try again."
      );
    }
  };

  const handleProfileClick = (userId) => {
    if (userId) {
      navigate(`/FullFlowerSectionPage/${userId}`);
    } else {
      console.error("Error: userId is missing!");
    }
  };

  const handleOptionsClick = (index, isSelf) => {
    if (isSelf) {
      setActiveOptionsPostIndex(
        activeOptionsPostIndex === index ? null : index
      );
    }
  };

  const toggleSeeMore = (index) => {
    setSeeMore((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderCaption = (caption, index) => {
    const maxLength = 100;
    if (!caption || caption.length <= maxLength || seeMore[index]) {
      return caption || "No caption available";
    }
    return `${caption.substring(0, maxLength)}...`;
  };

  return (
    <div className="middle-container">
      <div className="middle-middle-card">
        {error && <div className="error-message">{error}</div>}

        {imageLoading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => {
            const authData = getAuthData();
            const isSelf = authData && post.authorId === authData.userId;
            const isConnected = connections.some(
              (conn) => conn.id === post.authorId
            );
            const isRequestSent =
              connectionStatuses[post.authorId] === "requested";

            return (
              <div key={post._id || index} className="post-container">
                <div className="middle-profile-header">
                  <div
                    onClick={() => handleProfileClick(post.authorId || userId)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={post.profilePhoto}
                      alt="Profile"
                      className="middle-profile-pic"
                      onError={(e) => {
                        e.target.src = Profileimage;
                      }}
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
                      {post.authorDetails || "No details available"}
                    </p>
                  </div>
                  <div className="middle-options-container" ref={optionsRef}>
                    <BsThreeDotsVertical
                      className="middle-options-icon-Threedot"
                      onClick={() => handleOptionsClick(index, isSelf)}
                    />
                    {activeOptionsPostIndex === index && isSelf && (
                      <div className="middle-options-dropdown">
                        <button className="middle-options-item">
                          Interest
                        </button>
                        <button className="middle-options-item">
                          Not Interest
                        </button>
                        <button className="middle-options-item">Block</button>
                        <button className="middle-options-item">Report</button>
                        <button className="middle-options-item">Message</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="middle-main-image">
                  {post.mediaUrl && post.mediaUrl.length > 0 ? (
                    Array.isArray(post.mediaUrl) ? (
                      post.mediaUrl.map((url, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={url}
                          alt={`Post ${index + 1} - Image ${imgIndex + 1}`}
                          className="middle-content-image"
                          onClick={() => {
                            setSelectedImage(url);
                            setShowImageModal(true);
                          }} // Single click to open image modal
                          onDoubleClick={() => handleLike(index)} // Double click to like/unlike
                          style={{ cursor: "pointer" }}
                          onError={(e) => {
                            console.error(`Failed to load image: ${url}`);
                            e.target.src = Profileimage;
                          }}
                        />
                      ))
                    ) : (
                      <img
                        src={post.mediaUrl}
                        alt={`Post ${index + 1}`}
                        className="middle-content-image"
                        onClick={() => {
                          setSelectedImage(post.mediaUrl);
                          setShowImageModal(true);
                        }} // Single click to open image modal
                        onDoubleClick={() => handleLike(index)} // Double click to like/unlike
                        style={{ cursor: "pointer" }}
                        onError={(e) => {
                          console.error(
                            `Failed to load image: ${post.mediaUrl}`
                          );
                          e.target.src = Profileimage;
                        }}
                      />
                    )
                  ) : (
                    <img
                      src={Profileimage}
                      alt="Default Post"
                      className="middle-content-image"
                      onClick={() => {
                        setSelectedImage(Profileimage);
                        setShowImageModal(true);
                      }} // Single click to open image modal
                      onDoubleClick={() => handleLike(index)} // Double click to like/unlike
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>

                <div className="middle-action-bar">
                  {isSelf ? (
                    <div className="connection-status-message">
                      Cannot Send a Connection to Yourself.
                    </div>
                  ) : isConnected ? (
                    <div className="connection-status-message">
                      Connection already exists.
                    </div>
                  ) : isRequestSent ? (
                    <div className="connection-status-message">
                      Request Sent!
                    </div>
                  ) : (
                    <img
                      src={ConnectMidlleimage}
                      alt="Connect"
                      className="middle-connect-image"
                      onClick={() => sendConnectionRequest(post.authorId)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <div className="middle-action-icons">
                    <div
                      onClick={() => handleShareClick(index)}
                      className="middle-icon-container"
                    >
                      <img
                        src={ShareIcon}
                        className="middle-icon-share"
                        alt="Share"
                      />
                    </div>
                    <div
                      className="middle-icon-container"
                      onClick={() => handleCommentClick(index)}
                    >
                      <span className="middle-icon-count">
                        {post.comments.length}
                      </span>
                      <img src={Commenticonsvg} alt="Comment" />
                    </div>

                    <div
                      className="middle-icon-container"
                      onClick={() => handleLike(index)}
                    >
                      <span className="middle-icon-count">{post.likes}</span>
                      {post.isLiked ? (
                        <FcLike className="middle-icon liked" />
                      ) : (
                        <img
                          src={LikeIcon}
                          className="middle-icon Liked"
                          alt="Like"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="middle-post-text">
                  <div className="middle-post-text-content">
                    <span className="middle-post-author">
                      {post.authorName || "Unknown Author"}
                    </span>
                    <span className="middle-post-caption">
                      {renderCaption(post.caption, index)}
                      {post.caption && post.caption.length > 100 && (
                    <span
                      className="middle-see-more"
                      onClick={() => toggleSeeMore(index)}
                    >
                      {seeMore[index] ? "....See Less" : "....See More"}
                    </span>
                  )}
                    </span>
                  </div>
                 
                </div>
              </div>
            );
          })
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {showComment && activeCommentPostIndex !== null && (
        <div className="Comment-box-container">
          <div
            className="Full-comment-section-desktop-main-container"
            ref={commentModalRef}
          >
            <div className="Full-comment-section-desktop-left-section">
              <div className="Full-comment-section-desktop-user-profile-header">
                <div className="Full-comment-section-profile-image-and-heading">
                  <img
                    src={userProfile?.profilePicture || Profileimage}
                    alt="Profile"
                    className="Full-comment-section-desktop-profile-picture"
                  />
                  <div className="Full-comment-section-desktop-user-info">
                    <div className="Full-comment-section-desktop-name-and-postTime">
                      <span className="Full-comment-section-desktop-user-name">
                        {userProfile?.name || "Anonymous"}
                      </span>
                      <span className="Full-comment-section-desktop-user-details">
                        18h
                      </span>
                    </div>
                    <div className="Full-comment-section-desktop-work-and-education">
                      <span className="Full-comment-section-desktop-user-details">
                        {userProfile?.education || "Not specified"}
                      </span>
                      <span className="Full-comment-section-desktop-user-details">
                        ||
                      </span>
                      <span className="Full-comment-section-desktop-user-details">
                        {userProfile?.workPlace || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
                <img
                  src={Threedot}
                  onClick={() => setShowCommentOptions(!showCommentOptions)}
                  className="Full-comment-section-desktop-menu-icon"
                  alt="Menu"
                />
                {showCommentOptions && (
                  <div className="comment-threedot-options-dropdown">
                    <button className="comment-threedot-options-item">
                      Interest
                    </button>
                    <button className="comment-threedot-options-item">
                      Not Interest
                    </button>
                    <button className="comment-threedot-options-item">
                      Block
                    </button>
                    <button className="comment-threedot-options-item">
                      Report
                    </button>
                    <button className="comment-threedot-options-item">
                      Message
                    </button>
                  </div>
                )}
              </div>
              <div className="Full-comment-section-desktop-photo-container">
                {posts[activeCommentPostIndex]?.mediaUrl ? (
                  Array.isArray(posts[activeCommentPostIndex].mediaUrl) ? (
                    posts[activeCommentPostIndex].mediaUrl.map(
                      (url, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={url}
                          alt={`Post Image ${imgIndex + 1}`}
                          className="Full-comment-section-desktop-post-photo"
                          onError={(e) => {
                            console.error(`Failed to load image: ${url}`);
                            e.target.src = Profileimage;
                          }}
                        />
                      )
                    )
                  ) : (
                    <img
                      src={posts[activeCommentPostIndex].mediaUrl}
                      alt="Post Image"
                      className="Full-comment-section-desktop-post-photo"
                      onError={(e) => {
                        console.error(
                          `Failed to load image: ${posts[activeCommentPostIndex].mediaUrl}`
                        );
                        e.target.src = Profileimage;
                      }}
                    />
                  )
                ) : (
                  <img
                    src={Profileimage}
                    alt="Default Post"
                    className="Full-comment-section-desktop-post-photo"
                  />
                )}
              </div>
            </div>

            <div className="Full-comment-section-desktop-right-section">
              <div className="Full-comment-section-desktop-comments-header">
                <h1 className="Full-comment-section-desktop-heading">
                  Comments
                </h1>
              </div>
              <div className="Full-comment-section-desktop-comments-list">
                {commentsLoading ? (
                  <div className="comments-loading">Loading comments...</div>
                ) : posts[activeCommentPostIndex].comments.length > 0 ? (
                  posts[activeCommentPostIndex].comments.map(
                    (comment, index) => (
                      <div
                        className="Full-comment-section-desktop-comment-main-parent"
                        key={comment.id || index}
                      >
                        <div className="Full-comment-section-desktop-comment">
                          <img
                            src={
                              comment.user?.profilePictureUrl || Profileimage
                            }
                            alt="Profile"
                            className="Full-comment-section-desktop-comment-profile-picture"
                            onError={(e) => {
                              e.target.src = Profileimage;
                            }}
                          />
                          <div className="Full-comment-section-desktop-comment-content">
                            <div className="Full-comment-section-desktop-comment-user-info">
                              <span className="Full-comment-section-desktop-comment-username">
                                {comment.user?.username || "Anonymous"}
                              </span>
                              <span className="Full-comment-section-desktop-comment-timestamp">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleTimeString() || "Just now"}
                              </span>
                            </div>
                            <div className="Full-comment-section-desktop-comment-text">
                              {comment.content}
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
                          <span>{comment.likes || 0}</span>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="no-comments-message">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
              <div
                className="Full-comment-section-desktop-comment-input-and-image"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={userProfile?.profilePicture || Profileimage}
                  className="Full-comment-section-desktop-commentPerson-image"
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
                    fontSize: "40px",
                  }}
                />
              </div>
              <button
                onClick={handleCloseCommentModal}
                className="Full-comment-section-desktop-cross-button"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {showShare && activeSharePostIndex !== null && (
        <div className="Full-share-section-desktop-main-container" ref={shareModalRef}>
          <div className="Full-share-section-desktop-left-section">
            <div className="Full-share-section-desktop-user-profile-header">
              <div className="Full-share-section-desktop-top-image-and-names">
                <img
                  src={userProfile?.profilePicture || Profileimage}
                  alt="Profile"
                  className="Full-share-section-desktop-profile-picture"
                />
                <div className="Full-share-section-desktop-user-info">
                  <div className="Full-share-section-desktop-name-and-postTime">
                    <span className="Full-share-section-desktop-user-name">
                      {userProfile?.name || "Anonymous"}
                    </span>
                    <span className="Full-share-section-desktop-user-details">
                      18h
                    </span>
                  </div>
                  <div className="Full-share-section-desktop-work-and-education">
                    <span className="Full-share-section-desktop-user-details">
                      {userProfile?.education || "Not specified"}
                    </span>
                    <span className="Full-share-section-desktop-user-details">
                      ||
                    </span>
                    <span className="Full-share-section-desktop-user-details">
                      {userProfile?.workPlace || "Not specified"}
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
              {posts[activeSharePostIndex]?.mediaUrl ? (
                Array.isArray(posts[activeSharePostIndex].mediaUrl) ? (
                  posts[activeSharePostIndex].mediaUrl.map((url, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={url}
                      alt={`Post Image ${imgIndex + 1}`}
                      className="Full-share-section-desktop-post-photo"
                      onError={(e) => {
                        console.error(`Failed to load image: ${url}`);
                        e.target.src = Profileimage;
                      }}
                    />
                  ))
                ) : (
                  <img
                    src={posts[activeSharePostIndex].mediaUrl}
                    alt="Post Image"
                    className="Full-share-section-desktop-post-photo"
                    onError={(e) => {
                      console.error(
                        `Failed to load image: ${posts[activeSharePostIndex].mediaUrl}`
                      );
                      e.target.src = Profileimage;
                    }}
                  />
                )
              ) : (
                <img
                  src={Profileimage}
                  alt="Default Post"
                  className="Full-share-section-desktop-post-photo"
                />
              )}
            </div>
          </div>

          <div className="Full-share-section-desktop-right-section">
            <h1 className="Full-share-section-desktop-heading">Share</h1>
            {shareError && (
              <div className="share-error-message">{shareError}</div>
            )}
            <div className="Full-share-section-desktop-innerDiv">
              <div className="Full-share-section-desktop-AvtaarAndName-collection">
                {connections.length > 0 ? (
                  connections.map((connection) => (
                    <div
                      key={connection.id}
                      className="Full-share-section-desktop-contact"
                      onClick={() => {
                        setShareMessage(
                          `@${connection.username} ${shareMessage}`
                        );
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={connection.profilePictureUrl || Profileimage}
                        alt={connection.username}
                        className="Full-share-section-desktop-contact-image"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        onError={(e) => {
                          e.target.src = Profileimage;
                        }}
                      />
                      <span>{connection.username}</span>
                    </div>
                  ))
                ) : (
                  <p>No connections available.</p>
                )}
              </div>
              <div className="Full-share-section-desktop-AllIcons">
                <img
                  src={savedIcon}
                  alt="Saved"
                  onClick={handleSavePost}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={linkIcon}
                  alt="Link"
                  onClick={handleCopyLink}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={xIcon}
                  alt="X"
                  onClick={handleShareToX}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  onClick={handleShareToWhatsApp}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  onClick={handleShareToFacebook}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={instaIcon}
                  alt="Instagram"
                  onClick={handleShareToInstagram}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="Full-share-section-desktop-share-input-and-image">
              <img
                src={userProfile?.profilePicture || Profileimage}
                className="Full-share-section-desktop-sharePerson-image"
                alt="Share Person"
              />
              <input
                type="text"
                placeholder={`Write a share to ${
                  posts[activeSharePostIndex]?.authorName || "someone"
                }`}
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleShareSubmit()}
              />
              <IoSendOutline
                className="share-send-icon"
                onClick={handleShareSubmit}
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  fontSize: "50px",
                }}
              />
            </div>
            <button
              onClick={handleCloseShareModal}
              className="Full-share-section-desktop-cross-button"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="image-modal-overlay">
          <div className="image-modal" ref={imageModalRef}>
            <button
              className="image-modal-close"
              onClick={() => {
                setShowImageModal(false);
                setSelectedImage(null);
              }}
            >
              ×
            </button>
            <img src={selectedImage} alt="Selected" className="image-modal-content" />
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopMiddle;