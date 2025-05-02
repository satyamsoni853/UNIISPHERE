import React from "react";
import "./Guiednest.css";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";
import { Link } from "react-router-dom";

function Guiednest() {
  return (
    <div >
    <div className="guiednest-section-navbar-container">
    <DesktopNavbar />
    <Background />
    </div>
      <div className="guiednest-section-section-container">
        <div className="guiednest-section-section-card">
          <div className="guiednest-section-section-card-container">
            {/* Content */}
            <h1 className="guiednest-section-section-title">
              Welcome to <span>Guiednest</span>
            </h1>
            <p className="guiednest-section-section-subtitle">
            Explore academic books, novels, notes, references, life lessons, and more to support your learning and personal growth.
            </p>

            <div className="guiednest-section-section-section">
              <h2 className="guiednest-section-section-section-title">ALLOWED</h2>
              <ul className="guiednest-section-section-list">
                <li>Respectful and genuine conversations</li>
                <li>Use of text messages and audio call</li>
                <li>Option to skip or block any match</li>
              </ul>
            </div>

            <div className="guiednest-section-section-section">
              <h2 className="guiednest-section-section-section-title">NOT ALLOWED</h2>
              <ul className="guiednest-section-section-list">
                <li>Sharing personal contact information</li>
                <li>Use of offensive, harmful, or explicit content</li>
                <li>Impersonation or deceptive behavior</li>
              </ul>
            </div>

            {/* <div className="guiednest-section-section-section">
              <h2 className="guiednest-section-section-section-title">SAFETY & MODERATION</h2>
              <ul className="guiednest-section-section-list">
                <li>
                  Conversations may be monitored for safety and reported content
                </li>
                <li>
                  Your identity remains anonymous unless you choose to disclose it
                </li>
                <li>Block and report features are available at all times</li>
              </ul>
            </div> */}

            <div className="guiednest-section-section-button-container">
              <Link to="/HumanLib" className="guiednest-section-section-button">
                I ACCEPT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guiednest;