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
];

function DesktopRightsection() {
  const [connections, setConnections] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  // Get authentication data from localStorage
  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  useEffect(() => {
    const fetchConnections = async () => {
      // Get auth data
      const authData = getAuthData();

      if (!authData) {
        console.error("No authentication data available");
        setError("Authentication required");
        return;
      }

      try {
        // Using fetch API
        const response = await fetch("https://uniisphere-1.onrender.com/api/connections", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authData.token}` // Use token from localStorage
          }
          // Note: For GET requests, don't include body parameter
        });

        // Alternative using axios:
        // const response = await axios.get("https://uniisphere-1.onrender.com/api/connections", {
        //   headers: { Authorization: `Bearer ${authData.token}` }
        // });


        console.log("response is:", response);
        if (!response.ok) {
          throw new Error(`Failed to fetch connections: ${response.status}`);
        }

        const data = await response.json();

        // Set user ID from auth data or response
        const currentUserId = authData.userId || data.connections[0]?.userId;
        setUserId(currentUserId);

        // Calculate total connections
        const totalConnections = data.connections?.length || 0;
        setConnections(totalConnections);

        // Assuming followers are calculated elsewhere
        setFollowers(0);

      } catch (error) {
        console.error("Error fetching connections:", error);
        setError("Failed to load connections");
      }
    };

    fetchConnections();
  }, []); // Only run once on component mount
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
              <span>{connections}</span> {/* Dynamically display connections */}
              <span>{followers}</span>   {/* Dynamically display followers */}
            </div>
            <img src={ConnectandCollbrate} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
      <h3 className="profile-name">Rahul Verma</h3>
      <p className="profile-company">Uniisphere</p>
      <p className="profile-location">New Delhi, Delhi</p>
      <p className="profile-bio">
        {isExpanded
          ? "The actual idea of Uniisphere was of The Founder Himanshu who worked for months to this all-time dream and made it a success with the team and resources they gathered together."
          : "The actual idea of Uniisphere was of The Founder Himanshu who worked for months to this all-time ...."}  
        <span className="see-more" onClick={toggleBio} style={{ color: "blue", cursor: "pointer" }}>
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
              <button><img className="connect-btn" src={Connectimage} alt="" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesktopRightsection;
