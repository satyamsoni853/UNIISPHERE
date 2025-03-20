import React, { useEffect, useState } from "react";
import ConnectandCollbrate from "./Connect&coll.png";
import Connectimage from "./Connect.png";
import "./DesktopRight.css";
import Profileimg from "./Profile.jpeg";
import Sugestion1img from "./Sugestion1.png";
import Sugestion2img from "./Sugestion2.png";
import Sugestion3img from "./Sugestion3.png";

const suggestions = [
  { img: Sugestion1img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion2img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion1img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion2img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  // { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  // { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
];

function DesktopRightsection() {
  const [connections, setConnections] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: "Rahul Verma", // Default value
    location: "New Delhi, Delhi", // Default value
    about: "The actual idea of Uniisphere was of The Founder Himanshu who worked for months to this all-time dream and made it a success with the team and resources they gathered together.", // Default value
    college: "Uniisphere", // Default value
  });

  // Get authentication data from localStorage
  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  // Fetch connections
  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController
    const fetchConnections = async () => {
      const authData = getAuthData();

      if (!authData) {
        console.error("No authentication data available");
        setError("Authentication required");
        return;
      }

      try {
        const response = await fetch("https://uniisphere-1.onrender.com/api/connections", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authData.token}`,
          },
          signal: abortController.signal, // Pass the abort signal
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch connections: ${response.status}`);
        }

        const data = await response.json();
        const currentUserId = authData.userId || data.connections[0]?.userId;
        setUserId(currentUserId);

        const totalConnections = data.connections?.length || 0;
        setConnections(totalConnections);
        setFollowers(0);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch connections aborted");
        } else {
          console.error("Error fetching connections:", error);
          setError("Failed to load connections");
        }
      }
    };

    fetchConnections();

    // Cleanup: Abort the fetch on unmount
    return () => {
      abortController.abort();
    };
  }, []);

  // Fetch profile data
  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController
    const fetchProfile = async () => {
      const authData = getAuthData();

      if (!authData) {
        console.error("No authentication data available");
        setError("Authentication required");
        return;
      }

      try {
        const response = await fetch(`https://uniisphere-1.onrender.com/getProfile/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-id": authData.userId, // Pass userId in the header
          },
          signal: abortController.signal, // Pass the abort signal
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        setProfileData({
          fullName: `${data.firstName} ${data.lastName}`,
          location: data.location,
          about: data.About,
          college: data.college,
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch profile aborted");
        } else {
          console.error("Error fetching profile:", error);
          setError("Failed to load profile");
        }
      }
    };

    fetchProfile();

    // Cleanup: Abort the fetch on unmount
    return () => {
      abortController.abort();
    };
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleBio = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="right-section-container">
      <div className="rightsection">
        {/* Profile Section */}
        <div className="profile-card">
          <img src={Profileimg} alt="Profile" className="profile-image" />
          <div className="profile-right">
            <div className="profile-numbers">
              <span>{connections}</span>
              <span>{followers}</span>
            </div>
            <img src={ConnectandCollbrate} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h3 className="profile-name">{profileData.fullName}</h3>
          <p className="profile-company">{profileData.college}</p>
          <p className="profile-location">{profileData.location}</p>
          <p className="profile-bio">
            {isExpanded
              ? profileData.about
              : `${profileData.about.substring(0, 100)}...`}
            <span
              className="see-more"
              onClick={toggleBio}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {isExpanded ? " see less" : " see more"}
            </span>
          </p>
        </div>

        {/* Suggested Connections Section */}
        <div className="suggested-cards">
          <h4 className="suggested-title">Suggestions</h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-card">
              <img src={suggestion.img} alt={suggestion.name} className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">{suggestion.name}</p>
                <p className="suggestion-university">{suggestion.university}</p>
              </div>
              <button>
                <img className="connect-btn" src={Connectimage} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesktopRightsection;