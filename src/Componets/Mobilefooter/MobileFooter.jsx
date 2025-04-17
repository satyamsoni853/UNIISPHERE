import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MobileFooter.css"; // Import CSS for styling

import Addicon from "./Addicon.png";
import Clendericon from "./Clendericon.png";
import Homeicon from "./Homeicon.png";
import Networkicon from "./Networkicon.png";
import Notificationicon from "./Notificationicon.png";

function MobileFooter() {
  const [showNetwork, setShowNetwork] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [showAddMore, setShowAddMore] = useState(true);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [caption, setCaption] = useState("");
  const [hideLikes, setHideLikes] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCloseUpload = () => {
    setShowUploadSection(false);
    setMediaList([]);
    setShowAddMore(true);
    setShowPostDetails(false);
    setCaption("");
    setHideLikes(false);
    setDisableComments(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newMedia = files.map((file) => ({
      mediaType: file.type.startsWith("image") ? "image" : "video",
      previewURL: URL.createObjectURL(file),
      file,
    }));
    setMediaList((prev) => [...prev, ...newMedia]);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      mediaType: file.type.startsWith("image") ? "image" : "video",
      previewURL: URL.createObjectURL(file),
      file,
    }));
    setMediaList((prev) => [...prev, ...newMedia]);
  };

  const handlePostSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for posting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleCloseUpload();
      navigate("/"); // Navigate to home after posting
    } catch (err) {
      setError("Failed to create post. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-footer">
      <div className="mobile-footer-container">
        <Link to="/">
          <img src={Homeicon} alt="Home" className="mobile-footer-icon" />
        </Link>
        <img
          src={Notificationicon}
          alt="Notification"
          className="mobile-footer-icon"
        />
        <img
          src={Addicon}
          alt="Add"
          className="mobile-footer-add-icon"
          onClick={() => setShowUploadSection(true)}
        />
        <img
          src={Clendericon}
          alt="Calendar"
          className="mobile-footer-icon"
        />
        <img
          src={Networkicon}
          onClick={() => setShowNetwork(!showNetwork)}
          alt="Network"
          className="mobile-footer-icon"
        />
      </div>
      {showNetwork && (
        <div className="mobile-connections-card">
          <div className="mobile-connections-item">
            <Link to="/NetworkPage" className="connection-link">
              Connection
            </Link>
          </div>
          <div className="mobile-connections-item">Edu-vault</div>
          <div className="mobile-connections-item active">
            <Link to="/HumanLib" className="connection-link">
              Human Library
            </Link>
          </div>
          <div className="mobile-connections-item">Guidance</div>
          <div className="mobile-connections-item">NGOs</div>
        </div>
      )}
      {showUploadSection && (
        <div className="upload-overlay" onClick={handleCloseUpload}>
          <div
            className="upload-container"
            onClick={(e) => e.stopPropagation()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {mediaList.length === 0 && (
              <div className="upload-first-div">
                <p className="upload-text">Drag & Drop your media here</p>
                <button
                  className="upload-button"
                  onClick={() => inputRef.current.click()}
                >
                  Upload from computer
                </button>
              </div>
            )}
            {mediaList.length !== 0 && showAddMore && (
              <div className="after-upload">
                <div className="navbar">
                  <img src="/back-icon.png" alt="Back" onClick={handleCloseUpload} />
                  <h6
                    onClick={() => {
                      setShowPostDetails(true);
                      setShowAddMore(false);
                    }}
                  >
                    Continue
                  </h6>
                </div>
                <div className="preview-container">
                  {mediaList.map((media, index) => (
                    <div key={index} className="media-item">
                      {media.mediaType === "image" ? (
                        <img
                          className="imageAndVideo"
                          src={media.previewURL}
                          alt="Uploaded media"
                        />
                      ) : (
                        <video
                          className="imageAndVideo"
                          src={media.previewURL}
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="add-more-btn"
                  onClick={() => inputRef.current.click()}
                >
                  Add More
                </button>
              </div>
            )}
            {showPostDetails && (
              <div className="create-post-main-container">
                <div className="create-post-after-upload">
                  <div className="create-post-navbar">
                    <div className="image-and-name">
                      <img
                        src="/profile-image.png"
                        alt="profileImage"
                      />
                      <h3>Himanshu Choudary</h3>
                    </div>
                    <h6
                      onClick={handlePostSubmit}
                      className={isLoading ? "disabled" : ""}
                    >
                      {isLoading ? "Posting..." : "Create Post"}
                    </h6>
                  </div>
                  <div className="post-content-container">
                    <div className="image-and-caption">
                      {mediaList.map((media, index) => (
                        <div key={index} className="post-media-container">
                          {media.mediaType === "image" ? (
                            <img
                              className="create-post-imageAndVideo"
                              src={media.previewURL}
                              alt="Uploaded media"
                            />
                          ) : (
                            <video
                              className="create-post-imageAndVideo"
                              src={media.previewURL}
                              controls
                            />
                          )}
                        </div>
                      ))}
                      <div className="form-group">
                        <label className="input-label">Caption</label>
                        <textarea
                          className="caption-input"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Write a caption..."
                          rows="4"
                        />
                      </div>
                    </div>
                    <div className="mention-form-group">
                      <label className="input-label">Add Mentions</label>
                      <div className="mention-button">+</div>
                    </div>
                    <div className="privacy-settings">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Hide Likes</h4>
                          <p className="setting-description">
                            No one will be able to see the number of likes on your post. Except you
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={hideLikes}
                            onChange={(e) => setHideLikes(e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>Turn Off Comments</h4>
                          <p className="setting-description">
                            No one will be able to comment on this post
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={disableComments}
                            onChange={(e) => setDisableComments(e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="submit-section">
                      {error && <p className="error-message">{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileInput}
              accept="image/*,video/*"
              multiple
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFooter;