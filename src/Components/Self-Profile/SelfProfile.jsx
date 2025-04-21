import React from "react";
import { Link } from "react-router-dom";
import "./SelfProfile.css";

function SelfProfile({ onClose }) {
  const handleSignOut = () => {
    onClose(); // Close the dropdown
    // Note: Navigation to "/" will happen via the Link
  };

  return (
    <div className="SelfProfile-card">
      {/* Profile Header */}
      <div className="SelfProfile-header">
        <img
          src="https://via.placeholder.com/50"
          alt="Profile Picture"
          className="SelfProfile-pic"
        />
        <div className="SelfProfile-info">
          <h2 className="SelfProfile-name">Himanshu Choudhary</h2>
          <p className="SelfProfile-label">SBM</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button className="SelfProfile-edit-button">Edit Profile</button>

      {/* Stats Section */}
      <div className="SelfProfile-stats">
        <div className="SelfProfile-stat">
          <span>Posts</span>
          <span className="SelfProfile-stat-value">23</span>
        </div>
        <div className="SelfProfile-stat">
          <span>Likes</span>
          <span className="SelfProfile-stat-value">56</span>
        </div>
        <div className="SelfProfile-stat">
          <span>Comments</span>
          <span className="SelfProfile-stat-value">12</span>
        </div>
        <div className="SelfProfile-stat">
          <span>Profile Visits</span>
          <span className="SelfProfile-stat-value">348</span>
        </div>
      </div>

      {/* Menu Section */}
      <div className="SelfProfile-menu">
        <div className="SelfProfile-menu-item">Settings</div>
        <hr className="SelfProfile-divider" />
        <div className="SelfProfile-menu-item">Help</div>
        <hr className="SelfProfile-divider" />
        <Link
          to="/"
          className="SelfProfile-menu-item SelfProfile-sign-out"
          onClick={handleSignOut} // Close the dropdown on sign out
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}

export default SelfProfile;