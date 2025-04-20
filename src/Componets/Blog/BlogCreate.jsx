import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Named import for jwt-decode
import backIcon from "./backsvg.svg";
import "./BlogCreate.css";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import profile from "./profile.jpg";
import { IoIosArrowDown } from "react-icons/io";

const BlogCreate = () => {
  const navigate = useNavigate();
  const { userid } = useParams(); // Extract userid from URL if present (e.g., /user/:userid)
  const inputRef = useRef(null);

  // State for form inputs
  const [headline, setHeadline] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  // State for blog data
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);

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

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  // Fetch blogs (GET request)
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const authToken = localStorage.getItem("authToken");
      console.log("GET /api/blog/:id request Token:", authToken);
      if (!authToken) throw new Error("Authentication token not found");

      // Decode JWT token to get userid
      let userIdFromToken;
      try {
        const decodedToken = jwtDecode(authToken);
        userIdFromToken = decodedToken.id || decodedToken.sub || decodedToken.userId; // Adjust based on token structure
        console.log("Extracted userId from token:", userIdFromToken);
      } catch (err) {
        console.warn("Failed to decode token:", err.message);
      }

      // Use userid from URL (if available) or token
      const userId = userid || userIdFromToken;
      console.log("Using userId for GET request:", userId);

      if (!userId) {
        throw new Error("No userId available for GET request");
      }

      // Make API request to https://uniisphere-1.onrender.com/api/blog/:id
      const response = await axios.get(
        `https://uniisphere-1.onrender.com/api/blog/${userId}`, // Using userId as :id
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      // Log the full API response
      console.log("GET /api/blog/:id full response:", {
        data: response.data,
        status: response.status,
        headers: response.headers,
      });
      console.log("GET /api/blog/:id data:", response.data);

      // Extract userid from response if available
      const responseUserId = response.data.userId || response.data.user?.id; // Adjust based on API response structure
      if (responseUserId) {
        console.log("Extracted userId from API response:", responseUserId);
      }

      // Handle response data (array or single object)
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setBlogs(data);
    } catch (err) {
      console.error(
        "GET /api/blog/:id error:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  // Create or update blog post (POST or PUT request)
  const handleSubmit = async () => {
    try {
      setError(null);
      setLoading(true);
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
        // Update existing blog (PUT)
        console.log("PUT /api/blog/:id request:", {
          blogId: editingBlogId,
          headline,
          writtenBy,
          about,
          file: file ? file.name : null,
        });
        response = await axios.put(
          `https://uniisphere-1.onrender.com/api/blog/${editingBlogId}`,
          formData,
          config
        );
        console.log("PUT /api/blog/:id response:", response.data);
        setBlogs(
          blogs.map((blog) =>
            blog.id === editingBlogId ? response.data : blog
          )
        );
      } else {
        // Create new blog (POST)
        console.log("POST /api/blog/create request:", {
          headline,
          writtenBy,
          about,
          file: file ? file.name : null,
        });
        response = await axios.post(
          "https://uniisphere-1.onrender.com/api/blog/create",
          formData,
          config
        );
        console.log("POST /api/blog/create response:", response.data);
        setBlogs([...blogs, response.data]);
      }

      // Reset form and navigate back
      resetForm();
      navigate(-1);
    } catch (err) {
      console.error(
        `${editingBlogId ? "PUT" : "POST"} /api/blog error:`,
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog post (DELETE request)
  const handleDelete = async (blogId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token not found");

      console.log("DELETE /api/blog/:id request:", { blogId });
      const response = await axios.delete(
        `https://uniisphere-1.onrender.com/api/blog/${blogId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log("DELETE /api/blog/:id response:", response.data);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      console.error(
        "DELETE /api/blog/:id error:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to delete blog");
    }
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

  // Edit blog post (populate form with existing data)
  const handleEdit = (blog) => {
    setEditingBlogId(blog.id);
    setHeadline(blog.headline);
    setWrittenBy(blog.writtenBy);
    setAbout(blog.about);
    setFile(null);
    setObjectUrl(blog.mediaUrl || null);
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
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
            <Link to="/createblog">
              <button className="desktop-blog-create-btn">+ CREATE</button>
            </Link>
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
        <div className="desktop-blog-create-content-parent">
          <div className="desktop-blog-create-content">
            <div className="desktop-blog-create-section-wrapper">
              <header className="desktop-blog-create-header">
                <img
                  onClick={() => navigate(-1)}
                  className="desktop-blog-create-backIcon"
                  src={backIcon}
                  alt=""
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
                  <label htmlFor="about" className="desktop-blog-create-label">
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
                    resetForm();
                    navigate(-1);
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
                  {editingBlogId ? "Update" : "Create"}
                </button>
              </footer>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
          <div className="desktop-right-section-fixed">
            <DesktopRightsection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;