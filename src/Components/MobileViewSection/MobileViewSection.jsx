import React from 'react';
import Background from '../Background/Background';

import MobileNavbar from '../MobileNavbar/MobileNavbar';
import MobileMiddleSection from '../MobileMiddleSection/MobileMiddleSection.jsx' // Removed .jsx
import './MobileViewSection.css'; // Corrected CSS file name for consistency
import MobileFooter from '../MobileFooter/MobileFooter.jsx';

function MobileViewSection() { // Corrected component name
  return (
    <div className="mobile-view-container">
      <Background />
      <MobileNavbar />
      <MobileMiddleSection />
      <MobileFooter />
    </div>
  );
}

export default MobileViewSection; // Corrected export name