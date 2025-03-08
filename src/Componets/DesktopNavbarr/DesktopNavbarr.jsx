import React from 'react';
import './DesktopNavbarr.css';
import Addicon from './Addicon.png';
import Clendericon from './Clendericon.png';
import Homeicon from './Homeicon.png';
import Messageicon from './Messageicon.png';
import Networkicon from './Networkicon.png';
import Nottificationicon from './Notificationicon.png';
import Usericon from './Usericon.png';
import Unispherelogoicon from './Unispherelogoicon.png';

function DesktopNavbarr() {
  return (
    <div className="desktop-navbar">
      <img src={Homeicon} alt="Home" className="desktop-icon" />
      <img src={Networkicon} alt="Network" className="desktop-icon" />
      <img src={Clendericon} alt="Calendar" className="desktop-icon" />
      <img src={Addicon} alt="Add" className="desktop-icon" />
      <img src={Messageicon} alt="Messages" className="desktop-icon" />
      <img src={Nottificationicon} alt="Notifications" className="desktop-icon" />
      <img src={Usericon} alt="User" className="desktop-user-icon" />
      <input type="text" placeholder="Search" className="desktop-search-bar" />
      <img src={Unispherelogoicon} alt="Unisphere Logo" className="desktop-logo-icon" />
    </div>
  );
}

export default DesktopNavbarr;
