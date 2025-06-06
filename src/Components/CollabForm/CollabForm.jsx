import { useState, useEffect } from "react";
import "./CollabForm.css";
import { IoIosSearch } from "react-icons/io";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbar from  '../DesktopNavbar/DesktopNavbar.jsx'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";

function CollabForm() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [projectName, setProjectName] = useState("");
  const [peoples, setPeoples] = useState("");
  const [about, setAbout] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [skills, setSkills] = useState("");

  return (
    <div>
      <DesktopNavbar />
      <div className="Collab-main-container">
        <Background />
        <div className="Collab-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </div>
        <div className="Collab-middle-main-container">
          <div className="middle-collab-container">
            <div className="middle-collab-header">
              {isMobile && (
                <span>
                  <IoArrowBackCircleOutline />
                </span>
              )}

              <span>Collab</span>
            </div>
            <form className="middle-collab-form">
              <div className="middle-collab-form-Input">
                <label htmlFor="name">Name of Project</label>
                <input
                  type="text"
                  className="middle-collab-input"
                  value={projectName}
                  name="name"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="middle-collab-form-Input">
                <label htmlFor="search">Peoples</label>
                <div className="middle-collab-searchAndSkillInput">
                  <input
                    type="text"
                    className="middle-collab-input-search"
                    value={peoples} // Fixed: Should be peoples, not skills
                    onChange={(e) => setPeoples(e.target.value)}
                  />
                  <div className="middle-collab-search-icon">
                    <IoIosSearch className="middle-class-iconSearch" />
                  </div>
                </div>
              </div>

              <div className="middle-collab-form-Input">
                <label htmlFor="about">About</label>
                <textarea
                  className="middle-collab-textarea"
                  name="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="middle-collab-dates">
                <div className="middle-collab-form-Input">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    className="middle-collab-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="middle-collab-form-Input">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    name="endDate"
                    type="date"
                    className="middle-collab-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="middle-collab-form-Input">
                <label htmlFor="search">Skill Involved</label>
                <div className="middle-collab-searchAndSkillInput">
                  <input
                    type="text"
                    className="middle-collab-input-search"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <div className="middle-collab-search-icon">
                    <IoIosSearch className="middle-class-iconSearch" />
                  </div>
                </div>
                <div className="middle-interest-last-buttons">
                  <button className="middle-interest-cancel">Cancel</button>
                  <button className="middle-interest-save">Save</button>
                  {isMobile && <MobileFooter />}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="Collab-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default CollabForm;
