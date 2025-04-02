import React, { useState, useEffect } from "react";
import "./NetworkPage.css";
import profilePhoto from "./profilephoto.png";
import connectsvg from "./Connection.svg";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import Background from "../Background/Background.jsx";
import MobileFooter from "../Mobilefooter/MobileFooter";
import redXIcon from "./close.png";
import greenCheckIcon from "./check.png";

// DUMMY_DATA - Used for testing when API is not available
const DUMMY_DATA = [
  {
    id: "770d70af-b221-d20a-9ccb-2304c33a38b4",
    userId: "cefs3cd8-f6da-400b-a110-655d66086b32",
    userId2: "7bdeaack-b786-d09f-b3ba-f911e2f99a04",
    status: "pending",
    createdAt: "2025-05-31T11:23:27.7282",
    userDetails: {
      id: "cefs3cd8-f6da-400b-a110-655d66086b32",
      username: "iconalcednet",
      profilePictureNet1:
        "https://res.cloudinary.com/download/image/upload/v174274068b/profile_pictures/kmpjprkaxno2ncugvdb1.jpg",
      headline: "Student",
    },
  },
  {
    id: "550d70af-b221-d20a-9ccb-2304c33a38b5",
    userId: "aefs3cd8-f6da-400b-a110-655d66086b33",
    userId2: "7bdeaack-b786-d09f-b3ba-f911e2f99a04",
    status: "pending",
    createdAt: "2025-05-30T10:15:22.1234",
    userDetails: {
      id: "aefs3cd8-f6da-400b-a110-655d66086b33",
      username: "mahoop",
      profilePictureNet1: "",
      headline: "Software Developer",
    },
  },
];

// Static user data for the network page
const staticUsers = [
  {
    name: "Karan",
    education: "Delhi University",
    description: "The actual idea of Unlisphere is of the founder Himanshu ...",
    connections: 17,
    collaborations: 2,
  },
  {
    name: "Vikash Dubey",
    education: "UPES",
    description: "The actual idea of Unlisphere is of the founder Himanshu ...",
    connections: 88,
    collaborations: 8,
  },
];

function NetworkPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showRequestMode, setShowRequestMode] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useDummyData, setUseDummyData] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null); // Initialize as null
  const [showRightSection, setShowRightSection] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("AuthToken");

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch pending requests when in request mode
  useEffect(() => {
    if (showRequestMode) {
      fetchPendingRequests();
    }
  }, [showRequestMode]);

  const fetchPendingRequests = async () => {
    setLoading(true);
    setError(null);

    if (useDummyData) {
      console.log("Using DUMMY_DATA for pending requests");
      console.log("Current User ID:", currentUserId);
      console.log(
        "Dummy requests:",
        DUMMY_DATA.map((req) => ({
          id: req.id,
          fromUserId: req.userId,
          toUserId: req.userId2,
          username: req.userDetails.username,
        }))
      );
      // Set currentUserId from DUMMY_DATA if using dummy data
      if (DUMMY_DATA.length > 0) {
        setCurrentUserId(DUMMY_DATA[0].userId2);
      }
      setPendingRequests(DUMMY_DATA);
      setLoading(false);
      return;
    }
    const LoginuserId = localStorage.getItem("LoginuserId");
    console.log("Connection login userId:", LoginuserId);

    try {
      console.log("try block is running");

      if (!token) {
        throw new Error("Missing authentication token");
      }

      console.log("Auth Token:", token);

      // Ensure userId is retrieved properly
      if (!LoginuserId) {
        throw new Error("Missing LoginuserId in localStorage");
      }

      const response = await fetch(
        "https://uniisphere-1.onrender.com/api/getPending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: LoginuserId }), // Changed userId to userId1 to match API contract
        }
      );
      console.log(response);

      console.log("connection try block end");

      // Print full response object (useful for debugging)
      console.log("Connection Full Response:", response);
      const data = await response.json();
      console.log("Data is coming:", data);
      console.log("Connection Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // if (data.length > 0 && data[0].userID2) {
      //   setCurrentUserId(data[0].userID2);
      //   console.log(`Fetched Current User ID: ${data[0].userID2}`);
      // } else {
      //   console.warn("No userID2 found in the response");
      // }

      // Log all user IDs from the response
      data.forEach((request, index) => {
        console.log(`Pending Request ${index + 1} User IDs:`);
        console.log(`  userID1: ${request.userID1}`);
        console.log(`  userID2: ${request.userID2}`);
        console.log(`  userDetails.id: ${request.userDetails.id}`);
      });

      console.log("API Response:", {
        currentUserId: data[0]?.userID2 || "Not set",
        requests: data.map((req) => ({
          id: req.id,
          fromUser: req.userID1,
          toUser: req.userID2,
          status: req.status,
        })),
      });

      setPendingRequests(data);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setError(err.message);
      console.log("Falling back to DUMMY_DATA due to error");
      // Set currentUserId from DUMMY_DATA as fallback
      if (DUMMY_DATA.length > 0) {
        setCurrentUserId(DUMMY_DATA[0].userId2);
      }
      setPendingRequests(DUMMY_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (connectionId) => {
    if (!currentUserId || !token) return;

    console.log(`User ${currentUserId} accepting request ${connectionId}`);

    if (useDummyData) {
      console.log(
        `DUMMY_DATA - ${currentUserId} accepting request ${connectionId}`
      );
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== connectionId)
      );
      return;
    }

    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/accept/${connectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            acceptingUserId: currentUserId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Accept request successful:", {
        connectionId,
        acceptingUserId: currentUserId,
        result,
      });
      fetchPendingRequests();
    } catch (err) {
      console.error("Error accepting request:", err);
      setError(err.message);
    }
  };

  const handleDeclineRequest = async (connectionId) => {
    if (!currentUserId || !token) return;

    console.log(`User ${currentUserId} declining request ${connectionId}`);

    if (useDummyData) {
      console.log(
        `DUMMY_DATA - ${currentUserId} declining request ${connectionId}`
      );
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== connectionId)
      );
      return;
    }

    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/decline/${connectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            decliningUserId: currentUserId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Decline request successful:", {
        connectionId,
        decliningUserId: currentUserId,
        result,
      });
      fetchPendingRequests();
    } catch (err) {
      console.error("Error declining request:", err);
      setError(err.message);
    }
  };

  const backgroundColors = [
    "#f0f8ff",
    "#fafad2",
    "#e6e6fa",
    "#fff5ee",
    "#f5f5dc",
    "#e0ffff",
    "#f0fff0",
    "#fff0f5",
    "#f5fffa",
    "#f0ffff",
    "#ffe4e1",
  ];

  const handleConnectClick = () => {
    setShowRightSection(true);
  };

  const handleCloseRightSection = () => {
    setShowRightSection(false);
  };

  const handleRequestClick = () => {
    setShowRequestMode(true);
  };

  const handleCatchUpClick = () => {
    setShowRequestMode(false);
  };

  const toggleDummyData = () => {
    setUseDummyData((prev) => !prev);
    console.log(`Dummy data mode: ${!useDummyData}`);
  };

  return (
    <div className="networkpage-main-container">
      <DesktopNavbarr />
      <div className="networkpage-wrapper">
        <Background />
        <div className="networkpage">
          <div className="networkpage-container">
            <div className="networkpage-left-section">
              <button
                onClick={toggleDummyData}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 1000,
                  padding: "5px 10px",
                  backgroundColor: useDummyData ? "#4CAF50" : "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {useDummyData ? "Using Dummy Data" : "Using Real API"}
              </button>

              {showRequestMode ? (
                <div className="networkpage-grid">
                  {loading ? (
                    <div>Loading pending requests...</div>
                  ) : error ? (
                    <div>Error: {error}</div>
                  ) : pendingRequests.length > 0 ? (
                    pendingRequests.map((request, index) => (
                      <div
                        key={request.id}
                        className="networkpage-card"
                        style={{
                          backgroundColor:
                            backgroundColors[index % backgroundColors.length],
                        }}
                      >
                        <div className="networkpage-profile-pic-container">
                          <img
                            src={
                              request.userDetails.profilePictureNet1 ||
                              profilePhoto
                            }
                            alt={`${request.userDetails.username}'s profile`}
                            className="networkpage-profile-pic"
                            onError={(e) => {
                              e.target.src = profilePhoto;
                            }}
                          />
                        </div>
                        <h3 className="networkpage-name">
                          {request.userDetails.username}
                        </h3>
                        <p className="networkpage-education">
                          {request.userDetails.headline}
                        </p>
                        <div className="networkpage-actions">
                          <img
                            src={redXIcon}
                            alt="Decline"
                            className="action-icon"
                            onClick={() => handleDeclineRequest(request.id)}
                            style={{ cursor: "pointer" }}
                          />
                          <img
                            src={greenCheckIcon}
                            alt="Accept"
                            className="action-icon"
                            onClick={() => handleAcceptRequest(request.id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div className="networkpage-stats">
                          <span>Request ID: {request.id}</span>
                          <span>From: {request.userID1}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No pending connection requests</div>
                  )}
                </div>
              ) : (
                <div className="networkpage-grid">
                  {staticUsers.map((user, index) => (
                    <div
                      key={user.name}
                      className="networkpage-card"
                      style={{
                        backgroundColor:
                          backgroundColors[index % backgroundColors.length],
                      }}
                    >
                      <div className="networkpage-profile-pic-container">
                        <img
                          src={profilePhoto}
                          alt={`${user.name}'s profile`}
                          className="networkpage-profile-pic"
                        />
                      </div>
                      <h3 className="networkpage-name">{user.name}</h3>
                      <p className="networkpage-education">{user.education}</p>
                      <p className="networkpage-description">
                        {user.description}
                      </p>
                      <div
                        className="networkpage-connect-icon"
                        onClick={handleConnectClick}
                      >
                        <img src={connectsvg} alt="Connect" />
                      </div>
                      <div className="networkpage-stats">
                        <span>{user.connections} connect</span>
                        <span>{user.collaborations} collaborate</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="networkpage-buttons">
                <button
                  className="networkpage-action-btn"
                  onClick={handleCatchUpClick}
                >
                  CATCH UP
                </button>
                <button
                  className="networkpage-action-btn"
                  onClick={handleRequestClick}
                >
                  REQUEST
                </button>
                <button onClick={fetchPendingRequests} className="networkpage-action-btn">
                  NEW CONNECTION
                </button>
              </div>
            </div>
          </div>
          {isMobile && <MobileFooter />}
        </div>
      </div>
      {showRightSection && (
        <div className="Networkpage-rightsection">
          <DesktopRightsection
            className="Networkpage-rightsection-1"
            onClose={handleCloseRightSection}
          />
        </div>
      )}
    </div>
  );
}

export default NetworkPage;
