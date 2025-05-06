import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./DesFollowerMiddleSectionPrivacy.css";
import { GoLock } from "react-icons/go";
import { RiArrowDropRightLine } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Personimage from "./Person.png";
import middleconnectimage from "./middleconnectimage.png";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbar from  '../DesktopNavbar/DesktopNavbar.jsx'
import MobileFooter from "../Mobilefooter/MobileFooter.jsx";
import Connect from "./Connect.png";

function DesFollowerMiddleSectionPrivacy() {
  const [searchParams] = useSearchParams();
  const queryUserId = searchParams.get("userId");
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId || queryUserId;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Reset connectionStatus on component mount
  useEffect(() => {
    setConnectionStatus(null);
  }, []);

  // Enhanced dummy data
  const defaultData = {
    profilePictureUrl: Personimage,
    profilePic: Personimage,
    collabs: 78,
    connections: 248,
    name: "Himanshu Choudhary",
    firstName: "Himanshu",
    lastName: "Choudhary",
    title: "Building Himansphere",
    headline: "Building Himansphere",
    about:
      "The actual idea of Unisphere was The Founder Himanshu who worked for months to think and plan all the essential stuffs to make time a reality. He envisioned a platform that connects people for collaboration and growth.",
    collaboratorName: "Viraj Verma",
    education: ["UPES - MBA", "IITR, Haridwar, Kartikey"],
    paragraph:
      "Founder Himanshu who worked for months to think and plan all the essential stuffs to make the idea and dream to be a on ground working.",
    skills: ["UI/UX", "JAVA", "CSS", "C++", "Python", "Photoshop"],
    fullAboutText:
      "The actual idea of Unisphere was The Founder Himanshu who worked for months to think and plan all the essential stuffs to make time a reality. He envisioned a platform that connects people for collaboration and growth.",
    college: "Masters Union",
    degree: "SBM",
    workorProject: "Building Unisphere",
    subCollabrators: ["Tarun", "Himanshu", "kartikey"],
    _count: {
      connections1: 78,
      connections2: 248,
    },
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setError("No user ID provided. Using default data.");
        setProfileData(defaultData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("AuthToken");
        const response = await fetch(
          `https://uniisphere-backend-latest.onrender.com/getProfile/profile/?userId=${userId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Non-JSON Response:", text);
          throw new Error(
            "Server did not return JSON data. Check the API endpoint."
          );
        }

        if (!response.ok) {
          const text = await response.text();
          console.error("Fetch Failed - Response Body:", text);
          throw new Error(
            `Failed to fetch profile: ${response.status} - ${text}`
          );
        }

        const data = await response.json();
        // console.log("Privacy Fetched Profile Data:", data);
        setProfileData(data[0] || defaultData);
      } catch (err) {
        console.error("Fetch Profile Error:", err);
        setError(
          `Failed to load profile data: ${err.message}. Using default data.`
        );
        setProfileData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Send connection request with path parameter
  const sendConnectionRequest = async () => {
    console.log("sendConnectionRequest called");
    try {
      const token = localStorage.getItem("AuthToken");
      const senderId = localStorage.getItem("LoginuserId");
      const receiverId = localStorage.getItem("SearchUserId") || userId;

      console.log("Sender Token:", token);
      console.log("Sender ID:", senderId);
      console.log("Receiver ID:", receiverId);

      if (!token || !senderId || !receiverId) {
        setError("Missing required data: Please ensure you are logged in");
        return;
      }

      if (senderId === receiverId) {
        setError ("You cannot send a connection request to yourself");
        return;
      }

      const response = await fetch(
        `https://uniisphere-backend-latest.onrender.com/api/connect/${receiverId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: senderId,
            senderName: profileData?.name || "User",
          }),
        }
      );

      // First try to parse the response as JSON
      let responseData;
      const contentType = response.headers.get("Content-Type");

      try {
        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          const text = await response.text();
          console.error("Non-JSON Response:", text);
          responseData = { message: text };
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        const text = await response.text();
        responseData = { message: text };
      }

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            `Request failed with status ${response.status}`
        );
      }
      setConnectionStatus("requested");
      // console.log("Connection request successful:", responseData);
    } catch (err) {
      console.error("Connection Request Error:", err);
      setError(err.message || "Failed to send connection request");
      // Reset connection status if the request failed
      setConnectionStatus(null);
    }
  };

  // Toggle about section
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Render connect button or message based on status
  const renderConnectButton = () => {
    // console.log("Connection Status:", connectionStatus);
    if (connectionStatus === "requested") {
      return (
        <div
          className="connect-button-wrapper"
          role="status"
          aria-label="Connection request sent"
        >
          <span className="connection-status-message">Your request is sent</span>
        </div>
      );
    }

    return (
      <div
        className="connect-button-wrapper"
        onClick={sendConnectionRequest}
        role="button"
        aria-label="Connect with user"
      >
        <img src={Connect} alt="Connect" className="connect-button-img" />
      </div>
    );
  };

  // Use API data or default data
  const data = profileData || defaultData;
  const maxLength = 100;
  const displayedText = isExpanded
    ? data.about
    : `${data.about?.slice(0, maxLength)}${
        data.about?.length > maxLength ? "..." : ""
      }`;

  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div>
      <DesktopNavbar />
      <div className="Interest-main-container">
        <Background />
        <div className="Interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottom />
        </div>
        <div className="Interest-middle-main-container">
          <div className="Followers-middle-section-1-mainParent-privacy">
            <div className="Followers-middle-section-1-middle-container-privacy">
              <div className="Followers-middle-section-1-middle-section-privacy">
                {error && <div className="error-message">{error}</div>}

                <div className="Followers-middle-section-1-top-nav">
                  <IoArrowBackCircleOutline
                    className="Followers-middle-section-1-Circle-back-icon"
                    onClick={() => window.history.back()}
                  />
                  <img src={middleconnectimage} alt="Connect" />
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
                    <h4>Connections</h4>
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

                <div className="Followers-middle-section-1-profile-info-privacy">
                  <h3>
                    {data.firstName || data.name} {data.lastName || ""}
                  </h3>
                  <p>
                    {data.headline || data.title || "N/A"} |
                    {data.workorProject || data.college || "N/A"}
                  </p>
                </div>

                {renderConnectButton()}

                <div className="Followers-middle-section-1-profile-buttons-privacy">
                  <button>{data.college || "N/A"}</button>
                  <button>{data.degree || "N/A"}</button>
                </div>

                <div className="Followers-middle-section-1-about-section-privacy">
                  <p className="DesFollowerMiddleSectionPrivacy-heading">About</p>
                  <p>
                    {displayedText}
                    {data.about?.length > maxLength && (
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
                  <p className="DesFollowerMiddleSectionPrivacy-heading">Collabs</p>
                  <div className="Followers-middle-section-1-collabratorCard-privacy">
                    <div className="Followers-middle-section-1-collabrator-lower-left-privacy">
                      <div className="Followers-middle-section-1-collab-profile-privacy">
                        <div className="Followers-middle-section-1-collab-image-privacy">
                          <img src={Personimage} alt="Collaborator" />
                        </div>
                        <div className="Followers-middle-section-1-collabratorDetails-privacy">
                          <div className="Followers-middle-section-1-education-privacy">
                            {(data.education || defaultData.education).map(
                              (val, index) => (
                                <h6 key={index}>{val}</h6>
                              )
                            )}
                          </div>
                          <div className="Full-middle-section-1-subcollabrators-container-privacy">
                            (
                            {(
                              data.subCollabrators ||
                              defaultData.subCollabrators
                            ).map((val, index) => (
                              <h5
                                key={index}
                                className="Followers-middle-section-1-subCollabrators-privacy"
                              >
                                {val},
                              </h5>
                            ))}
                            )
                          </div>
                        </div>
                      </div>
                      <div className="Followers-middle-section-1-para-privacy">
                        <h6>{data.paragraph || defaultData.paragraph}</h6>
                      </div>
                    </div>
                    <div className="Followers-middle-section-1-iconAndImage-privacy">
                      <img src={Personimage} alt="Person" />
                      <RiArrowDropRightLine className="Followers-middle-section-1-paragrapgh-icon-privacy" />
                    </div>
                  </div>
                </div>

                <div className="Followers-middle-section-1-skills-section-privacy">
                  <p className="DesFollowerMiddleSectionPrivacy-heading">Skills</p>
                  <div className="Followers-middle-section-1-skill-list-privacy">
                    {(data.skills || defaultData.skills).map((val, index) => (
                      <div
                        key={index}
                        className="Followers-middle-section-1-skillsMiniDiv-privacy"
                      >
                        {val}
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