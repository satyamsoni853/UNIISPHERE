import React from 'react';
import Background from '../Background/Background.jsx'; // Added .jsx for consistency
import MobileNavbar from '../MobileNavbar/MobileNavbar.jsx'; // Added .jsx for consistency
import MobileMiddleSection from '../MobileMiddleSection/MobileMiddleSection.jsx'
import MobileFooter from '../MobileFooter.jsx'; // Corrected path assuming file is in src/Components/
import './MobileViewSection.css';

function MobileViewSection() {
  return (
    <div className="mobile-view-container">
      <Background />
      <MobileNavbar />
      <MobileMiddleSection />
      <MobileFooter />
    </div>
  );
}

export default MobileViewSection;