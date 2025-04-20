import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Blog.css";

import CollegeEnter from "./collegeEnter.svg";
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
  const videoRef = useRef(null);
  const check = "https://youtu.be/oolJWcOhHCw?si=2I7a2i3PAeTiOoxT"; // YouTube URL for dummy data

  // State for mobile section
  const [showDefaultBlog, setShowDefaultBlog] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  // State for desktop section
  const [showDesktopDefaultSection, setShowDesktopDefaultSection] = useState(true);
  const [showDesktopCreateBlog, setShowDesktopCreateBlog] = useState(false);

  // Static dummy posts for main blog section
  const posts = [
    {
      id: "dummy-1",
      author: "Vijay Prasad",
      affiliation: "University of Delhi...",
      timestamp: "18h",
      title: "Again the notice",
      content:
        "Vijay Prashad Been have evolved to go in the university and will probably prefer the university of...",
      likes: 4012,
      imageUrl: check, // YouTube URL
    },
  ];

  // Static demo blog list for Top Blogs
  const blogList = [
    {
      name: "Arjun Verma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    // Add other blogList items as needed
  ];

  // Video control functions
  const handlePlayPause = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleForward = () => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };

  const handleBackward = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  // Function to extract YouTube video ID (for dummy data)
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/
    )?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
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
                  navigate(`/blogcreate/${userId}`); // Navigate to blogcreate with userId
                  setShowCreateBlog(true);
                  setShowDefaultBlog(false);
                }}
                className="blog-create-btn"
              >
                + CREATE
              </button>
            </div>
            {posts.map((post, index) => (
              <div key={index} className="blog-post">
                <div className="blog-header">
                  <div className="blog-profile">
                    <div className="blog-profile-image">
                      <img
                        src={profile}
                        alt="Profile"
                        className="blog-profile-pic"
                      />
                    </div>
                    <div className="blog-user-info">
                      <div className="blog-username">
                        {post.author}{" "}
                        <span className="blog-timestamp">{post.timestamp}</span>
                      </div>
                      <div className="blog-affiliation">{post.affiliation}</div>
                    </div>
                  </div>
                  <div className="blog-options">
                    <img src={threeDot} alt="Options" />
                  </div>
                </div>

                <div className="blog-media">
                  {check.includes("youtu") ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={getYouTubeEmbedUrl(check)}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      ref={videoRef}
                      src={check}
                      style={{ maxWidth: "100%" }}
                      controls
                    />
                  )}
                  <div className="blog-media-controls">
                    <div className="blog-progress-bar"></div>
                    <div className="blog-controls-all-btn">
                      <div className="blog-media-controls-left">
                        <img
                          className="blog-control-btn"
                          src={leftForward}
                          alt="Backward"
                          onClick={handleBackward}
                        />
                        <img
                          className="blog-control-btn"
                          src={pause}
                          alt="Play/Pause"
                          onClick={handlePlayPause}
                        />
                        <img
                          className="blog-control-btn"
                          src={rightForward}
                          alt="Forward"
                          onClick={handleForward}
                        />
                      </div>
                      <div className="blog-media-controls-right">
                        <img src={cc} alt="CC" className="blog-control-btn" />
                        <img
                          src={expand}
                          className="blog-control-btn"
                          alt="Expand"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-title-section">
                  <div className="blog-heading-section">
                    <h2 className="blog-title">{post.title}</h2>
                    <div className="blog-author">{post.author}</div>
                  </div>
                  <div className="blog-text-body">
                    <p className="blog-content">{post.content.slice(0, 200)}</p>
                    <p className="blog-content">{post.content.slice(200)}</p>
                    <div className="blog-interaction">
                      <div className="blog-likes">{post.likes} Likes</div>
                      <div className="blog-icons">
                        <img className="blog-icon-share" src={Share} alt="" />
                        <img className="blog-icon" src={Comment} alt="" />
                        <img className="blog-icon" src={Like} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateBlog && (
          <div className="blog-create-content">
            <div className="blog-create-section-wrapper">
              <header className="blog-create-header">
                <img
                  onClick={() => {
                    setShowCreateBlog(false);
                    setShowDefaultBlog(true);
                  }}
                  className="blog-create-backIcon"
                  src={backIcon}
                  alt=""
                />
                <h1 className="blog-create-header-heading">Create Blog</h1>
              </header>
            </div>
            <div className="blog-create-section-wrapper">
              <section className="blog-create-form">
                <div className="blog-create-input-group">
                  <label htmlFor="headline" className="blog-create-label">
                    Headline
                  </label>
                  <input
                    type="text"
                    id="headline"
                    className="blog-create-input"
                    disabled
                  />
                </div>
                <div className="blog-create-input-group">
                  <label htmlFor="written-by" className="blog-create-label">
                    Written by
                  </label>
                  <input
                    type="text"
                    id="written-by"
                    className="blog-create-input"
                    disabled
                  />
                </div>
                <div className="blog-create-input-group">
                  <label htmlFor="about" className="blog-create-label">
                    About
                  </label>
                  <textarea
                    id="about"
                    className="blog-create-textarea"
                    disabled
                  ></textarea>
                </div>
              </section>
            </div>
            <div className="blog-create-section-wrapper">
              <section className="blog-create-media-upload">
                <div className="blog-create-media-container">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="blog-create-media-input"
                    style={{ display: "none" }}
                    disabled
                  />
                  <button
                    className="blog-create-upload-button"
                    disabled
                  >
                    Upload media
                  </button>
                  <p className="blog-create-instructional-text">
                    Add media to make your blog more attractive & relative.
                  </p>
                </div>
              </section>
            </div>
            <div className="blog-create-section-wrapper">
              <footer className="blog-create-actions">
                <button
                  onClick={() => {
                    setShowCreateBlog(false);
                    setShowDefaultBlog(true);
                  }}
                  className="blog-create-upload-button-2"
                >
                  Cancel
                </button>
                <button
                  className="blog-create-upload-button-2"
                  disabled
                >
                  Upload
                </button>
              </footer>
            </div>
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
                  navigate(`/blogcreate/${userId}`); // Navigate to blogcreate with userId
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
                      <div className="desktop-blog-sidebar-blogs-name">
                        {blog.name}
                      </div>
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
              {posts.map((post, index) => (
                <div key={index} className="desktop-blog-post">
                  <div className="desktop-blog-header">
                    <div className="desktop-blog-profile">
                      <div className="desktop-blog-profile-image">
                        <img
                          src={profile}
                          alt="Profile"
                          className="desktop-blog-profile-pic"
                        />
                      </div>
                      <div className="desktop-blog-user-info">
                        <div className="desktop-blog-username">
                          {post.author}{" "}
                          <span className="desktop-blog-timestamp">
                            {post.timestamp}
                          </span>
                        </div>
                        <div className="desktop-blog-affiliation">
                          {post.affiliation}
                        </div>
                      </div>
                    </div>
                    <div className="desktop-blog-options">
                      <img src={threeDot} alt="Options" />
                    </div>
                  </div>

                  <div className="desktop-blog-media">
                    {check.includes("youtu") ? (
                      <iframe
                        width="100%"
                        height="315"
                        src={getYouTubeEmbedUrl(check)}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video
                        ref={videoRef}
                        src={check}
                        style={{ maxWidth: "100%" }}
                        controls
                      />
                    )}
                    <div className="desktop-blog-media-controls">
                      <div className="desktop-blog-progress-bar"></div>
                      <div className="desktop-blog-controls-all-btn">
                        <div className="desktop-blog-media-controls-left">
                          <img
                            className="desktop-blog-control-btn"
                            src={leftForward}
                            alt="Backward"
                            onClick={handleBackward}
                          />
                          <img
                            className="desktop-blog-control-btn"
                            src={pause}
                            alt="Play/Pause"
                            onClick={handlePlayPause}
                          />
                          <img
                            className="desktop-blog-control-btn"
                            src={rightForward}
                            alt="Forward"
                            onClick={handleForward}
                          />
                        </div>
                        <div className="desktop-blog-media-controls-right">
                          <img
                            src={cc}
                            alt="CC"
                            className="desktop-blog-control-btn"
                          />
                          <img
                            src={expand}
                            className="desktop-blog-control-btn"
                            alt="Expand"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="desktop-blog-title-section">
                    <div className="desktop-blog-heading-section">
                      <h2 className="desktop-blog-title">{post.title}</h2>
                      <div className="desktop-blog-author">{post.author}</div>
                    </div>
                    <div className="desktop-blog-text-body">
                      <p className="desktop-blog-content">
                        {post.content.slice(0, 200)}
                      </p>
                      <p className="desktop-blog-content">
                        {post.content.slice(200)}
                      </p>
                      <div className="desktop-blog-interaction">
                        <div className="desktop-blog-likes">
                          {post.likes} Likes
                        </div>
                        <div className="desktop-blog-icons">
                          <img
                            className="desktop-blog-icon-share"
                            src={Share}
                            alt=""
                          />
                          <img
                            className="desktop-blog-icon"
                            src={Comment}
                            alt=""
                          />
                          <img
                            className="desktop-blog-icon"
                            src={Like}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;