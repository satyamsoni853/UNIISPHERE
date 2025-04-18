import React, { useEffect, useState } from "react";
import "./Blog.css";
import CollegeEnter from "./collegeEnter.svg";
import profile from "./profile.jpg";
import backIcon from "./backsvg.svg";
import Like from "./Like.svg";
import Share from "./Share.svg";
import Comment from "./Comment.svg";
import leftForward from "./fast-forward 1.svg";
import rightForward from "./fast-forward 1.svg";
import pause from "./pause.svg";
import threeDot from "./Threedot.svg";
import cc from "./cc.svg";
import expand from "./expand.svg";

import { IoIosArrowDown } from "react-icons/io";
const Blog = () => {
  const check ="https://www.bing.com/videos/riverview/relatedvideo?&q=video&&mid=DF2D8672B8F542147B72DF2D8672B8F542147B72&&mcid=3A5241F1DC1B4B4FB43CA556CC6A7CC1&FORM=VRDGAR"
  const [showDefaultBlog, setShowDefaultBlog] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const inputref = React.useRef(null);
  const [file, setFile] = useState(check);
  const [objectUrl, setObjectUrl] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    // Revoke the previous object URL if it exists to free memory
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    // Get the selected file (single file selection)
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Create a temporary URL for the file
      const newObjectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setObjectUrl(newObjectUrl);
    } else {
      // Clear state if no file is selected
      setFile(check);
      setObjectUrl(check);
    }
  };

  // Cleanup: Revoke object URL when the component unmounts
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file, objectUrl]);
  const [posts, setPosts] = useState([
    {
      author: "Vijay Prasad",
      affiliation: "University of Delhi...",
      timestamp: "18h",
      title: "Again the notice",
      content:
        "Vijay Prashad  Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.",
      likes: 4012,
      imageUrl: file, // Replace with actual image path
    },
    {
      author: 'Jane Doe',
      affiliation: 'Harvard University',
      timestamp: '2d',
      title: 'New Research Findings',
      content: 'Vijay Prashad Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.',
 
      likes: 1234,
      imageUrl:CollegeEnter, // Replace with actual image path
    },
  ]);

  return (
    <div className="blog-container">
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
          {posts.map((post, index) => (
            <div key={index} className="blog-post">
              {/* Header Section */}
              <div className="blog-header">
                <div className="blog-profile">
                  <div className="blog-profile-image">
                    <img
                      src={profile} // Replace with actual image path
                      alt="Profile"
                      className="blog-profile-pic"
                    />
                  </div>
                  <div className="blog-user-info">
                    <div className="blog-username">
                      {post.author}{" "}
                      <span className="blog-timestamp">{post.timestamp}</span>{" "}
                    </div>
                    <div className="blog-affiliation">{post.affiliation}</div>
                  </div>
                </div>
                <div className="blog-options">
                  <img src={threeDot} alt="" />
                </div>
              </div>

              {/* Media Section */}
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
                      src={objectUrl}
                    
                      style={{ maxWidth: "100%" }}
                    />
                  ) : (
                    <p>Unsupported file type</p>
                  )
                ) : (
                  <video src={check}  style={{ maxWidth: "100%" }} />
                )}
                <div className="blog-media-controls">
                  <div className="blog-progress-bar"></div>
                  <div className="blog-controls-all-btn">
                    <div className="blog-media-controls-left">
                      <img
                        className="blog-control-btn"
                        src={leftForward}
                        alt=""
                      />
                      <img className="blog-control-btn" src={pause} alt="" />
                      <img
                        className="blog-control-btn"
                        src={rightForward}
                        alt=""
                      />
                    </div>
                    <div className="blog-media-controls-right">
                      <img src={cc} alt="" className="  blog-control-btn" />
                     <img src={expand} className="  blog-control-btn" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="blog-title-section">
                <div className="blog-heading-section">
                  <h2 className="blog-title">{post.title}</h2>
                  <div className="blog-author">{post.author}</div>
                </div>

                {/* Text Body */}
                <div className="blog-text-body">
                  <p className="blog-content">{post.content.slice(0, 200)}</p>
                  <p className="blog-content">
                    {post.content.slice(200, post.content.length)}
                  </p>
                  {/* Interaction Section */}
                  <div className="blog-interaction">
                    <div className="blog-likes">{post.likes} Likes</div>
                    <div className="blog-icons">
                      <img className="blog-icon" src={Like} alt="" />
                      <img className="blog-icon" src={Comment} alt="" />
                      <img className="blog-icon-share" src={Share} alt="" />
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
                />
              </div>
              <div className="blog-create-input-group">
                <label htmlFor="about" className="blog-create-label">
                  About
                </label>
                <textarea
                  id="about"
                  className="blog-create-textarea"
                ></textarea>
              </div>
            </section>
          </div>
          <div className="blog-create-section-wrapper">
            <section className="blog-create-media-upload">
              <div className="blog-create-media-container">
                <input
                  type="file"
                  accept="image/, video/"
                  className="blog-create-media-input"
                  style={{ display: "none" }}
                  ref={inputref}
                  onChange={handleFileChange}
                />
                <button
                  onClick={() => inputref.current.click()}
                  className="blog-create-upload-button"
                >
                  Upload media
                </button>
                <p className="blog-create-instructional-text">
                  {objectUrl
                    ? "File selected"
                    : "  Add media to make your blog more attractive & relative."}
                </p>
              </div>
            </section>
          </div>
          <div className="blog-create-section-wrapper">
            <footer className="blog-create-actions">
              <button
                onClick={() => {
                  setFile((prev) => prev);
                  setShowCreateBlog(false);
                  setShowDefaultBlog(true);
                }}
                className="blog-create-upload-button-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateBlog(false);
                  setShowDefaultBlog(true);
                }}
                className="blog-create-upload-button-2"
              >
                Upload
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;