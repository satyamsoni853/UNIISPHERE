import React, { useState } from "react";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import Decktopleftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import Decklefttop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import DesktopMiddle from "../DesktopMiddle/DesktopMiddle.jsx";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import "./DesktopView.css";
import profileImage from "./profilephoto.png";
import Backgrund from "../Background/Background.jsx";

function DesktopView() {
  const [activeTab, setActiveTab] = useState("Unread");
  // Filter messages based on the active tab

  const messages = [
    {
      id: 1,
      sender: "Vijay Prasad",
      timestamp: "2 hrs ago",
      text: "Hello brother how are you. I that...",
      status: "unread",
      profileImage: profileImage, // Placeholder image
      draft: true,
      group: true,
    },
    {
      id: 2,
      sender: "Vijay Prasad",
      timestamp: "3 hrs ago",
      text: "Hello brother how are you. I am sure that...",
      status: "unread",
      profileImage: profileImage,
      draft: true,
      group: false,
    },
    {
      id: 3,
      sender: "Vijay Prasad",
      timestamp: "5 hrs ago",
      text: "Hey, just checking in...",
      status: "unread",
      profileImage: profileImage,
      draft: true,
      group: true,
    },
    {
      id: 4,
      sender: "Vijay Prasad",
      timestamp: "Yesterday",
      text: "How's everything going?",
      status: "read",
      profileImage: profileImage,
      draft: true,
      group: false,
    },
    {
      id: 5,
      sender: "Vijay Prasad",
      timestamp: "2 days ago",
      text: "Let's catch up soon...",
      status: "read",
      profileImage: profileImage,
      draft: true,
      group: false,
    },
    {
      id: 6,
      sender: "Vijay Prasad",
      timestamp: "2 days ago",
      text: "Let's catch up soon...",
      status: "read",
      profileImage: profileImage,
      draft: true,
      group: false,
    },
  ];
  const filteredMessages = messages.filter((msg) => {
    if (activeTab === "Unread") return msg.status === "unread";
    if (activeTab === "Drafts") return msg.draft;
    if (activeTab === "Groups") return msg.group;
    if (activeTab === "Filters") return true;
    return true;
  });

  return (
    <>
      <Backgrund />
      {/* Navbar */}
      <div className="desktop-navbar">
        <DesktopNavbarr />
      </div>

      {/* Main View Container */}
      <div className="desktop-view-container">
        {/* Left Section - left2 above left1 */}
        <div className="desktop-view-left">
          <Decklefttop />
          <Decktopleftbottom />
        </div>

        {/* Middle Section */}
        <div className="desktop-view-middle">
          <DesktopMiddle />
          {/* mesage -drop-up section */}
          <div className="message-section">
            <div className="header">
              <button
                onClick={() => {
                  setActiveTab("Unread");
                }}
                className="message-btn unread"
              >
                Unread
              </button>
              <button
                onClick={() => {
                  setActiveTab("Drafts");
                }}
                className="message-btn drafts"
              >
                Drafts
              </button>
              <button
                onClick={() => {
                  setActiveTab("Groups");
                }}
                className="message-btn groups"
              >
                Groups
              </button>
              <button
                onClick={() => {
                  setActiveTab("Filters");
                }}
                className="message-btn filters"
              >
                Filters
              </button>
            </div>
     
              <div  className="message-list">
              {filteredMessages.map((message ) => (
                <div  key={message.id} className="message-row">
                  <div className="profile-image">
                    <img src={message.profileImage} alt="" />
                  </div>
                  <div className="message-bubble">
                    <div className="name-and-timestamp">
                      <span className="sender-name">{message.sender}</span>
                      <span className="timestamp">{message.timestamp}</span>
                    </div>
                    <div className="para-and-dot">
                      <p className="message-text">{message.text}</p>
                      {message.status === "unread" && (
                        <span className="dot"></span>
                      )}
                    </div>
                  </div>
                </div>
                   ))}
              </div>
         
          </div>
        </div>

        {/* Right Section */}
        <div className="desktop-view-right">
          <DesktopRight />
        </div>
      </div>
    </>
  );
}

export default DesktopView;
