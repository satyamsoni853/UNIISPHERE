import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import MobileFooter from "../MobileFooter/MobileFooter";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import DesktopRightsection from "../DesktopRight/DesktopRight";

const Blog = () => {
  const { userId } = useParams(); // Extract userId from URL
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const check = "https://youtu.be/oolJWcOhHCw?si=2I7a2i3PAeTiOoxT"; // YouTube URL for dummy data

  // State for mobile section
  const [showDefaultBlog, setShowDefaultBlog] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  // State for desktop section
  const [showDesktopDefaultSection, setShowDesktopDefaultSection] = useState(true);
  const [showDesktopCreateBlog, setShowDesktopCreateBlog] = useState(false);

  // State for blog data
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useDummyData, setUseDummyData] = useState(false);

  // State for form inputs
  const [headline, setHeadline] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  // State for editing
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Static dummy posts for main blog section (fallback)
  const posts = [
    {
      id: "dummy-1",
      author: "Vijay Prasad",
      affiliation: "University of Delhi...",
      timestamp: "18h",
      title: "Again the notice",
      content:
        "Vijay Prashad Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.",
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
    {
      name: "Sakshi Soni",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Vijay Sharma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Arjun Singh",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Juhi Sharma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Vijay Sharma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Arjun Verma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
  ];

  // Fetch blogs for the user
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        setUseDummyData(false);

        const authToken = localStorage.getItem("authToken");
        console.log("GET /api/blog/:id response Token:",authToken); // Log API response
        if (!authToken) throw new Error("Authentication token not found");

        const response = await axios.get(
          `https://uniisphere-1.onrender.com/api/blog/${userId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        console.log("GET /api/blog/:id response:", response.data); // Log API response

        const data = Array.isArray(response.data) ? response.data : [];
        setBlogs(data);

        if (data.length > 0) {
          window.alert("Blog data loaded successfully!");
        } else {
          window.alert("No blog data found. Showing dummy data.");
          setUseDummyData(true);
        }
      } catch (err) {
        console.error("GET /api/blog/:id error:", err.response?.data || err.message); // Log API error
        setError(err.response?.data?.message || "Failed to fetch blogs");
        window.alert("Failed to load blog data. Showing dummy data.");
        setUseDummyData(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [userId]);

  // Handle file selection
  const handleFileChange = (event) => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const newObjectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setObjectUrl(newObjectUrl);
    } else {
      setFile(null);
      setObjectUrl(null);
    }
  };

  // Create or update blog post
  const handleSubmit = async () => {
    try {
      setError(null);
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token not found");

      const formData = new FormData();
      formData.append("headline", headline);
      formData.append("writtenBy", writtenBy);
      formData.append("about", about);
      if (file) formData.append("media", file);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      let response;
      if (editingBlogId) {
        // Update existing blog
        response = await axios.put(
          `https://uniisphere-1.onrender.com/api/blog/${editingBlogId}`,
          formData,
          config
        );
        console.log("PUT /api/blog/:id response:", response.data); // Log API response
        setBlogs(blogs.map((blog) =>
          blog.id === editingBlogId ? response.data : blog
        ));
      } else {
        // Create new blog
        response = await axios.post(
          "https://uniisphere-1.onrender.com/api/blog/create",
          formData,
          config
        );
        console.log("POST /api/blog/create response:", response.data); // Log API response
        setBlogs([...blogs, response.data]);
        setUseDummyData(false); // Switch to real data after successful creation
      }

      // Reset form
      resetForm();
      setShowCreateBlog(false);
      setShowDesktopCreateBlog(false);
      setShowDefaultBlog(true);
      setShowDesktopDefaultSection(true);
    } catch (err) {
      console.error("POST/PUT /api/blog error:", err.response?.data || err.message); // Log API error
      setError(err.response?.data?.message || "Failed to save blog");
    }
  };

  // Delete blog post
  const handleDelete = async (blogId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token not found");

      const response = await axios.delete(
        `https://uniisphere-1.onrender.com/api/blog/${blogId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log("DELETE /api/blog/:id response:", response.data); // Log API response
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      if (blogs.length === 1) {
        window.alert("No blog data left. Showing dummy data.");
        setUseDummyData(true);
      }
    } catch (err) {
      console.error("DELETE /api/blog/:id error:", err.response?.data || err.message); // Log API error
      setError(err.response?.data?.message || "Failed to delete blog");
    }
  };

  // Edit blog post
  const handleEdit = (blog) => {
    setEditingBlogId(blog.id);
    setHeadline(blog.headline || blog.title);
    setWrittenBy(blog.writtenBy || blog.author);
    setAbout(blog.about || blog.content);
    setFile(null);
    setObjectUrl(blog.mediaUrl || null);
    setShowCreateBlog(true);
    setShowDesktopCreateBlog(true);
    setShowDefaultBlog(false);
    setShowDesktopDefaultSection(false);
  };

  // Reset form
  const resetForm = () => {
    setHeadline("");
    setWrittenBy("");
    setAbout("");
    setFile(null);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setEditingBlogId(null);
  };

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

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  // Function to extract YouTube video ID (only for dummy data)
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Determine which data to display
  const displayPosts = useDummyData ? posts : blogs;

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
                  setShowCreateBlog(true);
                  setShowDefaultBlog(false);
                }}
                className="blog-create-btn"
              >
                + CREATE
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              displayPosts.map((post, index) => (
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
                          {post.writtenBy || post.author}{" "}
                          <span className="blog-timestamp">{post.timestamp}</span>
                        </div>
                        <div className="blog-affiliation">{post.affiliation || "User"}</div>
                      </div>
                    </div>
                    <div className="blog-options">
                      {!useDummyData ? (
                        <>
                          <img
                            src={threeDot}
                            alt="Options"
                            onClick={() => {
                              const confirmEdit = window.confirm("Edit this blog?");
                              if (confirmEdit) handleEdit(post);
                            }}
                          />
                          <img
                            src={threeDot}
                            alt="Delete"
                            onClick={() => {
                              const confirmDelete = window.confirm("Delete this blog?");
                              if (confirmDelete) handleDelete(post.id);
                            }}
                          />
                        </>
                      ) : (
                        <img src={threeDot} alt="" />
                      )}
                    </div>
                  </div>

                  <div className="blog-media">
                    {objectUrl && file ? (
                      file.type.startsWith("image/") ? (
                        <img
                          src={objectUrl}
                          alt="Selected image"
                          style={{ maxWidth: "100%" }}
                        />
                      ) : file.type.startsWith("video/") ? (
                        <video
                          ref={videoRef}
                          src={objectUrl}
                          style={{ maxWidth: "100%" }}
                          controls
                        />
                      ) : (
                        <p>Unsupported file type</p>
                      )
                    ) : useDummyData ? (
                      check.includes("youtu") ? (
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
                      )
                    ) : post.mediaUrl ? (
                      post.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                        <img
                          src={post.mediaUrl}
                          alt="Blog media"
                          style={{ maxWidth: "100%" }}
                        />
                      ) : (
                        <video
                          ref={videoRef}
                          src={post.mediaUrl}
                          style={{ maxWidth: "100%" }}
                          controls
                        />
                      )
                    ) : (
                      <p>No media available</p>
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
                      <h2 className="blog-title">{post.headline || post.title}</h2>
                      <div className="blog-author">{post.writtenBy || post.author}</div>
                    </div>
                    <div className="blog-text-body">
                      <p className="blog-content">{(post.about || post.content).slice(0, 200)}</p>
                      <p className="blog-content">{(post.about || post.content).slice(200)}</p>
                      <div className="blog-interaction">
                        <div className="blog-likes">{post.likes || 0} Likes</div>
                        <div className="blog-icons">
                          <img className="blog-icon-share" src={Share} alt="" />
                          <img className="blog-icon" src={Comment} alt="" />
                          <img className="blog-icon" src={Like} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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
                    resetForm();
                  }}
                  className="blog-create-backIcon"
                  src={backIcon}
                  alt=""
                />
                <h1 className="blog-create-header-heading">
                  {editingBlogId ? "Edit Blog" : "Create Blog"}
                </h1>
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
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
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
                    value={writtenBy}
                    onChange={(e) => setWrittenBy(e.target.value)}
                  />
                </div>
                <div className="blog-create-input-group">
                  <label htmlFor="about" className="blog-create-label">
                    About
                  </label>
                  <textarea
                    id="about"
                    className="blog-create-textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
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
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={() => inputRef.current.click()}
                    className="blog-create-upload-button"
                  >
                    Upload media
                  </button>
                  <p className="blog-create-instructional-text">
                    {objectUrl
                      ? "File selected"
                      : "Add media to make your blog more attractive & relative."}
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
                    resetForm();
                  }}
                  className="blog-create-upload-button-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="blog-create-upload-button-2"
                  disabled={loading}
                >
                  {editingBlogId ? "Update" : "Upload"}
                </button>
              </footer>
              {error && <p className="error-message">{error}</p>}
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
                  setShowDesktopCreateBlog(true);
                  setShowDesktopDefaultSection(false);
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
              {loading ? (
                <p>Loading...</p>
              ) : (
                displayPosts.map((post, index) => (
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
                            {post.writtenBy || post.author}{" "}
                            <span className="desktop-blog-timestamp">
                              {post.timestamp}
                            </span>
                          </div>
                          <div className="desktop-blog-affiliation">
                            {post.affiliation || "User"}
                          </div>
                        </div>
                      </div>
                      <div className="desktop-blog-options">
                        {!useDummyData ? (
                          <>
                            <img
                              src={threeDot}
                              alt="Edit"
                              onClick={() => {
                                const confirmEdit = window.confirm("Edit this blog?");
                                if (confirmEdit) handleEdit(post);
                              }}
                            />
                            <img
                              src={threeDot}
                              alt="Delete"
                              onClick={() => {
                                const confirmDelete = window.confirm("Delete this blog?");
                                if (confirmDelete) handleDelete(post.id);
                              }}
                            />
                          </>
                        ) : (
                          <img src={threeDot} alt="" />
                        )}
                      </div>
                    </div>

                    <div className="desktop-blog-media">
                      {objectUrl && file ? (
                        file.type.startsWith("image/") ? (
                          <img
                            src={objectUrl}
                            alt="Selected image"
                            style={{ maxWidth: "100%" }}
                          />
                        ) : file.type.startsWith("video/") ? (
                          <video
                            ref={videoRef}
                            src={objectUrl}
                            style={{ maxWidth: "100%" }}
                            controls
                          />
                        ) : (
                          <p>Unsupported file type</p>
                        )
                      ) : useDummyData ? (
                        check.includes("youtu") ? (
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
                        )
                      ) : post.mediaUrl ? (
                        post.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                          <img
                            src={post.mediaUrl}
                            alt="Blog media"
                            style={{ maxWidth: "100%" }}
                          />
                        ) : (
                          <video
                            ref={videoRef}
                            src={post.mediaUrl}
                            style={{ maxWidth: "100%" }}
                            controls
                          />
                        )
                      ) : (
                        <p>No media available</p>
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
                        <h2 className="desktop-blog-title">{post.headline || post.title}</h2>
                        <div className="desktop-blog-author">{post.writtenBy || post.author}</div>
                      </div>
                      <div className="desktop-blog-text-body">
                        <p className="desktop-blog-content">{(post.about || post.content).slice(0, 200)}</p>
                        <p className="desktop-blog-content">{(post.about || post.content).slice(200)}</p>
                        <div className="desktop-blog-interaction">
                          <div className="desktop-blog-likes">{post.likes || 0} Likes</div>
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
                ))
              )}
            </div>
          )}

          {showDesktopCreateBlog && (
            <div className="desktop-blog-create-content-parent">
              <div className="desktop-blog-create-content">
                <div className="desktop-blog-create-section-wrapper">
                  <header className="desktop-blog-create-header">
                    <img
                      className="desktop-blog-create-backIcon"
                      src={backIcon}
                      alt=""
                      onClick={() => {
                        setShowDesktopCreateBlog(false);
                        setShowDesktopDefaultSection(true);
                        resetForm();
                      }}
                    />
                    <h1 className="desktop-blog-create-header-heading">
                      {editingBlogId ? "Edit Blog" : "Create Blog"}
                    </h1>
                  </header>
                </div>
                <div className="desktop-blog-create-section-wrapper">
                  <section className="desktop-blog-create-form">
                    <div className="desktop-blog-create-input-group">
                      <label
                        htmlFor="headline"
                        className="desktop-blog-create-label"
                      >
                        Headline
                      </label>
                      <input
                        type="text"
                        id="headline"
                        className="desktop-blog-create-input"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                      />
                    </div>
                    <div className="desktop-blog-create-input-group">
                      <label
                        htmlFor="written-by"
                        className="desktop-blog-create-label"
                      >
                        Written by
                      </label>
                      <input
                        type="text"
                        id="written-by"
                        className="desktop-blog-create-input"
                        value={writtenBy}
                        onChange={(e) => setWrittenBy(e.target.value)}
                      />
                    </div>
                    <div className="desktop-blog-create-input-group">
                      <label
                        htmlFor="about"
                        className="desktop-blog-create-label"
                      >
                        About
                      </label>
                      <textarea
                        id="about"
                        className="desktop-blog-create-textarea"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      ></textarea>
                    </div>
                  </section>
                </div>
                <div className="desktop-blog-create-section-wrapper">
                  <section className="desktop-blog-create-media-upload">
                    <div className="desktop-blog-create-media-container">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="desktop-blog-create-media-input"
                        style={{ display: "none" }}
                        ref={inputRef}
                        onChange={handleFileChange}
                      />
                      <button
                        onClick={() => inputRef.current.click()}
                        className="desktop-blog-create-upload-button"
                      >
                        Upload media
                      </button>
                      <p className="desktop-blog-create-instructional-text">
                        {objectUrl
                          ? "File selected"
                          : "Add media to make your blog more attractive & relative."}
                      </p>
                    </div>
                  </section>
                </div>
                <div className="desktop-blog-create-section-wrapper">
                  <footer className="desktop-blog-create-actions">
                    <button
                      onClick={() => {
                        setShowDesktopCreateBlog(false);
                        setShowDesktopDefaultSection(true);
                        resetForm();
                      }}
                      className="desktop-blog-create-upload-button-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="desktop-blog-create-upload-button-2"
                      disabled={loading}
                    >
                      {editingBlogId ? "Update" : "Upload"}
                    </button>
                  </footer>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
              <div className="desktop-right-section-fixed">
                <DesktopRightsection />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;