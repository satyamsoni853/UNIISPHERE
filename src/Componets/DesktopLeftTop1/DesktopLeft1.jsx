import React from 'react';
import './DesktopLeft1.css';
import DesktopLeft1image1 from './DesktopLeft1image1.png';
import DesktopLeft1image2 from './DesktopLeft1image2.png';
import DesktopLeft1image3 from './DesktopLeft1image3.png';

function DesktopLeft1() {
  return (
    <div className="leftsectiontop">
      <h3 className="leftsectiontop-heading">Upcoming Events</h3>

      {/* Event 1 */}
      <div className="leftsectiontop-event">
        <img src={DesktopLeft1image1} alt="Event 1" className="leftsectiontop-image" />
        <div className="leftsectiontop-details">
          <p className="leftsectiontop-date">26 Jan 2025</p>
          <p className="leftsectiontop-location">University of Delhi</p>
        </div>
        <a href="#" className="leftsectiontop-link">Read More</a>
      </div>

      {/* Event 2 */}
      <div className="leftsectiontop-event">
        <img src={DesktopLeft1image2} alt="Event 2" className="leftsectiontop-image" />
        <div className="leftsectiontop-details">
          <p className="leftsectiontop-date">26 Jan 2025</p>
          <p className="leftsectiontop-location">University of Delhi</p>
        </div>
        <a href="#" className="leftsectiontop-link">Read More</a>
      </div>

      {/* Event 3 */}
      <div className="leftsectiontop-event">
        <img src={DesktopLeft1image3} alt="Event 3" className="leftsectiontop-image" />
        <div className="leftsectiontop-details">
          <p className="leftsectiontop-date">26 Jan 2025</p>
          <p className="leftsectiontop-location">University of Delhi</p>
        </div>
        <a href="#" className="leftsectiontop-link">Read More</a>
      </div>

      <p className="leftsectiontop-button">See All</p>
    </div>
  );
}

export default DesktopLeft1;
