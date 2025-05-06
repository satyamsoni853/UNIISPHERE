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
import Toast from '../Common/Toast';

function MobileMiddleSection() {
  const [showComment, setShowComment] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // For image modal
  const [selectedImage, setSelectedImage] = useState(null); // For image modal
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // For image modal slider
  const [selectedImages, setSelectedImages] = useState([]); // For image modal slider
  const [activeOptionsPostId, setActiveOptionsPostId] = useState(null);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [activeSharePostIndex, setActiveSharePostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [shareError, setShareError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [connections, setConnections] = useState([]);
  const [connectionStatuses, setConnectionStatuses] = useState({});
  const [seeMore, setSeeMore] = useState({});
  const [currentSlides, setCurrentSlides] = useState({});
  const optionsRef = useRef(null);
  const commentModalRef = useRef(null);
  const shareModalRef = useRef(null);
  const imageModalRef = useRef(null); // For image modal click outside
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const userData = {
    profilePicture: profilePhoto,
    name: "VIJAY PRASAD",
    education: "University of Delhi",
    workPlace: "Works at Google",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setActiveOptionsPostId(null);
        console.log("Closed options menu by clicking outside.");
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
        setSelectedImages([]);
        setSelectedImageIndex(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComment, showShare, showImageModal]);

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
        "https://uniisphere-backend-latest.onrender.com/api/connections",
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
        "https://uniisphere-backend-latest.onrender.com/api/connections/sent",
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
        axios.get("https://uniisphere-backend-latest.onrender.com/api/feed", {
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
          _id: post.id,
          authorId: post.user?.id,
          profilePhoto: post.user?.profilePictureUrl || Profileimage,
          authorName: post.user?.username || "Unknown Author",
          authorDetails: post.user?.headline || "University of Delhi | Works at Google",
          mediaUrl: post.mediaUrl || [MiddlemainImage],
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
        const initialSlides = updatedPosts.reduce((acc, post) => {
          acc[post._id] = 0;
          return acc;
        }, {});
        setCurrentSlides(initialSlides);
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
        `https://uniisphere-backend-latest.onrender.com/api/connect/${receiverId}`,
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

    const originalPost = { ...post };

    try {
      const endpoint = post.isLiked
        ? `https://uniisphere-backend-latest.onrender.com/posts/${post._id}/unlike`
        : `https://uniisphere-backend-latest.onrender.com/posts/${post._id}/like`;

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
      console.error("Like/Unlike error:", error.response?.data || error.message);

      setPosts((prevPosts) =>
        prevPosts.map((p, i) => (i === index ? originalPost : p))
      );

      setError("Failed to update like status. Please try again.");
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
        `https://uniisphere-backend-latest.onrender.com/posts/${post._id}/comments`,
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
    setCommentsLoading(false);
  };

  const handleCloseCommentModal = () => {
    console.log("Closing comment modal.");
    setActiveCommentPostIndex(null);
    setShowComment(false);
    setError(null);
  };

  const handleShareClick = (index) => {
    setActiveSharePostIndex(index);
    setShowShare(true);
    setShareMessage("");
    setShareError(null);
  };

  const handleCloseShareModal = () => {
    setActiveSharePostIndex(null);
    setShowShare(false);
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
        `https://uniisphere-backend-latest.onrender.com/posts/${post._id}/share`,
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
      setShowShare(false);
    } catch (error) {
      console.error("Share submission error:", error.response?.data || error);
      setShareError(
        error.response?.data?.message ||
        "Failed to share post. Please try again."
      );
    }
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const handleCopyLink = () => {
    const post = posts[activeSharePostIndex];
    const postUrl = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard.writeText(postUrl);
    showSuccessToast("Link copied to clipboard!");
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
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
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
        `https://uniisphere-backend-latest.onrender.com/posts/${post._id}/save`,
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
      showSuccessToast("Post saved successfully!");
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

  const handlePrevSlide = (postId, totalImages) => {
    setCurrentSlides((prev) => {
      const current = prev[postId] || 0;
      const nextIndex = (current - 1 + totalImages) % totalImages;
      return { ...prev, [postId]: nextIndex };
    });
  };

  const handleNextSlide = (postId, totalImages) => {
    setCurrentSlides((prev) => {
      const current = prev[postId] || 0;
      const nextIndex = (current + 1) % totalImages;
      return { ...prev, [postId]: nextIndex };
    });
  };

  const handleImageClick = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  const handleImageModalPrev = () => {
    setSelectedImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  const handleImageModalNext = () => {
    setSelectedImageIndex((prev) => (prev + 1) % selectedImages.length);
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
          const images = Array.isArray(post.mediaUrl) ? post.mediaUrl : [post.mediaUrl];
          const currentSlide = currentSlides[post._id] || 0;

          return (
            <div key={post._id || index} className="mobile-post-container">
              <div className="mobile-middle-profile-header">
                <div className="mobile-image-and-name-holder">
                  <div
                    onClick={() => handleProfileClick(post.authorId || userId)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={post.profilePhoto}
                      alt="Profile"
                      className="mobile-middle-profile-pic"
                      onError={(e) => {
                        e.target.src = Profileimage;
                      }}
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
                        {/* You cannot send a connection request to yourself. */}
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
                        Interest
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Not Interested", post._id)}
                      >
                        Not Interested
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Block", post._id)}
                      >
                        Block
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Report", post._id)}
                      >
                        Report
                      </button>
                      <button
                        className="mobile-middle-options-item"
                        onClick={() => handleOptionClick("Message", post._id)}
                      >
                        Message
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile-middle-main-image">
                <div className="mobile-slider-container">
                  <button
                    className="mobile-slider-arrow mobile-slider-arrow-left"
                    onClick={() => handlePrevSlide(post._id, images.length)}
                  >
                    ←
                  </button>
                  <div className="mobile-slider">
                    {images.map((url, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`mobile-slider-item ${
                          imgIndex === currentSlide ? "active" : ""
                        }`}
                      >
                        <img
                          src={url}
                          alt={`Post ${index + 1} - Image ${imgIndex + 1}`}
                          className="mobile-middle-content-image"
                          onClick={() => handleImageClick(images, imgIndex)}
                          onDoubleClick={() => handleLike(index)}
                          style={{ cursor: "pointer" }}
                          onError={(e) => {
                            console.error(`Failed to load image: ${url}`);
                            e.target.src = Profileimage;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="mobile-slider-arrow mobile-slider-arrow-right"
                    onClick={() => handleNextSlide(post._id, images.length)}
                  >
                    →
                  </button>
                </div>
                {images.length > 1 && (
                  <div className="mobile-slider-dots">
                    {images.map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`mobile-slider-dot ${
                          dotIndex === currentSlide ? "active" : ""
                        }`}
                        onClick={() =>
                          setCurrentSlides((prev) => ({
                            ...prev,
                            [post._id]: dotIndex,
                          }))
                        }
                      />
                    ))}
                  </div>
                )}
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
                    onClick={() => handleShareClick(index)}
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
                <div className="mobile-middle-post-text-content">
                  
                  <span className="mobile-middle-post-caption">
                  <span className="mobile-middle-post-author">
                    {post.authorName}
                  </span>{" "}
                    {renderCaption(post.caption, index)}
                    {post.caption && post.caption.length > 100 && (
                  <span
                    className="mobile-middle-see-more"
                    onClick={() => toggleSeeMore(index)}
                  >
                    {seeMore[index] ? "....See Less" : "...See More"}
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

      {showComment && activeCommentPostIndex !== null && (
        <div className="mobile-Full-comment-section-main-container">
          <div className="mobile-Full-comment-section-container" ref={commentModalRef}>
            <div className="mobile-Full-comment-section-user-profile-header">
              <div className="mobile-Full-comment-section-profile-image-and-heading">
                <img
                  src={userData?.profilePicture || Profileimage}
                  alt="Profile"
                  className="mobile-Full-comment-section-profile-picture"
                />
                <div className="mobile-Full-comment-section-user-info">
                  <div className="mobile-Full-comment-section-name-and-postTime">
                    <span className="mobile-Full-comment-section-user-name">
                      {userData?.name || "Anonymous"}
                    </span>
                    <span className="mobile-Full-comment-section-user-details">
                      18h
                    </span>
                  </div>
                  <div className="mobile-Full-comment-section-work-and-education">
                    <span className="mobile-Full-comment-section-user-details">
                      {userData?.education || "Not specified"}
                    </span>
                    <span className="mobile-Full-comment-section-user-details">
                      ||
                    </span>
                    <span className="mobile-Full-comment-section-user-details">
                      {userData?.workPlace || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
              <BsThreeDotsVertical
                onClick={() => setShowCommentOptions(!showCommentOptions)}
                className="mobile-Full-comment-section-menu-icon"
              />
              {showCommentOptions && (
                <div className="mobile-comment-threedot-options-dropdown">
                  <button className="mobile-comment-threedot-options-item">
                    Interest
                  </button>
                  <button className="mobile-comment-threedot-options-item">
                    Not Interest
                  </button>
                  <button className="mobile-comment-threedot-options-item">
                    Block
                  </button>
                  <button className="mobile-comment-threedot-options-item">
                    Report
                  </button>
                  <button className="mobile-comment-threedot-options-item">
                    Message
                  </button>
                </div>
              )}
            </div>
            <div className="mobile-Full-comment-section-photo-container">
              <div className="mobile-slider-container">
                <button
                  className="mobile-slider-arrow mobile-slider-arrow-left"
                  onClick={() =>
                    handlePrevSlide(
                      posts[activeCommentPostIndex]._id,
                      posts[activeCommentPostIndex].mediaUrl.length
                    )
                  }
                >
                  ←
                </button>
                <div className="mobile-slider">
                  {posts[activeCommentPostIndex].mediaUrl.map((url, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`mobile-slider-item ${
                        imgIndex === currentSlides[posts[activeCommentPostIndex]._id]
                          ? "active"
                          : ""
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Post Image ${imgIndex + 1}`}
                        className="mobile-Full-comment-section-post-photo"
                        onClick={() => handleImageClick(posts[activeCommentPostIndex].mediaUrl, imgIndex)}
                        style={{ cursor: "pointer" }}
                        onError={(e) => {
                          console.error(`Failed to load image: ${url}`);
                          e.target.src = Profileimage;
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="mobile-slider-arrow mobile-slider-arrow-right"
                  onClick={() =>
                    handleNextSlide(
                      posts[activeCommentPostIndex]._id,
                      posts[activeCommentPostIndex].mediaUrl.length
                    )
                  }
                >
                  →
                </button>
              </div>
              {posts[activeCommentPostIndex].mediaUrl.length > 1 && (
                <div className="mobile-slider-dots">
                  {posts[activeCommentPostIndex].mediaUrl.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`mobile-slider-dot ${
                        dotIndex === currentSlides[posts[activeCommentPostIndex]._id]
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentSlides((prev) => ({
                          ...prev,
                          [posts[activeCommentPostIndex]._id]: dotIndex,
                        }))
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-Full-comment-section-right-section">
              <div className="mobile-Full-comment-section-comments-header">
                <h1 className="mobile-Full-comment-section-heading">Comments</h1>
              </div>
              <div className="mobile-Full-comment-section-comments-list">
                {commentsLoading ? (
                  <div className="comments-loading">Loading comments...</div>
                ) : posts[activeCommentPostIndex].comments.length > 0 ? (
                  posts[activeCommentPostIndex].comments.map((comment, index) => (
                    <div
                      className="mobile-Full-comment-section-comment-main-parent"
                      key={comment.id || index}
                    >
                      <div className="mobile-Full-comment-section-comment">
                        <img
                          src={comment.user?.profilePictureUrl || Profileimage}
                          alt="Profile"
                          className="mobile-Full-comment-section-comment-profile-picture"
                          onError={(e) => {
                            e.target.src = Profileimage;
                          }}
                        />
                        <div className="mobile-Full-comment-section-comment-content">
                          <div className="mobile-Full-comment-section-comment-user-info">
                            <span className="mobile-Full-comment-section-comment-username">
                              {comment.user?.username || "Anonymous"}
                            </span>
                            <span className="mobile-Full-comment-section-comment-timestamp">
                              {new Date(comment.createdAt).toLocaleTimeString() || "Just now"}
                            </span>
                          </div>
                          <div className="mobile-Full-comment-section-comment-text">
                            {comment.content}
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
                  ))
                ) : (
                  <div className="no-comments-message">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-Full-comment-section-comment-input-and-image">
              <img
                src={userData?.profilePicture || Profileimage}
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

      {showShare && activeSharePostIndex !== null && (
        <div className="mobile-Full-share-section-main-container" ref={shareModalRef}>
          <div className="mobile-Full-share-section-container">
            <div className="mobile-Full-share-section-user-profile-header">
              <div className="mobile-Full-share-section-top-image-and-names">
                <img
                  src={userData?.profilePicture || Profileimage}
                  alt="Profile"
                  className="mobile-Full-share-section-profile-picture"
                />
                <div className="mobile-Full-share-section-user-info">
                  <div className="mobile-Full-share-section-name-and-postTime">
                    <span className="mobile-Full-share-section-user-name">
                      {userData?.name || "Anonymous"}
                    </span>
                    <span className="mobile-Full-share-section-user-details">
                      18h
                    </span>
                  </div>
                  <div className="mobile-Full-share-section-work-and-education">
                    <span className="mobile-Full-share-section-user-details">
                      {userData?.education || "Not specified"}
                    </span>
                    <span className="mobile-Full-share-section-user-details">
                      ||
                    </span>
                    <span className="mobile-Full-share-section-user-details">
                      {userData?.workPlace || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
              <BsThreeDotsVertical
                className="mobile-Full-share-section-menu-icon"
              />
            </div>
            <div className="mobile-Full-share-section-photo-container">
              <div className="mobile-slider-container">
                <button
                  className="mobile-slider-arrow mobile-slider-arrow-left"
                  onClick={() =>
                    handlePrevSlide(
                      posts[activeSharePostIndex]._id,
                      posts[activeSharePostIndex].mediaUrl.length
                    )
                  }
                >
                  ←
                </button>
                <div className="mobile-slider">
                  {posts[activeSharePostIndex].mediaUrl.map((url, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`mobile-slider-item ${
                        imgIndex === currentSlides[posts[activeSharePostIndex]._id]
                          ? "active"
                          : ""
                      }`}
                    >
                      <img
                        src={url}
                        alt={`Post Image ${imgIndex + 1}`}
                        className="mobile-Full-share-section-post-photo"
                        onClick={() => handleImageClick(posts[activeSharePostIndex].mediaUrl, imgIndex)}
                        style={{ cursor: "pointer" }}
                        onError={(e) => {
                          console.error(`Failed to load image: ${url}`);
                          e.target.src = Profileimage;
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="mobile-slider-arrow mobile-slider-arrow-right"
                  onClick={() =>
                    handleNextSlide(
                      posts[activeSharePostIndex]._id,
                      posts[activeSharePostIndex].mediaUrl.length
                    )
                  }
                >
                  →
                </button>
              </div>
              {posts[activeSharePostIndex].mediaUrl.length > 1 && (
                <div className="mobile-slider-dots">
                  {posts[activeSharePostIndex].mediaUrl.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`mobile-slider-dot ${
                        dotIndex === currentSlides[posts[activeSharePostIndex]._id]
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentSlides((prev) => ({
                          ...prev,
                          [posts[activeSharePostIndex]._id]: dotIndex,
                        }))
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mobile-Full-share-section-right-section">
              <div className="mobile-Full-share-section-heading-and-cross">
                <h1 className="mobile-Full-share-section-heading">Share</h1>
                {shareError && (
                  <div className="mobile-share-error-message">{shareError}</div>
                )}
              </div>
              <div className="mobile-Full-share-section-innerDiv">
                <div className="mobile-Full-share-section-AvatarAndName-collection">
                  {connections.length > 0 ? (
                    connections.map((connection) => (
                      <div
                        key={connection.id}
                        className="mobile-Full-share-section-AvatarAndName"
                        onClick={() => {
                          setShareMessage(`@${connection.username} ${shareMessage}`);
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={connection.profilePictureUrl || Profileimage}
                          alt={connection.username}
                          onError={(e) => {
                            e.target.src = Profileimage;
                          }}
                        />
                        <h1>{connection.username}</h1>
                      </div>
                    ))
                  ) : (
                    <p>No connections available.</p>
                  )}
                </div>
                <div className="mobile-Full-share-section-AllIcons">
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
                    src={InstagramIcon}
                    alt="Instagram"
                    onClick={handleShareToInstagram}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
            <div className="mobile-Full-share-section-share-input-and-image">
              <div className="mobile-Full-share-comment-box-and-image-and-searchIcon">
                <img
                  src={userData?.profilePicture || Profileimage}
                  className="mobile-Full-share-section-sharePerson-image"
                  alt="Share Person"
                />
                <input
                  type="text"
                  placeholder={`Write a share to ${posts[activeSharePostIndex]?.authorName || "someone"}`}
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleShareSubmit()}
                />
                <IoSendOutline
                  className="share-send-icon"
                  onClick={handleShareSubmit}
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </div>
            </div>
            <button
              onClick={handleCloseShareModal}
              className="mobile-Full-share-section-cross-button"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showImageModal && selectedImages.length > 0 && (
        <div className="mobile-image-modal-overlay">
          <div className="mobile-image-modal" ref={imageModalRef}>
            <button
              className="mobile-image-modal-close"
              onClick={() => {
                setShowImageModal(false);
                setSelectedImage(null);
                setSelectedImages([]);
                setSelectedImageIndex(0);
              }}
            >
              ×
            </button>
            <div className="mobile-image-modal-slider-container">
              <button
                className="mobile-image-modal-arrow mobile-image-modal-arrow-left"
                onClick={handleImageModalPrev}
              >
                ←
              </button>
              <div className="mobile-image-modal-slider">
                {selectedImages.map((url, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`mobile-image-modal-slider-item ${
                      imgIndex === selectedImageIndex ? "active" : ""
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Selected Image ${imgIndex + 1}`}
                      className="mobile-image-modal-content"
                      onError={(e) => {
                        e.target.src = Profileimage;
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="mobile-image-modal-arrow mobile-image-modal-arrow-right"
                onClick={handleImageModalNext}
              >
                →
              </button>
            </div>
            {selectedImages.length > 1 && (
              <div className="mobile-image-modal-dots">
                {selectedImages.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`mobile-image-modal-dot ${
                      dotIndex === selectedImageIndex ? "active" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(dotIndex)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type={toastType}
      />
    </div>
  );
}

export default MobileMiddleSection;