import React from "react";
import "./MobileMiddlesection.css";
import MobileNavbarr from "../MobileNavbarr/MobileNavbarr";
import MobileFooter from "../Mobilefooter/MobileFooter";
import ConnectMidlleimage from "./middleconnectimage.png";
import MiddlemainImage from "./Middle-image-main.png";
import Profileimage from "./Profile-image.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { PiShareFatThin } from "react-icons/pi";
import Background from "../Background/Background";
import Smallimage1 from "./small-image1.png";
import Smallimage2 from "./small-image2.png";
import Smallimage3 from "./small-image3.png";
import Smallimage4 from "./small-image4.png";
import Smallimage5 from "./small-image5.png";
import Smallimage6 from "./small-image6.png";
import Smallimage7 from "./small-image7.png";
import Smallimage8 from "./small-image8.png";

function MobileMiddlesection() {
  return (
    <div className="mobile-middlesection">
      {/* Profile Section */}
      <div className="mobile-profile-header">
        <div className="mobile-profile-info">
          <img
            src={Profileimage}
            alt="Profile"
            className="mobile-profile-pic"
          />
          <div className="mobile-profile-details">
            <span className="mobile-profile-name">
              Vijay Prasad <span>18h</span>
            </span>
            <p className="mobile-profile-desc">
              University of Delhi | Works at Google
            </p>
          </div>
        </div>
        <div className="mobile-profile-actions">
          <img
            src={ConnectMidlleimage}
            alt="Connect"
            className="mobile-connect-image"
          />
          <BsThreeDotsVertical className="mobile-options-icon" />
        </div>
      </div>

      {/* Main Content Image */}
      <div className="mobile-middlesection">
        {/* Main Image (Centered) */}
        <div className="mobile-main-image">
          <img
            src={MiddlemainImage}
            alt="Main"
            className="mobile-content-image"
          />
        </div>

        {/* Left Side (3 Images) - Positioned behind */}
        <div className="side-images-left-images">
          <img src={Smallimage1} alt="Left 1" className="side-image-mobile" />
          <img src={Smallimage2} alt="Left 2" className="side-image-mobile" />
          <img src={Smallimage3} alt="Left 3" className="side-image-mobile" />
        </div>

        {/* Right Side (4 Images) - Positioned behind the main image */}
        <div className="side-images-right-images">
          <img src={Smallimage4} alt="Right 1" className="side-image-mobile" />
          <img src={Smallimage7} alt="Right 2" className="side-image-mobile" />
          <img src={Smallimage7} alt="Right 3" className="side-image-mobile" />
          <img src={Smallimage8} alt="Right 4" className="side-image-mobile" />
        </div>
      </div>

      {/* Action Bar with Likes and Icons */}
      <div className="mobile-action-bar">
        <span className="mobile-like-count">1.2k Likes</span>
        <div className="mobile-action-icons">
          <CiHeart className="mobile-icon" />
          <TfiCommentsSmiley className="mobile-icon" />
          <PiShareFatThin className="mobile-icon" />
        </div>
      </div>

      {/* Post Text */}
      <p className="mobile-post-text">
        <span className="mobile-post-author">Vijay Prasad</span> Been have
        evolved to go in the university and will probably prefer the university
        of... <span className="mobile-see-more">more</span>
      </p>
    </div>
  );
}

export default MobileMiddlesection;
