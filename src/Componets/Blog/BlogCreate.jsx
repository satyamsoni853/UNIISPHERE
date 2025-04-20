import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backIcon from "./backsvg.svg";
import "./BlogCreate.css";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import { IoIosArrowDown } from "react-icons/io";

const BlogCreate = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // State for form inputs
  const [headline, setHeadline] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

      // Create new blog (POST)
      console.log("POST /api/blog/create request:", {
        headline,
        writtenBy,
        about,
        file: file ? file.name : null,
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
      console.error("POST /api/blog error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to save blog");
    } finally {
      setLoading(false);
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