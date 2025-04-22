import React from 'react';
import Background from '../Background/Background';
import MobileFooter from '../MobileFooter/MobileFooter'; // Corrected to PascalCase
import MobileNavbar from '../MobileNavbar/MobileNavbar';
import MobileMiddleSection from '../MobileMiddleSection/MobileMiddleSection'; // Removed .jsx
import './MobileViewSection.css'; // Corrected CSS file name for consistency

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