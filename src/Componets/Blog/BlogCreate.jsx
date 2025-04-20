import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import backIcon from "./backsvg.svg";
import "./BlogCreate.css";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import { IoIosArrowDown } from "react-icons/io";

const BlogCreate = () => {
  const navigate = useNavigate();
  const titlePhotoRef = useRef(null);

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [contentVideo, setContentVideo] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [titlePhoto, setTitlePhoto] = useState(null);
  const [titlePhotoUrl, setTitlePhotoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Validate form inputs based on schema
  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    else if (title.length > 255) errors.title = "Title must be 255 characters or less";
    if (!content.trim()) errors.content = "Content is required";
    if (titlePhoto) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(titlePhoto.type)) {
        errors.titlePhoto = "Title photo must be a JPEG or PNG";
      }
      if (titlePhoto.size > 2 * 1024 * 1024) {
        errors.titlePhoto = "Title photo must be less than 2MB";
      }
    }
    if (tags.trim()) {
      const tagArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
      if (tagArray.some((tag) => !tag)) {
        errors.tags = "Tags must be non-empty strings";
      }
    }
    if (contentVideo.trim()) {
      const videoArray = contentVideo.split(",").map((url) => url.trim()).filter((url) => url);
      if (videoArray.some((url) => !isValidUrl(url))) {
        errors.contentVideo = "Content videos must be valid URLs";
      }
    }
    if (mediaUrl.trim()) {
      const mediaArray = mediaUrl.split(",").map((url) => url.trim()).filter((url) => url);
      if (mediaArray.some((url) => !isValidUrl(url))) {
        errors.mediaUrl = "Media URLs must be valid URLs";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Helper to validate URLs
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle title photo selection
  const handleTitlePhotoChange = (event) => {
    if (titlePhotoUrl) URL.revokeObjectURL(titlePhotoUrl);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const newObjectUrl = URL.createObjectURL(selectedFile);
      setTitlePhoto(selectedFile);
      setTitlePhotoUrl(newObjectUrl);
    } else {
      setTitlePhoto(null);
      setTitlePhotoUrl(null);
    }
  };

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (titlePhotoUrl) URL.revokeObjectURL(titlePhotoUrl);
    };
  }, [titlePhotoUrl]);

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
      if (!authToken) {
        navigate("/login");
        throw new Error("Authentication token not found");
      }

      // Decode JWT to get userId (authorId)
      let userId;
      try {
        const decodedToken = jwtDecode(authToken);
        userId = decodedToken.id || decodedToken.sub || decodedToken.userId;
        if (!userId) throw new Error("User ID not found in token");
        console.log("Extracted userId (authorId):", userId);
      } catch (err) {
        navigate("/login");
        throw new Error("Failed to decode token: " + err.message);
      }

      const formData = new FormData();
      formData.append("title", title);
      if (description.trim()) formData.append("description", description);
      formData.append("content", content);
      formData.append("authorId", userId);
      if (tags.trim()) {
        const tagArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
        formData.append("tags", JSON.stringify(tagArray));
      }
      if (contentVideo.trim()) {
        const videoArray = contentVideo.split(",").map((url) => url.trim()).filter((url) => url);
        formData.append("contentVideo", JSON.stringify(videoArray));
      }
      if (mediaUrl.trim()) {
        const mediaArray = mediaUrl.split(",").map((url) => url.trim()).filter((url) => url);
        formData.append("mediaUrl", JSON.stringify(mediaArray));
      }
      formData.append("published", published);
      if (titlePhoto) formData.append("titlePhoto", titlePhoto);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Create new blog (POST)
      console.log("POST /api/blog/create request:", {
        title,
        description,
        content,
        authorId: userId,
        tags: tags ? tags.split(",").map((tag) => tag.trim()).filter((tag) => tag) : [],
        contentVideo: contentVideo ? contentVideo.split(",").map((url) => url.trim()).filter((url) => url) : [],
        mediaUrl: mediaUrl ? mediaUrl.split(",").map((url) => url.trim()).filter((url) => url) : [],
        published,
        titlePhoto: titlePhoto ? titlePhoto.name : null,
      });
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/api/blog/create",
        formData,
        config
      );
      console.log("POST /api/blog/create response:", response.data);

      // Reset form and navigate back
      resetForm();
      navigate(-1);
    } catch (err) {
      console.error("POST /api/blog error:", {
        message: err.message,
        response: err.response?.data,
      });
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to save blog"
      );
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
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
    setContentVideo("");
    setMediaUrl("");
    setPublished(false);
    setTitlePhoto(null);
    if (titlePhotoUrl) URL.revokeObjectURL(titlePhotoUrl);
    setTitlePhotoUrl(null);
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
                    Title <span className="required">*</span>
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
                    Content <span className="required">*</span>
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
                    htmlFor="contentVideo"
                    className="desktop-blog-create-label"
                  >
                    Content Videos (Optional, comma-separated URLs)
                  </label>
                  <input
                    type="text"
                    id="contentVideo"
                    className="desktop-blog-create-input"
                    value={contentVideo}
                    onChange={(e) => setContentVideo(e.target.value)}
                    placeholder="e.g., https://example.com/video1, https://example.com/video2"
                  />
                  {validationErrors.contentVideo && (
                    <p className="error-message">{validationErrors.contentVideo}</p>
                  )}
                </div>
                <div className="desktop-blog-create-input-group">
                  <label
                    htmlFor="mediaUrl"
                    className="desktop-blog-create-label"
                  >
                    Media URLs (Optional, comma-separated)
                  </label>
                  <input
                    type="text"
                    id="mediaUrl"
                    className="desktop-blog-create-input"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="e.g., https://example.com/image1, https://example.com/image2"
                  />
                  {validationErrors.mediaUrl && (
                    <p className="error-message">{validationErrors.mediaUrl}</p>
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
                    ref={titlePhotoRef}
                    onChange={handleTitlePhotoChange}
                  />
                  <button
                    onClick={() => titlePhotoRef.current.click()}
                    className="desktop-blog-create-upload-button"
                  >
                    Upload Title Photo
                  </button>
                  <p className="desktop-blog-create-instructional-text">
                    {titlePhotoUrl
                      ? "File selected"
                      : "Add a JPEG or PNG to make your blog more attractive."}
                  </p>
                  {validationErrors.titlePhoto && (
                    <p className="error-message">{validationErrors.titlePhoto}</p>
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
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="desktop-blog-create-upload-button-2"
                  disabled={loading || !title.trim() || !content.trim()}
                >
                  {loading ? "Creating..." : "Create"}
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