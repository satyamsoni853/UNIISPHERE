import React from "react"; 
import "./DesktopLeftbottom.css";
import DesktopLeft1image1 from "./DesktopLeft1image1.png";
import DesktopLeft1image2 from "./DesktopLeft1image2.png";
import DesktopLeft1image3 from "./DesktopLeft1image3.png";

function DesktopLeftbottom() {
  return (
    <div className="leftsectionbottom-1">
      <h3 className="leftsectionbottom-1-heading">Upcoming Events</h3>

      {/* Event 1 */}
      <div className="leftsectionbottom-1-event">
        <img src={DesktopLeft1image1} alt="Event 1" className="leftsectionbottom-1-image" />
        <div className="leftsectionbottom-1-details">
          <p className="leftsectionbottom-1-date">26 Jan 2025</p>
          <p className="leftsectionbottom-1-location">University of Delhi</p>
        </div>
        <a href="#" className="leftsectionbottom-1-link">Read More</a>
      </div>

      {/* Event 2 */}
      <div className="leftsectionbottom-1-event">
        <img src={DesktopLeft1image2} alt="Event 2" className="leftsectionbottom-1-image" />
        <div className="leftsectionbottom-1-details">
          <p className="leftsectionbottom-1-date">26 Jan 2025</p>
          <p className="leftsectionbottom-1-location">University of Delhi</p>
        </div>
        <a href="#" className="leftsectionbottom-1-link">Read More</a>
      </div>

      {/* Event 3 */}
      <div className="leftsectionbottom-1-event">
        <img src={DesktopLeft1image3} alt="Event 3" className="leftsectionbottom-1-image" />
        <div className="leftsectionbottom-1-details">
          <p className="leftsectionbottom-1-date">26 Jan 2025</p>
          <p className="leftsectionbottom-1-location">University of Delhi</p>
        </div>
        <a href="#" className="leftsectionbottom-1-link">Read More</a>
      </div>

      <p className="leftsectionbottom-1-button">See All</p>
    </div>
  );
}

export default DesktopLeftbottom;
