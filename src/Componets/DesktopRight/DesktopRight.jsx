import React from "react";
import "./DesktopRight.css";
import Profileimg from "./Profile.jpeg";
import ConnectandCollbrate from "./Connect&coll.png";
import Sugestion1img from "./Sugestion1.png";
import Sugestion2img from "./Sugestion2.png";
import Sugestion3img from "./Sugestion3.png";
import Connectimage from "./Connect.png";

const suggestions = [
  { img: Sugestion1img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion2img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion1img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion2img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
];

function DesktopRightsection() {
  return (
    <div className="right-section-container">
      <div className="rightsection">
      {/* Profile Section */}
      <div className="profile-card">
        <img src={Profileimg} alt="Profile" className="profile-image" />
        <div className="profile-right">
          <div className="profile-numbers">
            <span>254</span>
            <span>579</span>
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
          The actual idea of Uniisphere was of The Founder Himanshu who worked for months to this all time ....
          <span className="see-more"> see more</span>
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