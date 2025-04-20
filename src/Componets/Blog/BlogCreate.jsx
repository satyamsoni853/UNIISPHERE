import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Reintroduced for userId extraction
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import backIcon from "./backsvg.svg";
import "./BlogCreate.css";

const BlogCreate = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [file, setFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Validate form inputs based on schema
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!content.trim()) errors.content = "Content is required";
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        errors.file = "Title photo must be a JPEG or PNG";
      }
      if (file.size > 2 * 1024 * 1024) {
        errors.file = "Title photo must be less than 2MB";
      }
    }
    if (tags.trim()) {
      const tagArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
      if (tagArray.some((tag) => !tag)) {
        errors.tags = "Tags must be non-empty strings";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  // Create new blog post (POST request)
  const handleSubmit = async () => {
    // Perform client-side validation
    if (!validateForm()) {
      console.log("Client-side validation errors:", validationErrors);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication token not found");

      // Decode JWT to get userId (authorId)
      let userId;
      try {
        const decodedToken = jwtDecode(authToken);
        userId = decodedToken.id || decodedToken.sub || decodedToken.userId;
        if (!userId) throw new Error("User ID not found in token");
      } catch (err) {
        throw new Error("Failed to decode token: " + err.message);
      }

      // Create blog data directly (without FormData)
      const blogData = {
        title: title.trim(),
        content: content.trim(),
        authorId: userId,
        published: published
      };

      if (description.trim()) {
        blogData.description = description.trim();
      }
      
      if (tags.trim()) {
        blogData.tags = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      }

      // If there's a file, use FormData
      if (file) {
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('content', blogData.content);
        formData.append('authorId', blogData.authorId);
        formData.append('published', blogData.published);
        if (blogData.description) formData.append('description', blogData.description);
        if (blogData.tags) formData.append('tags', JSON.stringify(blogData.tags));
        formData.append('titlePhoto', file);

        const response = await axios.post(
          "https://uniisphere-1.onrender.com/api/blog/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Blog created successfully:", response.data);
      } else {
        // If no file, send JSON directly
        const response = await axios.post(
          "https://uniisphere-1.onrender.com/api/blog/create",
          blogData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Blog created successfully:", response.data);
      }

      resetForm();
      navigate(-1);

    } catch (err) {
      console.error("POST /api/blog error:", err);
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        setError(`Validation errors: ${errorMessages.join(', ')}`);
      } else {
        setError(err.response?.data?.message || "Failed to save blog");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setTags("");
    setPublished(false);
    setFile(null);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setValidationErrors({});
  };

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
                  Create Blog
                </h1>
              </header>
            </div>
            <div className="desktop-blog-create-section-wrapper">
              <section className="desktop-blog-create-form">
                <div className="desktop-blog-create-input-group">
                  <label htmlFor="title" className="desktop-blog-create-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="desktop-blog-create-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {validationErrors.title && (
                    <p className="error-message">{validationErrors.title}</p>
                  )}
                </div>
                <div className="desktop-blog-create-input-group">
                  <label
                    htmlFor="description"
                    className="desktop-blog-create-label"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    className="desktop-blog-create-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {validationErrors.description && (
                    <p className="error-message">{validationErrors.description}</p>
                  )}
                </div>
                <div className="desktop-blog-create-input-group">
                  <label
                    htmlFor="content"
                    className="desktop-blog-create-label"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    className="desktop-blog-create-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  {validationErrors.content && (
                    <p className="error-message">{validationErrors.content}</p>
                  )}
                </div>
                <div className="desktop-blog-create-input-group">
                  <label htmlFor="tags" className="desktop-blog-create-label">
                    Tags (Optional, comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    className="desktop-blog-create-input"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., tech, news, tutorial"
                  />
                  {validationErrors.tags && (
                    <p className="error-message">{validationErrors.tags}</p>
                  )}
                </div>
                <div className="desktop-blog-create-input-group">
                  <label
                    htmlFor="published"
                    className="desktop-blog-create-label"
                  >
                    Published
                  </label>
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  {validationErrors.published && (
                    <p className="error-message">{validationErrors.published}</p>
                  )}
                </div>
              </section>
            </div>
            <div className="desktop-blog-create-section-wrapper">
              <section className="desktop-blog-create-media-upload">
                <div className="desktop-blog-create-media-container">
                  <label
                    htmlFor="titlePhoto"
                    className="desktop-blog-create-label"
                  >
                    Title Photo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="desktop-blog-create-media-input"
                    style={{ display: "none" }}
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={() => inputRef.current.click()}
                    className="desktop-blog-create-upload-button"
                  >
                    Upload Title Photo
                  </button>
                  <p className="desktop-blog-create-instructional-text">
                    {objectUrl
                      ? "File selected"
                      : "Add a JPEG or PNG to make your blog more attractive."}
                  </p>
                  {validationErrors.file && (
                    <p className="error-message">{validationErrors.file}</p>
                  )}
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
                  Create
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