import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SelfSetting.css";

// React Icons
import { VscAccount } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { IoMdPeople } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";
import { RiLogoutBoxLine } from "react-icons/ri";

function SelfSetting({ onSignOut }) {
  const [autoPlayVideo, setAutoPlayVideo] = useState(true);

  const toggleAutoPlay = () => {
    setAutoPlayVideo(!autoPlayVideo);
  };

  return (
    <div className="self-setting-container">
      <div className="settings-menu">
        <h1>Setting</h1>
        {/* Search Bar */}
        <div className="settings-search">
          <input
            type="text"
            placeholder="Search"
            className="settings-search-bar"
          />
          <span className="settings-search-icon">🔍</span>
        </div>

        {/* Menu Items */}
        <div className="settings-menu-items">
          <div className="settings-menu-item">
            <VscAccount className="settings-icon" />
            <span>Accounts</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <TbLockPassword className="settings-icon" />
            <span>Password & Security</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <MdOutlineVisibilityOff className="settings-icon" />
            <span>Visibility & Permission</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <CiTimer className="settings-icon" />
            <span>Your Activity</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <IoMdPeople className="settings-icon" />
            <span>Help Center</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <SiGnuprivacyguard className="settings-icon" />
            <span>Privacy & Policy</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <FaBook className="settings-icon" />
            <span>User Agreement</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <RiCommunityFill className="settings-icon" />
            <span>Community Guidelines</span>
            <span className="settings-arrow"></span>
          </div>
          <div className="settings-menu-item">
            <FcAbout className="settings-icon" />
            <span>About</span>
            <span className="settings-arrow"></span>
          </div>
        </div>

        {/* Sign Out */}
        <div className="settings-sign-out" >
        <Link
          to="/"
          className="settings-menu-item settings-sign-out"
          onClick={onSignOut}
        >
          
          <span className="settings-sign-out">Sign Out</span>
        </Link>
        </div>
      </div>

      <div className="settings-submenu">
        <div className="settings-submenu-item">
          <span>Personal Details</span>
          <span className="settings-arrow"></span>
        </div>
        <div className="settings-submenu-item">
          <span>Language</span>
          <span className="settings-arrow"></span>
        </div>
        <div className="settings-submenu-item">
          <span>Auto Play Video</span>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={autoPlayVideo}
              onChange={toggleAutoPlay}
              className="settings-toggle-input"
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
        <div className="settings-submenu-item">
          <span>Preferred Feed View</span>
          <span className="settings-arrow"></span>
        </div>
        <div className="settings-submenu-item">
          <span>Sync Contact</span>
          <span className="settings-arrow"></span>
        </div>
        <div className="settings-submenu-item">
          <span>Update for Free</span>
          <span className="settings-arrow"></span>
        </div>
        <div className="settings-submenu-item">
          <span>View Purchase History</span>
          <span className="settings-arrow"></span>
        </div>
        <div className="settings-submenu-item">
          <span>Account Management</span>
          <span className="settings-arrow"></span>
        </div>
      </div>
    </div>
  );
}

export default SelfSetting;