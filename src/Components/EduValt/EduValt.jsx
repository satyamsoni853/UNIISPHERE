import React from "react";
import "./EduValt.css";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";
import { Link } from "react-router-dom";

function EduValt() {
  return (
    <div >
    <div className="edu-valt-navbar-container">
    <DesktopNavbar />
    <Background />
    </div>
      <div className="edu-valt-section-container">
        <div className="edu-valt-section-card">
          <div className="edu-valt-section-card-container">
            {/* Content */}
            <h1 className="edu-valt-section-title">
              Welcome to <span>EDU-VALT</span>
            </h1>
            <p className="edu-valt-section-subtitle">
            Explore academic books, novels, notes, references, life lessons, and more to support your learning and personal growth.
            </p>

            <div className="edu-valt-section-section">
              <h2 className="edu-valt-section-section-title">ALLOWED</h2>
              <ul className="edu-valt-section-list">
                <li>Respectful and genuine conversations</li>
                <li>Use of text messages and audio call</li>
                <li>Option to skip or block any match</li>
              </ul>
            </div>

            <div className="edu-valt-section-section">
              <h2 className="edu-valt-section-section-title">NOT ALLOWED</h2>
              <ul className="edu-valt-section-list">
                <li>Sharing personal contact information</li>
                <li>Use of offensive, harmful, or explicit content</li>
                <li>Impersonation or deceptive behavior</li>
              </ul>
            </div>

            {/* <div className="edu-valt-section-section">
              <h2 className="edu-valt-section-section-title">SAFETY & MODERATION</h2>
              <ul className="edu-valt-section-list">
                <li>
                  Conversations may be monitored for safety and reported content
                </li>
                <li>
                  Your identity remains anonymous unless you choose to disclose it
                </li>
                <li>Block and report features are available at all times</li>
              </ul>
            </div> */}

            <div className="edu-valt-section-button-container">
              <Link to="/HumanLib" className="edu-valt-section-button">
                I ACCEPT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EduValt;