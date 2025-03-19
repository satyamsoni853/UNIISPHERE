import React, { useState } from "react";
import "./PersonalInfoUpdate.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";

function PersonalInfoUpdate() {
  const [profileData, setProfileData] = useState({
    username: "Himanshu Choudhary",
    headline: "Building Unisphere | Masters Union",
    college: "Masters Union",
    degree: "SBM",
    location: "Gurgaon, Haryana, India",
  });

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <DesktopNavbarr />
      
      <div className="PersonalInfoUpdate-main-container">
        <Background />
        <div className="PersonalInfoUpdate-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="PersonalInfoUpdate-middle-main-container">
          <div className="PersonalInfoUpdate-profile-card">
            <div className="PersonalInfoUpdate-photo-section">
              <div className="PersonalInfoUpdate-profile-photo"></div>
              <div className="PersonalInfoUpdate-button-group">
                <button className="PersonalInfoUpdate-edit-photo">
                  Edit Photo
                </button>
                <button className="PersonalInfoUpdate-remove-photo">
                  Remove
                </button>
              </div>
            </div>
            <div className="PersonalInfoUpdate-info-section">
              <div className="PersonalInfoUpdate-info-item">
                <label>Username</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Headline</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.headline}
                  onChange={(e) => handleChange("headline", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>College/University</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.college}
                  onChange={(e) => handleChange("college", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Degree</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.degree}
                  onChange={(e) => handleChange("degree", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Location</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="PersonalInfoUpdate-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoUpdate;
