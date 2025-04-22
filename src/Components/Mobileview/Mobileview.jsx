import React from 'react';
import Background from '../Background/Background';
import MobileFooter from '../Mobilefooter/MobileFooter';
import MobileNavbar from '../MobileNavbar/MobileNavbar';
import MobileMiddleSection from '../MobileMiddlesection/MobileMiddlesection'
import './Mobileview.css';

function Mobileview() {
  return (
    <div className="mobile-view-container">
      <Background />
      <MobileNavbar />
      <MobileMiddleSection />
      <MobileFooter />
    </div>
  );
}

export default Mobileview;
