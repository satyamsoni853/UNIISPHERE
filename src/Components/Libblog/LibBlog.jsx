import React from "react";
import "./LibBlog.css";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";
import { Link } from "react-router-dom";

function LibBlog() {
  return (
    <div>
      <div className="libblog-section-navbar-container">
        <DesktopNavbar />
        <Background />
        <Link
          to={
            localStorage.getItem("userId")
              ? `/blog/${localStorage.getItem("userId")}`
              : "/blog"
          }
          className="desktop-connection-link"
        >
          Blog
        </Link>
      </div>
      <div className="libblog-section-section-container">
        <div className="libblog-section-section-card">
          <div className="libblog-section-section-card-container">
            {/* Content */}
            <h1 className="libblog-section-section-title">
              Welcome to <span>LibBlog</span>
            </h1>
            <p className="libblog-section-section-subtitle">
              Explore academic books, novels, notes, references, life lessons, and more to support your learning and personal growth.
            </p>

            <div className="libblog-section-section-section">
              <h2 className="libblog-section-section-section-title">ALLOWED</h2>
              <ul className="libblog-section-section-list">
                <li>Respectful and genuine conversations</li>
                <li>Use of text messages and audio call</li>
                <li>Option to skip or block any match</li>
              </ul>
            </div>

            <div className="libblog-section-section-section">
              <h2 className="libblog-section-section-section-title">NOT ALLOWED</h2>
              <ul className="libblog-section-section-list">
                <li>Sharing personal contact information</li>
                <li>Use of offensive, harmful, or explicit content</li>
                <li>Impersonation or deceptive behavior</li>
              </ul>
            </div>

            <div className="libblog-section-section-button-container">
              <Link
                to={
                  localStorage.getItem("userId")
                    ? `/blog/${localStorage.getItem("userId")}`
                    : "/blog"
                }
                className="libblog-section-section-button"
              >
                I ACCEPT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibBlog;