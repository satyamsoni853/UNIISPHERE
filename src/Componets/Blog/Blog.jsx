import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Blog.css";

import profile from "./profile.jpg";
import backIcon from "./backsvg.svg";
import Like from "./Like.svg";
import Share from "./Share.svg";
import Comment from "./Comment.svg";
import leftForward from "./fast-forward 2.svg";
import rightForward from "./fast-forward 1.svg";
import pause from "./pause.svg";
import threeDot from "./Threedot.svg";
import cc from "./cc.svg";
import expand from "./expand.svg";
import { IoIosArrowDown } from "react-icons/io";
import MobileNavBarr from "../MobileNavbarr/MobileNavbarr";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import MobileFooter from "../Mobilefooter/MobileFooter";

const Blog = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Extract userId from URL
  const videoRefs = useRef([]); // Array to store video refs

  // State for blog data
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileCache, setProfileCache] = useState({}); // Cache for user profiles

  // State for mobile section
  const [showDefaultBlog, setShowDefaultBlog] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  // State for desktop section
  const [showDesktopDefaultSection, setShowDesktopDefaultSection] = useState(true);
  const [showDesktopCreateBlog, setShowDesktopCreateBlog] = useState(false);

  // Static demo blog list for Top Blogs
  const blogList = [
    {
      name: "Arjun Verma",
      description: "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
  ];

  // Fetch blogs and user profiles
  useEffect(() => {
    const fetchBlogsAndProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Authentication token not found");

        // Decode JWT to verify current user
        let currentUserId;
        try {
          const decodedToken = jwtDecode(authToken);
          currentUserId = decodedToken.id || decodedToken.sub || decodedToken.userId;
          if (!currentUserId) throw new Error("User ID not found in token");
        } catch (err) {
          throw new Error("Failed to decode token: " + err.message);
        }

        console.log("User ID from URL:", userId); // Log the user ID from URL

        // Fetch blogs
        const blogResponse = await axios.get(
          `https://uniisphere-1.onrender.com/api/allBlogs`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Get Blog API Response:", blogResponse.data); // Log the API response
        const blogData = blogResponse.data.data;

        // Fetch user profiles for each blog's author
        const updatedBlogs = await Promise.all(
          blogData.map(async (blog) => {
            const authorId = blog.authorId || blog.userId || currentUserId; // Adjust based on your API
            if (!authorId) {
              return {
                ...blog,
                author: { name: "Unknown Author", affiliation: "Unknown Affiliation", avatar: profile },
              };
            }

            // Check cache first
            if (profileCache[authorId]) {
              return { ...blog, author: profileCache[authorId] };
            }

            // Fetch profile from API
            try {
              const profileResponse = await axios.get(
                `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${authorId}`,
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );

              const profileData = profileResponse.data[0];
              const author = {
                name: `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim() || profileData.username || "Unknown Author",
                affiliation: profileData.university || profileData.company || "Unknown Affiliation",
                avatar: profileData.profilePictureUrl || profile,
              };

              // Update cache
              setProfileCache((prev) => ({ ...prev, [authorId]: author }));

              return { ...blog, author };
            } catch (profileError) {
              console.error(`Error fetching profile for user ${authorId}:`, profileError);
              return {
                ...blog,
                author: { name: "Unknown Author", affiliation: "Unknown Affiliation", avatar: profile },
              };
            }
          })
        );

        setBlogs(updatedBlogs);
      } catch (err) {
        console.error("GET /api/blog error:", err);
        setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBlogsAndProfiles();
    else setError("User ID is missing");
  }, [userId, profileCache]);

  // Video control functions
  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video && video.paused) {
      video.play();
    } else if (video) {
      video.pause();
    }
  };

  const handleForward = (index) => {
    const video = videoRefs.current[index];
    if (video) video.currentTime += 10;
  };

  const handleBackward = (index) => {
    const video = videoRefs.current[index];
    if (video) video.currentTime -= 10;
  };

  // Function to extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/
    )?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Render media (titlePhoto, contentVideo, mediaUrl)
  const renderMedia = (titlePhoto, contentVideo = [], mediaUrl = [], blogIndex) => {
    const allMedia = [
      ...(titlePhoto ? [{ type: "image", url: titlePhoto }] : []),
      ...contentVideo.map((url) => ({ type: url.includes("youtu") ? "youtube" : "video", url })),
      ...mediaUrl.map((url) => ({ type: url.includes("youtu") ? "youtube" : "video", url })),
    ];

    return allMedia.map((media, mediaIndex) => {
      const uniqueIndex = `${blogIndex}-${mediaIndex}`; // Unique index for refs
      if (media.type === "image") {
        return (
          <img
            key={uniqueIndex}
            src={media.url}
            alt="Blog media"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
          />
        );
      } else if (media.type === "youtube") {
        return (
          <iframe
            key={uniqueIndex}
            width="100%"
            height="315"
            src={getYouTubeEmbedUrl(media.url)}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginBottom: "10px" }}
          ></iframe>
        );
      } else {
        return (
          <div key={uniqueIndex} className="blog-media">
            <video
              ref={(el) => (videoRefs.current[uniqueIndex] = el)}
              src={media.url}
              style={{ maxWidth: "100%", marginBottom: "10px" }}
              controls
            />
            <div className="blog-media-controls">
              <div className="blog-progress-bar"></div>
              <div className="blog-controls-all-btn">
                <div className="blog-media-controls-left">
                  <img
                    className="blog-control-btn"
                    src={leftForward}
                    alt="Backward"
                    onClick={() => handleBackward(uniqueIndex)}
                  />
                  <img
                    className="blog-control-btn"
                    src={pause}
                    alt="Play/Pause"
                    onClick={() => handlePlayPause(uniqueIndex)}
                  />
                  <img
                    className="blog-control-btn"
                    src={rightForward}
                    alt="Forward"
                    onClick={() => handleForward(uniqueIndex)}
                  />
                </div>
                <div className="blog-media-controls-right">
                  <img src={cc} alt="CC" className="blog-control-btn" />
                  <img src={expand} className="blog-control-btn" alt="Expand" />
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="blog-container">
        <div className="blog-container-nav">
          <MobileNavBarr />
        </div>
        <div className="blog-container-background">
          <Background />
        </div>

        {showDefaultBlog && (
          <div className="blog-main-wrapper">
            <div className="blog-nav">
              <div className="blog-dropdown">
                Recommended <IoIosArrowDown />
              </div>
              <button
                onClick={() => {
                  navigate(`/blogcreate/${userId}`);
                  setShowCreateBlog(true);
                  setShowDefaultBlog(false);
                }}
                className="blog-create-btn"
              >
                + CREATE
              </button>
            </div>

            {loading && <p>Loading blogs...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && blogs.length === 0 && <p>No blogs available.</p>}
            {!loading && !error && blogs.length > 0 && (
              <div className="blog-list">
                {blogs.map((blog, blogIndex) => (
                  <div key={blog.id} className="blog-post">
                    <div className="blog-header">
                      <div className="blog-profile">
                        <div className="blog-profile-image">
                          <img
                            src={blog.author?.avatar || profile}
                            alt="Profile"
                            className="blog-profile-pic"
                            onError={(e) => { e.target.src = profile; }} // Fallback on error
                          />
                        </div>
                        <div className="blog-user-info">
                          <div className="blog-username">
                            {blog.author?.name || "Unknown Author"}{" "}
                            <span className="blog-timestamp">
                              {new Date(blog.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="blog-affiliation">
                            {blog.author?.affiliation || "Unknown Affiliation"}
                          </div>
                        </div>
                      </div>
                      <div className="blog-options">
                        <img src={threeDot} alt="Options" />
                      </div>
                    </div>

                    <div className="blog-media">
                      {renderMedia(blog.titlePhoto, blog.contentVideo, blog.mediaUrl, blogIndex)}
                    </div>

                    <div className="blog-title-section">
                      <div className="blog-heading-section">
                        <h2 className="blog-title">{blog.title}</h2>
                        <div className="blog-author">{blog.author?.name || "Unknown Author"}</div>
                      </div>
                      <div className="blog-text-body">
                        {blog.description && (
                          <p className="blog-content">{blog.description}</p>
                        )}
                        <p className="blog-content">{blog.content}</p>
                        {blog.tags?.length > 0 && (
                          <p className="blog-tags">Tags: {blog.tags.join(", ")}</p>
                        )}
                        <div className="blog-interaction">
                          <div className="blog-likes">
                            {blog.likes} Likes • {blog.views} Views
                          </div>
                          <div className="blog-icons">
                            <img className="blog-icon-share" src={Share} alt="Share" />
                            <img className="blog-icon" src={Comment} alt="Comment" />
                            <img className="blog-icon" src={Like} alt="Like" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="blog-container-footer">
          <MobileFooter />
        </div>
      </div>

      {/* Desktop Section */}
      <div className="desktop-blog-main-wrapper">
        <div className="desktop-blog-nav-fixed">
          <DesktopNavbarr />
        </div>
        <div className="desktop-blog-background">
          <Background />
        </div>
        <div className="desktop-blog-container">
          <div className="desktop-blog-main-sidebar">
            <div className="desktop-blog-nav">
              <div className="desktop-blog-dropdown">
                Recommended <IoIosArrowDown />
              </div>
              <button
                onClick={() => {
                  navigate(`/blogcreate/${userId}`);
                  setShowDesktopDefaultSection(false);
                  setShowDesktopCreateBlog(true);
                }}
                className="desktop-blog-create-btn"
              >
                + CREATE
              </button>
            </div>
            <div className="desktop-blog-sidebar-blogs">
              <div className="desktop-blog-sidebar-blogs-title">Top Blogs</div>
              <div className="desktop-blog-sidebar-blogs-list">
                {blogList.map((blog, index) => (
                  <div key={index} className="desktop-blog-sidebar-blogs-item">
                    <img
                      src={blog.avatar}
                      alt="Avatar"
                      className="desktop-blog-sidebar-blogs-avatar"
                    />
                    <div className="desktop-blog-sidebar-blogs-text">
                      <div className="desktop-blog-sidebar-blogs-name">{blog.name}</div>
                      <div className="desktop-blog-sidebar-blogs-description">
                        {blog.description}
                        <span className="desktop-blog-more-link">...more</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showDesktopDefaultSection && (
            <div className="desktop-blog-content-div">
              {loading && <p>Loading blogs...</p>}
              {error && <p className="error-message">{error}</p>}
              {!loading && !error && blogs.length === 0 && <p>No blogs available.</p>}
              {!loading && !error && blogs.length > 0 && (
                <div className="blog-list">
                  {blogs.map((blog, blogIndex) => (
                    <div key={blog.id} className="desktop-blog-post">
                      <div className="desktop-blog-header">
                        <div className="desktop-blog-profile">
                          <div className="desktop-blog-profile-image">
                            <img
                              src={blog.author?.avatar || profile}
                              alt="Profile"
                              className="desktop-blog-profile-pic"
                              onError={(e) => { e.target.src = profile; }} // Fallback on error
                            />
                          </div>
                          <div className="desktop-blog-user-info">
                            <div className="desktop-blog-username">
                              {blog.author?.name || "Unknown Author"}{" "}
                              <span className="desktop-blog-timestamp">
                                {new Date(blog.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="desktop-blog-affiliation">
                              {blog.author?.affiliation || "Unknown Affiliation"}
                            </div>
                          </div>
                        </div>
                        <div className="desktop-blog-options">
                          <img src={threeDot} alt="Options" />
                        </div>
                      </div>

                      <div className="desktop-blog-media">
                        {renderMedia(blog.titlePhoto, blog.contentVideo, blog.mediaUrl, blogIndex)}
                      </div>

                      <div className="desktop-blog-title-section">
                        <div className="desktop-blog-heading-section">
                          <h2 className="desktop-blog-title">{blog.title}</h2>
                          <div className="desktop-blog-author">{blog.author?.name || "Unknown Author"}</div>
                        </div>
                        <div className="desktop-blog-text-body">
                          {blog.description && (
                            <p className="desktop-blog-content">{blog.description}</p>
                          )}
                          <p className="desktop-blog-content">{blog.content}</p>
                          {blog.tags?.length > 0 && (
                            <p className="desktop-blog-tags">Tags: {blog.tags.join(", ")}</p>
                          )}
                          <div className="desktop-blog-interaction">
                            <div className="desktop-blog-likes">
                              {blog.likes} Likes • {blog.views} Views
                            </div>
                            <div className="desktop-blog-icons">
                              <img className="desktop-blog-icon-share" src={Share} alt="Share" />
                              <img className="desktop-blog-icon" src={Comment} alt="Comment" />
                              <img className="desktop-blog-icon" src={Like} alt="Like" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;