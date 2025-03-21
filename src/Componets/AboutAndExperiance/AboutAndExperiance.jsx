import React, { useState, useEffect } from "react";
import "./AboutAndExperiance.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";

function AboutAndExperiance() {
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const [title, setTitle] = useState(""); // Title for the experience section
  const [name, setName] = useState(""); // Organization/Company name
  const [aboutDesc, setaboutDesc] = useState(""); // About description content
  const [location, setLocation] = useState(""); // Location input
  const [locationType, setLocationType] = useState(""); // Location type (e.g., remote, onsite)
  const [description, setDescription] = useState(""); // Detailed description for experience
  return (
    <div>
      <DesktopNavbarr/>
      <div className="AboutAndExperiance-main-container">
        <Background />
        <div className="AboutAndExperiance-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="AboutAndExperiance-middle-main-container">
          <div className="middle-aboutExperience-mainParent">
            {/* Main container for the form */}
            <div className="middle-aboutExperience-container">
              {/* About Section */}
              <div className="middle-aboutExperience-aboutSection">
                  <div className="middle-interest-header">
                                {isMobile && (
                                  <span>
                                    <IoArrowBackCircleOutline />
                                  </span>
                                )}
                             
                                <span>About</span>
                              </div>
                <textarea
                  className="middle-aboutExperience-textarea"
                  // Default value as fallback for the about section
                  defaultValue="The actual idea of Uniisphere was of The Founder Himanshu who worked for months to think and plan all the essential stuff."
                  // Controlled value based on state
                  value={aboutDesc}
                  // Update state on change
                  onChange={(e) => setaboutDesc(e.target.value)}
                  maxLength={1000}
                />
                <div className="middle-aboutExperience-buttons">
                  {/* Cancel and Save buttons for the About section */}
                  <button className="middle-aboutExperience-cancel">
                    Cancel
                  </button>
                  <button className="middle-aboutExperience-save">Save</button>
                </div>
              </div>

              {/* Experience Section */}
              <div className="middle-aboutExperience-experienceSection">
                <h3>Experience</h3>
                {/* Input group for Title */}
                <div className="middle-aboutExperience-inputGroup">
                  <label>Title</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* Input group for Organization / Company */}
                <div className="middle-aboutExperience-inputGroup">
                  <label>Name of Organization / Company</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* Input group for Location */}
                <div className="middle-aboutExperience-inputGroup">
                  <label>Location</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                {/* Input group for Location Type */}
                <div className="middle-aboutExperience-inputGroup">
                  <label>Location Type</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                  />
                </div>
                {/* Input group for Experience Description */}
                <div className="middle-aboutExperience-inputGroup">
                  <label>Description</label>
                  <textarea
                    className="middle-aboutExperience-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="middle-aboutExperience-buttons">
                  {/* Cancel and Save buttons for the Experience section */}
                  <button className="middle-aboutExperience-cancel">
                    Cancel
                  </button>
                  <button className="middle-aboutExperience-save">Save</button>
                  {isMobile && <MobileFooter />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="AboutAndExperiance-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default AboutAndExperiance;
