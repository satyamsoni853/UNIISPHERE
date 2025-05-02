import React from "react";
import "./HumanLibGuidelines.css";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";
import { Link } from "react-router-dom";

function HumanLibGuidelines() {
  return (
    <div>
      <DesktopNavbar />
      <Background />
      <div className="guid-humanlib-container">
        <div className="guid-humanlib-card">
          <div className="guid-humanlib-card-container">
            {/* Content */}
            <h1 className="guid-humanlib-title">
              Welcome to <span>Human Library</span>
            </h1>
            <p className="guid-humanlib-subtitle">
              Engage in anonymous, meaningful conversations with fellow students
              in a safe and respectful environment.
            </p>

            <div className="guid-humanlib-section">
              <h2 className="guid-humanlib-section-title">ALLOWED</h2>
              <ul className="guid-humanlib-list">
                <li>Respectful and genuine conversations</li>
                <li>Use of text messages and audio call</li>
                <li>Option to skip or block any match</li>
              </ul>
            </div>

            <div className="guid-humanlib-section">
              <h2 className="guid-humanlib-section-title">NOT ALLOWED</h2>
              <ul className="guid-humanlib-list">
                <li>Sharing personal contact information</li>
                <li>Use of offensive, harmful, or explicit content</li>
                <li>Impersonation or deceptive behavior</li>
              </ul>
            </div>

            <div className="guid-humanlib-section">
              <h2 className="guid-humanlib-section-title">SAFETY & MODERATION</h2>
              <ul className="guid-humanlib-list">
                <li>
                  Conversations may be monitored for safety and reported content
                </li>
                <li>
                  Your identity remains anonymous unless you choose to disclose it
                </li>
                <li>Block and report features are available at all times</li>
              </ul>
            </div>

            <div className="guid-humanlib-button-container">
              <Link to="/HumanLib" className="guid-humanlib-button">
                I ACCEPT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumanLibGuidelines;