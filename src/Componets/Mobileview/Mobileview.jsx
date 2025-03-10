import React from 'react';
import Background from '../Background/Background';
import MobileFooter from '../Mobilefooter/MobileFooter';
import MobileNavbarr from '../MobileNavbarr/MobileNavbarr';
import MobileMiddlesection from '../MobileMiddlesection/MobileMiddlesection';
import './Mobileview.css';

function Mobileview() {
  return (
    <div className="mobile-view-container">
      <Background />
      <MobileNavbarr />
      <MobileMiddlesection />
      <MobileFooter />
    </div>
  );
}

export default Mobileview;
