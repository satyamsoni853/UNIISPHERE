import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Reintroduced for userId extraction
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbar/DesktopNavbar";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import backIcon from "./backsvg.svg";
import "./BlogCreate.css";
import MobileFooter from "../Mobilefooter/MobileFooter";
import MobileNavbarr from "../MobileNavbarr/MobileNavbarr";
import profile from "./profile.jpg";


const BlogCreate = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [showDesktopCreateBlog, setShowDesktopCreateBlog] = useState(true);
  const [showDesktopUpdateBlog, setShowDesktopUpdateBlog] = useState(false);
  const [showCreateBlog, setShowCreateBlog] = useState(true);
  const [showUploadBlog, setShowUploadBlog] = useState(false);
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
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
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
        published: published,
      };

      if (description.trim()) {
        blogData.description = description.trim();
      }

      if (tags.trim()) {
        blogData.tags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
      }

      // If there's a file, use FormData
      if (file) {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", blogData.content);
        formData.append("authorId", blogData.authorId);
        formData.append("published", blogData.published);
        if (blogData.description)
          formData.append("description", blogData.description);
        if (blogData.tags)
          formData.append("tags", JSON.stringify(blogData.tags));
        formData.append("titlePhoto", file);

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
        const errorMessages = err.response.data.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`
        );
        setError(`Validation errors: ${errorMessages.join(", ")}`);
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
   const blogList = [
      {
        name: "Arjun Verma",
        description: "As per the rumors it is said that the elections of this year is going",
        avatar: profile,
      },
      {
        name: "Arjun Verma",
        description: "As per the rumors it is said that the elections of this year is going",
        avatar: profile,
      },
    ];
  

  return (
    <>
      <div className="desktop-blog-main-parent-container">
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
            <div className="desktop-blog-create-content-parent">
              {showDesktopCreateBlog && (
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
                        <label
                          htmlFor="title"
                          className="desktop-blog-create-label"
                        >
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
                          <p className="error-message">
                            {validationErrors.title}
                          </p>
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
                          <p className="error-message">
                            {validationErrors.description}
                          </p>
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
                          <p className="error-message">
                            {validationErrors.content}
                          </p>
                        )}
                      </div>
                      <div className="desktop-blog-create-input-group">
                        <label
                          htmlFor="tags"
                          className="desktop-blog-create-label"
                        >
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
                          <p className="error-message">
                            {validationErrors.tags}
                          </p>
                        )}
                      </div>
                      <div className="desktop-blog-create-input-group">
                        <div className="desktop-blog-create-label-and-input">
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
                        </div>
                        {validationErrors.published && (
                          <p className="error-message">
                            {validationErrors.published}
                          </p>
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
                          <p className="error-message">
                            {validationErrors.file}
                          </p>
                        )}
                      </div>
                    </section>
                  </div>
                  <div className="desktop-blog-create-section-wrapper">
                    <footer className="desktop-blog-create-actions">
                      <div className="desktop-blog-both-buttons">
                        <button
                          onClick={() => {
                            resetForm();
                            navigate(-1);
                          }}
                          className="desktop-blog-create-cancel-button"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="desktop-blog-create-button"
                          disabled={loading}
                        >
                          Create
                        </button>
                      </div>
                      <div className="desktop-blog-both-buttons">
                        <button className="desktop-blog-create-delete-button">
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            handleSubmit();
                            setShowDesktopCreateBlog(false);
                            setShowDesktopUpdateBlog(true);
                          }}
                          className="desktop-blog-create-update-button"
                          disabled={loading}
                        >
                          Update
                        </button>
                      </div>
                    </footer>
                    {error && <p className="error-message">{error}</p>}
                  </div>
                </div>
              )}
              {showDesktopUpdateBlog && (
                <div className="desktop-blog-create-content">
                  <div className="desktop-blog-create-section-wrapper">
                    <header className="desktop-blog-create-header">
                      <img
                        onClick={() => {
                          setShowDesktopCreateBlog(true);
                          setShowDesktopUpdateBlog(false);
                        }}
                        className="desktop-blog-create-backIcon"
                        src={backIcon}
                        alt=""
                      />
                      <h1 className="desktop-blog-create-header-heading">
                        Update Blog
                      </h1>
                    </header>
                  </div>
                  <div className="desktop-blog-create-section-wrapper">
                    <section className="desktop-blog-create-form">
                      <div className="desktop-blog-create-input-group">
                        <label
                          htmlFor="title"
                          className="desktop-blog-create-label"
                        >
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
                          <p className="error-message">
                            {validationErrors.title}
                          </p>
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
                          <p className="error-message">
                            {validationErrors.description}
                          </p>
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
                          <p className="error-message">
                            {validationErrors.content}
                          </p>
                        )}
                      </div>
                      <div className="desktop-blog-create-input-group">
                        <label
                          htmlFor="tags"
                          className="desktop-blog-create-label"
                        >
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
                          <p className="error-message">
                            {validationErrors.tags}
                          </p>
                        )}
                      </div>
                      <div className="desktop-blog-create-input-group">
                        <div className="desktop-blog-create-label-and-input">
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
                        </div>
                        {validationErrors.published && (
                          <p className="error-message">
                            {validationErrors.published}
                          </p>
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
                          <p className="error-message">
                            {validationErrors.file}
                          </p>
                        )}
                      </div>
                    </section>
                  </div>
                  <div className="desktop-blog-create-section-wrapper">
                    <footer className="desktop-blog-create-actions">
                      <div className="desktop-blog-both-buttons">
                        <button
                          onClick={() => {
                            resetForm();
                            navigate(-1);
                          }}
                          className="desktop-blog-create-cancel-button"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="desktop-blog-create-update-button"
                          disabled={loading}
                        >
                          Update
                        </button>
                      </div>
                    </footer>
                    {error && <p className="error-message">{error}</p>}
                  </div>
                </div>
              )}
              <div className="desktop-right-section-fixed">
                <DesktopRightsection />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-blog-create-container">
        <div className="blog-container-nav">
          <MobileNavbarr />
        </div>
        <div className="blog-container-background">
          <Background />
        </div>
        {showCreateBlog && (
          <div className="blog-create-content">
          <div className="blog-create-section-wrapper">
            <header className="blog-create-header">
              <img className="blog-create-backIcon" src={backIcon} alt="Back" />
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
                <button className="blog-create-upload-button" disabled>
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
              <div className="blog-create-both-buttons">
                <button className="blog-create-cancel-button">Cancel</button>
                <button className="blog-create-create-button" disabled>
                  Create
                </button>
              </div>
              <div className="blog-create-both-buttons">
                <button className="blog-create-delete-button">Delete</button>
                <button 
                onClick={()=>{
                  setShowUploadBlog(true)
                  setShowCreateBlog(false)
                }}
                className="blog-create-update-button" >
                  Update
                </button>
              </div>
            </footer>
          </div>
        </div>
        )}
        {showUploadBlog && (
          <div className="blog-create-content">
          <div className="blog-create-section-wrapper">
            <header className="blog-create-header">
              <img
         onClick={()=>{
          setShowCreateBlog(true)
          setShowUploadBlog(false)
         }
         }
              className="blog-create-backIcon" src={backIcon} alt="Back" />
              <h1 className="blog-create-header-heading">Update Blog</h1>
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
                <button className="blog-create-upload-button" disabled>
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
             
              <div className="blog-create-both-buttons">
                <button className="blog-create-cancel-button">Cancel</button>
                <button 
               
                className="blog-create-update-button"  >
                  Update
                </button>
              </div>
            </footer>
          </div>
        </div>
        )}
        <div className="blog-container-footer">
          <MobileFooter />
        </div>
      </div>
    </>
  );
};

export default BlogCreate;
