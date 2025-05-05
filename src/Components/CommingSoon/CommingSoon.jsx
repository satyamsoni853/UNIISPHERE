import React from 'react';
import './CommingSoon.css';
import { Link } from 'react-router-dom';
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar';

function ComingSoon() {
  return (
  <div>
    <DesktopNavbar/>
      <div className="coming-soon-container">
      <h1 className="coming-soon-title">Coming Soon!</h1>
      <p className="coming-soon-message">
        We're working hard to bring you this feature. Stay tuned for updates!
      </p>
      <p className="coming-soon-sub-message">
        In the meantime, explore other parts of Uniisphere.
      </p>
      <Link to="/view" className="coming-soon-link">
        Back to Home
      </Link>
    </div>
  </div>
  );
}

export default ComingSoon;