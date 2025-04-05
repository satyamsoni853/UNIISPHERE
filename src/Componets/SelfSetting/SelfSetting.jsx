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

import { IoIosArrowForward } from "react-icons/io";
import blockedPhoto from "./blockedPhoto.png";

import ProfileIcon from "./ProfileIcon.png";
import BackIcon from "./backsvg.svg";
import { Search } from "lucide-react";

function SelfSetting({ onSignOut }) {
  // ============ ALL DATA NEEDED ===============
  const [showDefault, setShowDefault] = useState(true);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showPasswordSecurity, setShowPasswordSecurity] = useState(false);
  const [showSignedInLocation, setShowSignedInLocation] = useState(false);
  const [showVisibility$Permisons, setShowVisibilty$Permisons] =
    useState(false);
  const [showCollab, setShowCollab] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showConnectionPermisons, setShowConnectionPermisons] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const handleAllClick = (
    deFault = true,
    account = false,
    passowordSecurity = false,
    signedIn = false,
    visibiltyandPermisons = false,
    collab = false,
    connectionPermisons = false,
    block = false
  ) => {
    setShowDefault(deFault);
    setShowAccounts(account);
    setShowPasswordSecurity(passowordSecurity);
    setShowSignedInLocation(signedIn);
    setShowVisibilty$Permisons(visibiltyandPermisons);
    setShowCollab(collab);
    setShowConnectionPermisons(connectionPermisons);
    setShowBlock(block);
  };

  const personalInfo = [
    {
      paragraph: "eufblefudfsk, lhwcfueblfubftr yg hbftr ygyuifudfsk, aiu...",
      username: "Himanshu001",
      gmail: "himanshu0451@gmail.com",
      phoneNumber: "9111111111",
      dob: "01/02/2004",
      gender: "Male",
    },
  ];

  const blockedUsers = [
    {
      id: 1,
      name: "Vijay Prasad",
      message: "Hello brother how are you. I ....",
      blockedPhoto: blockedPhoto,
    },
    {
      id: 2,
      name: "Vijay Prasad",
      message: "Hello brother how are you. I ....",
      blockedPhoto: blockedPhoto,
    },
    {
      id: 3,
      name: "Vijay Prasad",
      message: "Hello brother how are you. I was ....",
      blockedPhoto: blockedPhoto,
    },
    {
      id: 4,
      name: "Vijay Prasad",
      message: "Hello brother how are you. I was ....",
      blockedPhoto: blockedPhoto,
    },
  ];

  // ==============================COMPLETE DATA MODIFIED BY THE SACHIN PAL =======================

  const [autoPlayVideo, setAutoPlayVideo] = useState(true);

  const toggleAutoPlay = () => {
    setAutoPlayVideo(!autoPlayVideo);
  };

  // MOBILE DATA IN THE DIV

  const [showMobileAccounts, setShowMobileAccounts] = useState(false);
  const [showMobileDefault, setShowMobileDefault] = useState(true);

  const [showMobilePasswordSecurity, setShowMobilePasswordSecurity] =
    useState(false);
  const [showMobileYourActivity, setShowMobileYourActivity] = useState(false)

  return (
    <>
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
            <div
              onClick={() => {
                handleAllClick(true);
              }}
              className="settings-menu-item"
            >
              <VscAccount className="settings-icon" />
              <span>Accounts</span>
              <span className="settings-arrow"></span>
            </div>
            <div
              onClick={() => {
                handleAllClick(false, false, true);
              }}
              className="settings-menu-item"
            >
              <TbLockPassword className="settings-icon" />
              <span>Password & Security</span>
              <span className="settings-arrow"></span>
            </div>
            <div
              onClick={() => {
                handleAllClick(false, false, false, false, true);
              }}
              className="settings-menu-item"
            >
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
          <div className="settings-sign-out">
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
          {showDefault && (
            <div className="settings-wrapper-container">
              <div
                onClick={() => {
                  handleAllClick(false, true);
                }}
                className="settings-submenu-item"
              >
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
          )}

          {/* ## ====================PROFILE DETAIL BOX ==================## */}
          {showAccounts && (
            <div className="settings-profile-main-container">
              <div className="settings-profile-personal-details-section">
                <div className="settings-profile-personal-heading-and-paragraph">
                  <h2>Personal Details</h2>
                  <p>
                    eufblefudfsk, lhwcfueblfubftr yg hbftr ygyuifudfsk, aiu...
                  </p>
                </div>
                <div className="settings-profile-information-of-profile">
                  <div className="settings-profile-field">
                    <div className="settings-profile-main-headline">
                      User Name
                    </div>
                    <div className="settings-profile-value-headline">
                      Himanshu001
                    </div>
                  </div>
                  <div className="settings-profile-field">
                    <div className="settings-profile-main-headline">
                      Contact Information
                    </div>
                    <div className="settings-profile-value-headline">
                      himanshu0451@gmail.com • 9111111111
                    </div>
                  </div>
                  <div className="settings-profile-field">
                    <div className="settings-profile-main-headline">
                      Date of Birth
                    </div>
                    <div className="settings-profile-value-headline">
                      01/02/2004
                    </div>
                  </div>
                  <div className="settings-profile-field">
                    <div className="settings-profile-main-headline">Gender</div>
                    <div className="settings-profile-value-headline">Male</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ## ===============PASSWORD AND SECURITY CODE ================## */}
          {showPasswordSecurity && (
            <div className="passoword-security-main-container">
              <div className="password-security-section">
                <div className="settings-submenu-item">
                  <span>Email</span>
                  <div className="data-and-arrow">
                    <span>karti****7@gmail.com</span>
                    <span className="settings-arrow">
                      <IoIosArrowForward />{" "}
                    </span>
                  </div>
                </div>
                <div className="settings-submenu-item">
                  <span>Phone Number</span>
                  <div className="data-and-arrow">
                    <span>+91 95********94</span>
                    <span className="settings-arrow">
                      <IoIosArrowForward />{" "}
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => {
                    handleAllClick(false, false, false, true);
                  }}
                  className="settings-submenu-item"
                >
                  <span>When you signed in</span>
                  <span className="settings-arrow"></span>
                </div>
                <div className="settings-submenu-item">
                  <span>Device remember your password</span>
                  <span className="settings-arrow"></span>
                </div>
                <div className="settings-submenu-item">
                  <span>Two step verification</span>
                  <span className="settings-arrow"></span>
                </div>
              </div>
            </div>
          )}

          {/* =================================WHERE YOU LOGGED IN CODE ================================== */}
          {showSignedInLocation && (
            <div className="settings-whereLoggedIn-main-container">
              <div className="settings-whereLoggedIn-personal-details-section">
                <div className="settings-whereLoggedIn-personal-heading-and-paragraph">
                  <h2>Where you are signed in</h2>
                  <p>
                    We do keep the record where your account was logged in as to
                    help you in later cases.
                  </p>
                </div>
                <div className="settings-whereLoggedIn-information-of-whereLoggedIn">
                  <div className="settings-whereLoggedIn-field">
                    <div className="settings-whereLoggedIn-main-headline">
                      Samsung A50
                    </div>
                    <div className="settings-whereLoggedIn-value-headline">
                      Maharastra , India
                    </div>
                  </div>
                  <div className="settings-whereLoggedIn-field">
                    <div className="settings-whereLoggedIn-main-headline">
                      Vivo V15
                    </div>
                    <div className="settings-whereLoggedIn-value-headline">
                      New Delhi , India
                    </div>
                  </div>
                  <div className="settings-whereLoggedIn-field">
                    <div className="settings-whereLoggedIn-main-headline">
                      Redmi Note 10S
                    </div>
                    <div className="settings-whereLoggedIn-value-headline">
                      Kashmir, India
                    </div>
                  </div>
                  <div className="settings-whereLoggedIn-field">
                    <div className="settings-whereLoggedIn-main-headline">
                      Lenvo
                    </div>
                    <div className="settings-whereLoggedIn-value-headline">
                      Kerla ,India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 
 =========================VISBILITY AND PERMISONS CODE ===============================        */}

          {showVisibility$Permisons && (
            <div className="settings-visibiltyandPermisons-items">
              <div
                onClick={() => {
                  handleAllClick(
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true
                  );
                }}
                className="settings-visibiltyandPermisons-item"
              >
                <span>Who can see your connection</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div
                onClick={() => {
                  handleAllClick(false, false, false, false, false, true);
                }}
                className="settings-visibiltyandPermisons-item"
              >
                <span>Who can see your collab</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div
                onClick={() => {
                  handleAllClick(
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    true
                  );
                }}
                className="settings-visibiltyandPermisons-item"
              >
                <span>Blocked</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="settings-visibiltyandPermisons-item">
                <span>Hide</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="settings-visibiltyandPermisons-item">
                <span>Activity Status</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="settings-visibiltyandPermisons-item">
                <span>Account Privacy</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="settings-visibiltyandPermisons-item">
                <span>Mention by others</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="settings-visibiltyandPermisons-item">
                <span>Restricted</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="settings-visibiltyandPermisons-item">
                <span>Content prefernces</span>
                <span className="settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
            </div>
          )}

          {/* ================================== WHO CAN SEE MY CONNECTION CODE ===========================================         */}

          {showConnectionPermisons && (
            <div className="settings-connectionPermisons-Parentcontainer">
              <div className="settings-connectionPermisons-blue-box">
                <div className="settings-connectionPermisons-heading-and-para">
                  <h2 className="settings-connectionPermisons-main-heading">
                    Who can see your connection
                  </h2>
                  <p className="settings-connectionPermisons-description">
                    Allow your connections to see other peoples who are
                    connected to you.
                  </p>
                </div>

                <div className="settings-connectionPermisons-toggle-container">
                  <div className="settings-connectionPermisons-toggle-and-heading">
                    <div className="settings-connectionPermisons-heading">
                      Visibilty
                    </div>
                    <div className="settings-connectionsPermisons-toggle">
                      <label className="settings-connectionPermisons-switch">
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={handleToggle}
                        />
                        <span className="settings-connectionPermisons-slider settings-connectionPermisons-round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCollab && (
            <div className="settings-collabPermisions-Parentcontainer">
              <div className="settings-collabPermisions-blue-box">
                <div className="settings-collabPermisions-heading-and-para">
                  <h2 className="settings-collabPermisions-main-heading">
                    Who can see your connection
                  </h2>
                  <p className="settings-collabPermisions-description">
                    Allow your connections to see other peoples who are
                    connected to you.
                  </p>
                </div>

                <div className="settings-collabPermisions-toggle-container">
                  <div className="settings-collabPermisions-toggle-and-heading">
                    <div className="settings-collabPermisions-heading">
                      Visibilty
                    </div>
                    <div className="settings-connectionsPermisons-toggle">
                      <label className="settings-collabPermisions-switch">
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={handleToggle}
                        />
                        <span className="settings-collabPermisions-slider settings-collabPermisions-round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= BLOCKED CODE ===================================== */}

          {showBlock && (
            <div className="settings-blocked-main-parent">
              <div className="settings-blocked-container">
                <h1 className="settings-blocked-title">Accounts you Blocked</h1>
                <p className="settings-blocked-description">
                  You can block people who you do not want to see.
                </p>

                <div className="settings-blocked-list">
                  {blockedUsers.map((user) => (
                    <div key={user.id} className="settings-blocked-user-item">
                      <div className="settings-blocked-user-info">
                        <img src={user.blockedPhoto} alt="" />
                        <div className="settings-name-and-para">
                          <h3 className="settings-blocked-user-name">
                            {user.name}
                          </h3>
                          <p className="settings-blocked-user-message">
                            {user.message}
                          </p>
                        </div>
                      </div>
                      <button className="settings-blocked-unblock-btn">
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===============================================================================MOBILE DIV CODE======================================================================== */}
      <div className="mobile-settings-main-container">
        {showMobileDefault && (
          <div className="mobile-settings-menu">
            <div className="mobile-settings-heading-and-backIcon">
              <img src={BackIcon} alt="" />
              <h1>Settings</h1>
            </div>
            {/* Profile section */}
            <div className="mobile-settings-profile-section">
              <div className="mobile-settings-profile-image-and-name">
                <img src={ProfileIcon} alt="" />
                <div className="mobile-settings-profile-name-and-desc">
                  <span className="mobile-settings-profile-name-and-desc-name">
                    Anuj Patel
                  </span>
                  <span className="mobile-settings-profile-name-and-desc-para">
                    Edit your personal profile
                  </span>
                </div>
              </div>
              <IoIosArrowForward className="mobile-settings-arrow" />
            </div>{" "}
            {/* Search Bar */}
            <div className="mobile-settings-search">
              <input
                type="text"
                placeholder="Search"
                className="mobile-settings-search-bar"
              />
              <span className="mobile-settings-search-icon">
                {" "}
                <Search />{" "}
              </span>
            </div>
            {/* Menu Items */}
            <div className="mobile-settings-menu-items">
              <div
                onClick={() => {
                  setShowMobileAccounts(true);
                  setShowMobileDefault(false);
                  setShowMobilePasswordSecurity(false);
                  setShowMobileYourActivity(false)
                }}
                className="mobile-settings-menu-item"
              >
                <div className="mobile-settings-text-and-icon">
                  <VscAccount className="mobile-settings-icon" />
                  <span>Accounts</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div
                onClick={() => {
                  setShowMobileDefault(false);
                  setShowMobileAccounts(false);
                  setShowMobilePasswordSecurity(true);
                  setShowMobileYourActivity(false)
                }}
                className="mobile-settings-menu-item"
              >
                <div className="mobile-settings-text-and-icon">
                  <TbLockPassword className="mobile-settings-icon" />
                  <span>Password & Security</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <MdOutlineVisibilityOff className="mobile-settings-icon" />
                  <span>Visibility & Permission</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div
              onClick={()=>{
                setShowMobileYourActivity(true)
                setShowMobileDefault(false);
                  setShowMobileAccounts(false);
                  setShowMobilePasswordSecurity(false);
              }}
              className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <CiTimer className="mobile-settings-icon" />
                  <span>Your Activity</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <IoMdPeople className="mobile-settings-icon" />
                  <span>Help Center</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <SiGnuprivacyguard className="mobile-settings-icon" />
                  <span>Privacy & Policy</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <FaBook className="mobile-settings-icon" />
                  <span>User Agreement</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <RiCommunityFill className="mobile-settings-icon" />
                  <span>Community Guidelines</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-menu-item">
                <div className="mobile-settings-text-and-icon">
                  <FcAbout className="mobile-settings-icon" />
                  <span>About</span>
                </div>
                <span className="mobile-settings-arrow">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              {/* Sign Out and Add Account  */}
              <div className="mobile-settings-addAccount-and-signout-mainParent">
                <h2>Login</h2>
                <div className="mobile-settings-addAccount-and-signout">
                  <Link to="/" className="  mobile-settings-addAccount">
                    <span className="mobile-settings-addAccount">
                      Add Account
                    </span>
                  </Link>
                  <Link to="/" className="  mobile-settings-sign-out">
                    <span className="mobile-settings-sign-out">Sign Out</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*============= Accounts section in the mobile settings ================*/}

        {showMobileAccounts && (
          <div className="mobile-settings-wrapper-container">
            <div className="mobile-settings-heading-and-backIcon">
              <img
                onClick={() => {
                  setShowMobileAccounts(false);
                  setShowMobileDefault(true);
                
                }}
                src={BackIcon}
                alt=""
              />
              <h1>Accounts</h1>
            </div>

            <div className="mobile-settings-search">
              <input
                type="text"
                placeholder="Search"
                className="mobile-settings-search-bar"
              />
              <span className="mobile-settings-search-icon">
                {" "}
                <Search />{" "}
              </span>
            </div>
            <div className="mobile-settings-submenu-container">
              <div className="mobile-settings-submenu-item">
                <span>Personal Details</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Language</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Auto Play Video</span>
                <label className="mobile-settings-toggle">
                  <input
                    type="checkbox"
                    checked={autoPlayVideo}
                    onChange={toggleAutoPlay}
                    className="mobile-settings-toggle-input"
                  />
                  <span className="mobile-settings-toggle-slider"></span>
                </label>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Preferred Feed View</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Sync Contact</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Update for Free</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>View Purchase History</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Account Management</span>
                <span className="mobile-settings-arrow"> </span>
              </div>
            </div>
          </div>
        )}
        {/* =============================================================================Mobile Section Password and the secuity ============================================================================================================================= */}
        {showMobilePasswordSecurity && (
          <div className="mobile-settings-wrapper-container">
            <div className="mobile-settings-heading-and-backIcon">
              <img
                onClick={() => {
                
                  setShowMobileDefault(true);
                  setShowMobilePasswordSecurity(false);
                }}
                src={BackIcon}
                alt=""
              />
              <h1>Password And Security</h1>
            </div>

            <div className="mobile-settings-search">
              <input
                type="text"
                placeholder="Search"
                className="mobile-settings-search-bar"
              />
              <span className="mobile-settings-search-icon">
                {" "}
                <Search />{" "}
              </span>
            </div>
            <div className="mobile-settings-submenu-container">
              <div className="mobile-settings-submenu-item">
                <span>Email</span>
                <div className="mobile-data-and-arrow">
                  <span>karti****7@gmail.com</span>
                  <span className="mobile-settings-arrow">
                    <IoIosArrowForward />{" "}
                  </span>
                </div>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Phone Number</span>
                <div className="mobile-data-and-arrow">
                  <span> +91 95******89</span>
                  <span className="mobile-settings-arrow">
                    <IoIosArrowForward />{" "}
                  </span>
                </div>
              </div>

              <div className="mobile-settings-submenu-item">
                <span>Where you are signed in</span>
                <div className="mobile-data-and-arrow">
                  <span>3</span>
                  <span className="mobile-settings-arrow">
                    <IoIosArrowForward />{" "}
                  </span>
                </div>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Device remember your password</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Two step verification</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================================Mobile Section Your Activity ============================================================================================================================= */}
        {showMobileYourActivity && (
          <div className="mobile-settings-wrapper-container">
            <div className="mobile-settings-heading-and-backIcon">
              <img
                onClick={() => {
                   
                  setShowMobileDefault(true);
                  setShowMobileYourActivity(false)
                }}
                src={BackIcon}
                alt=""
              />
              <h1>Your Activity</h1>
            </div>

            <div className="mobile-settings-search">
              <input
                type="text"
                placeholder="Search"
                className="mobile-settings-search-bar"
              />
              <span className="mobile-settings-search-icon">
                {" "}
                <Search />{" "}
              </span>
            </div>
            <div className="mobile-settings-submenu-container">
              <div className="mobile-settings-submenu-item">
                <span>Search History</span>
                <div className="mobile-data-and-arrow">
                  <span>Clear</span>
                 <span className="mobile-settings-arrow">
                   <IoIosArrowForward />{" "}
                 </span>
                 </div>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Who can see your connection</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
             
              <div className="mobile-settings-submenu-item">
                <span>Who can see your collabs</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Device remember your password</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Blocked</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Hide</span>
                <span className="mobile-settings-arrow">
                  <IoIosArrowForward />{" "}
                </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Activity Status</span>
                <span className="mobile-settings-arrow"> </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Mentions by others</span>
                <span className="mobile-settings-arrow"> </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Restricted</span>
                <span className="mobile-settings-arrow"> </span>
              </div>
              <div className="mobile-settings-submenu-item">
                <span>Content Preferences</span>
                <span className="mobile-settings-arrow"> </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SelfSetting;
