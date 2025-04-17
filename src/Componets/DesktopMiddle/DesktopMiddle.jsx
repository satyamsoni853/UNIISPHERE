import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import "./DesktopMiddle.css";


// Replace these imports with your actual images/paths
import Commenticonsvg from "./Commenticon.svg";
import LikeIcon from "./Like.svg";
import ConnectMidlleimage from "./middleconnectimage.png";
import Profileimage from "./Profile-image.png";
import ShareIcon from "./Share.svg";
import Threedot from "./Threedot.svg";

// Share box icons
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
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [posts, setPosts] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentPostIndex, setActiveCommentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // State for current user's profile
  const [commentsLoading, setCommentsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const getAuthData = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    return token && userId ? { token, userId } : null;
  };

  // Fetch current user's profile (optional, if API provides this)
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
        await fetchUserProfile(response.data.userId, authData.token); // Fetch user profile
      }

      if (response.data.posts && response.data.posts.length > 0) {
        const updatedPosts = response.data.posts.map((post) => ({
          _id: post.id,
          authorId: post.user?.id,
          profilePhoto: post.user?.profilePictureUrl || Profileimage,
          authorName: post.user?.username || "Unknown Author",
          authorDetails: post.user?.headline || "No headline available",
          mediaUrl: post.mediaUrl || [],
          caption: post.content,
          createdAt: post.createdAt,
          likes: post.totalLikes || 0,
          isLiked: post.Likes?.some((like) => like.userId === authData.userId) || false,
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

  const handleLike = async (index) => {
    const post = posts[index];
    const authData = getAuthData();
    if (!authData) {
      setError("Please log in to like posts");
      return;
    }

    const originalPost = { ...post };
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

    try {
      const endpoint = post.isLiked
        ? `https://uniisphere-1.onrender.com/posts/${post._id}/unlike`
        : `https://uniisphere-1.onrender.com/posts/${post._id}/like`;

      console.log("Attempting to like/unlike post:", post._id, "isLiked:", post.isLiked);
      console.log("Endpoint:", endpoint);

      const response = await axios({
        method: "post",
        url: endpoint,
        headers: {
          Authorization: `Bearer ${authData.token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("Like/Unlike response:", response.data);
      await fetchFeed();
    } catch (error) {
      console.error("Like/Unlike error:", error.response?.data || error.message);
      setPosts((prevPosts) =>
        prevPosts.map((p, i) =>
          i === index
            ? {
                ...p,
                isLiked: originalPost.isLiked,
                likes: originalPost.likes,
              }
            : p
        )
      );
      setError("Failed to update like status. Please try again.");
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
    setCommentsLoading(false);
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
      console.error("Error: userId is missing!");
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
                    className="middle-options-icon"
                    onClick={() => setShowOptions(!showOptions)}
                  />
                  {showOptions && (
                    <div className="middle-options-dropdown">
                      <button className="middle-options-item">Interest</button>
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
                      onError={(e) => {
                        console.error(`Failed to load image: ${post.mediaUrl}`);
                        e.target.src = Profileimage;
                      }}
                    />
                  )
                ) : (
                  <img
                    src={Profileimage}
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
                    {post.isLiked ? (
                      <FcLike className="middle-icon liked" />
                    ) : (
                      <img
                        src={LikeIcon}
                        className="middle-icon"
                        alt="Like"
                      />
                    )}
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
                {post.caption || post.content || "No caption available"}
                <span className="middle-see-more">...more</span>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {showComment && activeCommentPostIndex !== null && (
        <div className="Comment-box-container">
          <div className="Full-comment-section-desktop-main-container">
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
                    <button className="comment-threedot-options-item">Interest</button>
                    <button className="comment-threedot-options-item">
                      Not Interest
                    </button>
                    <button className="comment-threedot-options-item">Block</button>
                    <button className="comment-threedot-options-item">Report</button>
                    <button className="comment-threedot-options-item">Message</button>
                  </div>
                )}
              </div>
              <div className="Full-comment-section-desktop-photo-container">
                {posts[activeCommentPostIndex]?.mediaUrl ? (
                  Array.isArray(posts[activeCommentPostIndex].mediaUrl) ? (
                    posts[activeCommentPostIndex].mediaUrl.map((url, imgIndex) => (
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
                    ))
                  ) : (
                    <img
                      src={posts[activeCommentPostIndex].mediaUrl}
                      alt="Post Image"
                      className="Full-comment-section-desktop-post-photo"
                      onError={(e) => {
                        console.error(`Failed to load image: ${posts[activeCommentPostIndex].mediaUrl}`);
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
                            src={comment.user?.profilePictureUrl || Profileimage}
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
              <div className="Full-comment-section-desktop-comment-input-and-image">
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
                    fontSize: "20px",
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

      {showShare && (
        <div className="Full-share-section-desktop-main-container">
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
              {posts[activeCommentPostIndex]?.mediaUrl ? (
                Array.isArray(posts[activeCommentPostIndex].mediaUrl) ? (
                  posts[activeCommentPostIndex].mediaUrl.map((url, imgIndex) => (
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
                    src={posts[activeCommentPostIndex].mediaUrl}
                    alt="Post Image"
                    className="Full-share-section-desktop-post-photo"
                    onError={(e) => {
                      console.error(`Failed to load image: ${posts[activeCommentPostIndex].mediaUrl}`);
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
            <div className="Full-share-section-desktop-innerDiv">
              <div className="Full-share-section-desktop-AvtaarAndName-collection">
                {/* Placeholder for dynamic share contacts */}
                <p>No contacts available. Fetch contacts from API to share.</p>
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
                src={userProfile?.profilePicture || Profileimage}
                className="Full-share-section-desktop-sharePerson-image"
                alt="Share Person"
              />
              <input
                type="text"
                placeholder={`Write a share to ${posts[activeCommentPostIndex]?.authorName || "someone"}`}
              />
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