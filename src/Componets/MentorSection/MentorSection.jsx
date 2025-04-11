import React, { useState } from "react";
import './MentorSection.css'; 
import photoIcon from "./ProfileIcon.png";
import profilePhoto from "./profilephoto.png";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import svg1 from "./svg1.svg";
import person3 from "./person3.svg";
import person5 from "./person5.svg";
import person2 from "./person2.svg";
import person4 from "./person4.svg";
import person6 from "./person6.svg";
import svg2 from "./svg2.svg";
import svg3 from "./svg3.svg";
import svg4 from "./svg4.svg";

import svg6 from "./svg6.svg";
const MentorSection = () => {
  // Mentor data managed with useState
  const [mentors, setMentors] = useState([
    {
      name: "Yash Jadoun",
      title: "Product Designer",
      image: profilePhoto,
      mentees: "15k",
      company: "Google",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
    {
      name: "Yash Jadoun",
      title: "Product Designer",
      image: profilePhoto,
      mentees: "15k",
      company: "Google",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
    {
      name: "Yash Jadoun",
      title: "Product Designer",
      image: profilePhoto,
      mentees: "15k",
      company: "Google",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
  ]);

  return (
    <div className="mentor-mobile-container">
      {/* Mentors for You Section */}
      <div className="mentor-mobile-mentors-for-you">
        <div className="mentor-mobile-top-left-section">
          <h2 className="mentor-mobile-title">Mentors for You</h2>
          <div className="mentor-mobile-description">
            <span>Get Connected to the Best Mentors.</span>
            <p>Book and Meet with the experts in their respective fields.</p>

            <div className="mentor-mobile-settings-search">
              <input
                type="text"
                placeholder="Search"
                className="mentor-mobile-settings-search-bar"
              />
            </div>
          </div>
        </div>
        <div className="mentor-mobile-profile-stack">
          <img src={svg1} alt="" />

          <div className="mentor-mobile-profile-stack-image-con">
            <img src={svg2} alt="" />
            <img
              className="mentor-mobile-profile-stack-image2"
              src={person2}
              alt=""
            />
          </div>
          <div className="mentor-mobile-profile-stack-image-con">
            <img src={svg3} alt="" />
            <img
              className="mentor-mobile-profile-stack-image3"
              src={person3}
              alt=""
            />
          </div>
          <div className="mentor-mobile-profile-stack-image-con">
            <img src={svg4} alt="" />
            <img
              className="mentor-mobile-profile-stack-image4"
              src={person4}
              alt=""
            />
          </div>

          <img src={person5} alt="" />
          <div className="mentor-mobile-profile-stack-image-con">
            <img src={svg6} alt="" />
            <img
              className="mentor-mobile-profile-stack-image6"
              src={person6}
              alt=""
            />
          </div>
        
        </div>
      </div>

      {/* Top Mentor Section */}
      <div className="mentor-mobile-top-mentor">
        <div className="mentor-mobile-top-header">
          <h2 className="mentor-mobile-title">Top Mentor</h2>
          <Link href="#" className="mentor-mobile-see-all">
            See All{" "}
            <span>
              {" "}
              <IoIosArrowForward />{" "}
            </span>
          </Link>
        </div>
        <div className="mentor-mobile-card-list">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-mobile-card">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="mentor-mobile-card-img"
              />
              <div className="mentor-mobile-card-info">
                <h3 className="mentor-mobile-card-name">{mentor.name}</h3>
                <p className="mentor-mobile-card-title">{mentor.title}</p>
                <div className="mentor-mobile-card-company-logo-and-image">
                  <img
                    className="mentor-mobile-card-company-logo"
                    src={photoIcon}
                    alt=""
                  />
                  <span className="mentor-mobile-card-company-name">
                    {mentor.company}
                  </span>
                </div>
                <div className="mentor-mobile-mantess-image-and-data">
                  <img
                    className="mentor-mobile-mantess-image"
                    src={photoIcon}
                    alt=""
                  />
                  <img
                    className="mentor-mobile-mantess-image"
                    src={photoIcon}
                    alt=""
                  />
                  <img
                    className="mentor-mobile-mantess-image"
                    src={photoIcon}
                    alt=""
                  />
                  <span className="mentor-mobile-card-mentees">
                    {mentor.mentees}+ Mentees
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorSection;
