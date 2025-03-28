import React, { useState } from "react";
import "./CollabPage.css"; // We'll create this CSS file for styling
import profilePhoto from "./profilephoto.png"; // Default profile photo
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import Background from "../Background/Background.jsx";
import MobileFooter from "../Mobilefooter/MobileFooter";
import DesktopRightsection from "../DesktopRight/DesktopRight"; // Importing the DesktopRightsection component

function CollabPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [collaborators, setCollaborators] = useState([
    {
      name: "Vikash Dubey",
      education: "UPES",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu, who have been working on the idea from a long time. And in order to make this in real ...",
    },
    {
      name: "Arjun Verma",
      education: "DU",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu ...",
    },
    {
      name: "Rashid",
      education: "IIT Col",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu ...",
    },
    {
      name: "Varun Sharma",
      education: "UPES",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu ...",
    },
    {
      name: "Kratika Bhadouria",
      education: "IIT Varanasi",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu ...",
    },
    {
      name: "Juhi Sharma",
      education: "IIT Col",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu ...",
    },
    {
      name: "Vikram Patel",
      education: "IIT Varanasi",
      description:
        "The actual idea of Unlisphere is of the founder Himanshu ...",
    },
  ]);

  // Function to remove a collaborator
  const handleRemoveCollaborator = (index) => {
    setCollaborators((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="collabpage-first-container"  >
      <div className="collabpage-main-container">
        <DesktopNavbarr />
        <div>
          <Background />
          <div className="collabpage">
            <div className="collabpage-container">
              <div className="collabpage-list">
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="collabpage-card">
                    <div className="collabpage-profile-pic-container">
                      <img
                        src={profilePhoto}
                        alt={`${collaborator.name}'s profile`}
                        className="collabpage-profile-pic"
                      />
                    </div>
                    <div className="collabpage-info">
                      <h3 className="collabpage-name">{collaborator.name}</h3>
                      <p className="collabpage-education">
                        {collaborator.education}
                      </p>
                      <p className="collabpage-description">
                        {collaborator.description}
                      </p>
                    </div>
                    <button
                      className="collabpage-remove-btn"
                      onClick={() => handleRemoveCollaborator(index)}
                      aria-label={`Remove ${collaborator.name}`}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              {/* Buttons Section */}
              <div className="collabpage-buttons">
                <button className="collabpage-action-btn">Connections</button>
                <button className="collabpage-action-btn">Collaborates</button>
                {isMobile && <MobileFooter />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collabpage-rightsection">
        <DesktopRightsection />
      </div>
    </div>
  );
}

export default CollabPage;
