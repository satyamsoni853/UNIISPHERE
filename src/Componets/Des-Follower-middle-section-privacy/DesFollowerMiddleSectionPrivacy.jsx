import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./DesFollowerMiddleSectionPrivacy.css";
import { GoLock } from "react-icons/go";
import { RiArrowDropRightLine } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Personimage from "./Person.png";
import middleconnectimage from "./middleconnectimage.png";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import MobileFooter from "../Mobilefooter/MobileFooter.jsx";
import Connect from "./Connect.png";

function DesFollowerMiddleSectionPrivacy() {
  const [searchParams] = useSearchParams();
  const queryUserId = searchParams.get("userId"); // Get userId from query parameters
  const storedUserId = localStorage.getItem("userId"); // Get userId from localStorage
  const userId = storedUserId || queryUserId; // Prefer localStorage, fallback to query parameter
  const [profileData, setProfileData] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isExpanded, setIsExpanded] = useState(false);

  // Log the userId source for verification
  console.log("Stored userId from localStorage:", storedUserId);
  console.log("Query userId from URL:", queryUserId);
  console.log("Using userId:", userId);

  // Default dummy data updated to match the image
  const defaultData = {
    profilePic: Personimage,
    collabs: 78,
    connections: 248,
    name: "Himanshu Choudhary",
    title: "Building Himansphere",
    about:
      "The actual idea of Unisphere was The Founder Himanshu who worked for months to think and plan all the essential stuffs to make time",
    collaboratorName: "Viraj Verma",
    education: ["UPES - MBA", "IITR, Haridwar, Kartikey"],
    paragraph:
      "Founder Himanshu who worked for months to think and plan all the essential stuffs to make the idea and dream to be a on ground working.",
    skills: ["UI/UX", "JAVA", "CSS", "C++", "Python", "Photoshop"],
    fullAboutText:
      "The actual idea of Unisphere was The Founder Himanshu who worked for months to think and plan all the essential stuffs to make time a reality. He envisioned a platform that connects people for collaboration and growth.",
    college: "Masters Union",
    degree: "SBM",
    subCollabrators:["Tarun ,Himanshu ,kartikey"]
  };

  // Fetch profile data when component mounts or userId changes
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setError("No user ID provided in localStorage or query parameters");
        setLoading(false);
        return;
      }

      try {
        setLoading(true); // Reset loading state
        const response = await fetch(
          `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }
        const data = await response.json();
        const profile = data[0]; // Assuming data is an array with one object
        setProfileData(profile || defaultData); // Fallback to default if profile is null
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Toggle "See More" / "See Less" for about section
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Use API data if available, otherwise use default data
  const data = profileData || defaultData;

  const maxLength = 100;
  const displayedText =
    data.about && isExpanded
      ? data.about
      : data.about?.slice(0, maxLength) +
          (data.about?.length > maxLength ? "..." : "") ||
        data.about ||
        "N/A";

  if (loading) return <div>Loading...</div>;

  console.log( "data  fetching startting in the middle",data);

  return (
    <div>
      <DesktopNavbarr />
      <div className="Interest-main-container">
        <Background />
        <div className="Interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="Interest-middle-main-container">
          <div className="Followers-middle-section-1-mainParent-privacy">
            <div className="Followers-middle-section-1-middle-container-privacy">
              <div className="Followers-middle-section-1-middle-section-privacy">
                {/* Show error message if data fetch fails */}
                {error && (
                  <div
                    style={{
                      color: "red",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    {error}
                  </div>
                )}
                <div className="Followers-middle-section-1-top-nav">
                  <IoArrowBackCircleOutline className="Followers-middle-section-1-Circle-back-icon" />
                  <img src={middleconnectimage} alt="" />
                </div>
                <div className="Followers-middle-section-1-profile-header-privacy">
                  <div className="Followers-middle-section-1-imageContainer-privacy">
                    <img
                      src={
                        data.profilePictureUrl || data.profilePic || Personimage
                      }
                      alt="Profile"
                      className="Followers-middle-section-1-profile-pic-privacy"
                    />
                  </div>
                  <div className="Followers-middle-section-1-collabsDetails-privacy">
                    <h4>Connections</h4>{" "}
                    <span>
                      {data._count?.connections2 ?? data.connections ?? 0}
                    </span>
                  </div>
                  <div className="Followers-middle-section-1-connectionsDetails-privacy">
                    <h4>Collabs</h4>
                    <span>
                      {data._count?.connections1 ?? data.collabs ?? 0}
                    </span>
                  </div>
                </div>
                {/* Display profile data */}
                <div className="Followers-middle-section-1-profile-info-privacy">
                  <h3>
                    {data.firstName || data.name } {data.lastName || defaultData.name }
                  </h3>
                  <p>
                    {data.headline || data.title ||  defaultData.title|| "N/A" }|
                    {data.workorProject || data.workorProject || defaultData.college|| "N/A"}
                  </p>
                </div>
                {/* Add Connect button */}
                <div style={{ textAlign: "left", margin: "10px 0" }}>
                  <img src={Connect} alt="" />
                </div>
                <div className="Followers-middle-section-1-profile-buttons-privacy">
                  <button>{data.college ||   "N/A"}</button>
                  <button>{data.degree ||   defaultData.degree ||"N/A"}</button>
                </div>
                <div className="Followers-middle-section-1-about-section-privacy">
                  <p>
                    <strong>About:</strong>
                  </p>
                  <p>
                    {displayedText}
                    { defaultData.fullAboutText || data.about?.length > maxLength && (
                      <button
                        className="Followers-middle-section-1-about-button-privacy"
                        onClick={toggleExpand}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>
                </div>
                <div className="Followers-middle-section-1-collabs-section-privacy">
                  <p>Collabs</p>
                  <div className="Followers-middle-section-1-collabratorCard-privacy">
                    <div className="Followers-middle-section-1-collabrator-lower-left-privacy">
                      <div className="Followers-middle-section-1-collab-profile-privacy">
                        <div className="Followers-middle-section-1-collab-image-privacy">
                          <img src={Personimage} alt="" />
                        </div>
                        <div className="Followers-middle-section-1-collabratorDetails-privacy">
                          <h7>{data.collaboratorName || defaultData.collaboratorName || "N/A"}</h7>
                          <div className="Followers-middle-section-1-education-privacy">
                            {(data.education || [data.college ||  "N/A"]).map(
                              (val, index) => (
                                <h6 key={index}>{val}</h6>
                              )
                            )}
                          </div>
                         {defaultData.subCollabrators.map((val,index)=>(
                           <h5 key={index} className="Followers-middle-section-1-subCollabrators-privacy">
                            ({val})
                           </h5>
                         ))}
                        </div>
                      </div>
                      <div className="Followers-middle-section-1-para-privacy">
                        <h6>
                        {defaultData.paragraph}
                        </h6>
                      </div>
                    </div>

                    <div className="Followers-middle-section-1-iconAndImage-privacy">
                      <img src={Personimage} alt="" />
                      <RiArrowDropRightLine className="Followers-middle-section-1-paragrapgh-icon-privacy" />
                    </div>
                  </div>
                </div>
                <div className="Followers-middle-section-1-skills-section-privacy">
                  <h3>Skills</h3>
                  <div className="Followers-middle-section-1-skill-list-privacy">
                    {(data.skills || data.skills || defaultData.skills || []).map((val, index) => (
                      <div
                        key={index}
                        className="Followers-middle-section-1-skillsMiniDiv-privacy"
                      >
                        {val || "N/A"}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="Followers-middle-section-1-blur-privacy">
                  <div className="Followers-middle-section-1-lock-privacy">
                    <GoLock className="Followers-middle-section-1-lockIcon-privacy" />
                  </div>
                  <div className="Followers-middle-section-1-headings-privacy">
                    <h4>Do you know privacy?</h4>
                    <h4>Connect to explore further</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="Interest-section-Mobile-Footer">
              <MobileFooter />
            </div>
          </div>
        </div>
        <div className="Interest-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default DesFollowerMiddleSectionPrivacy;
