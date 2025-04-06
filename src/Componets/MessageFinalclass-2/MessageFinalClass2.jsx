import React from "react";
import "./MessageFinalClass2.css";
import { IoCall } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import profilePicSmall from "./profilePicSmall.png";
import callingIcon from "./call.svg";
import gallaryIcon from "./gallary.svg";
import microphoneIcon from "./on.svg";
import stickerIcon from "./sticker.svg";
import backIcon from "./backsvg.svg";




function MessageFinalClass2() {
  // Data for the sidebar messages
  const sidebarMessages = [
    {
      name: "Vijay Prasad",
      time: "2 hrs",
      preview: "Hello brother how are you, I was ...",
    },
    {
      name: "Vijay Prasad",
      time: "2 hrs",
      preview: "Hello brother how are you, I was ...",
    },
    {
      name: "Vijay Prasad",
      time: "2 hrs",
      preview: "Hello brother how are you, I was ...",
    },
    {
      name: "Vijay Prasad",
      time: "2 hrs",
      preview: "Hello brother how are you, I was ...",
    },
    {
      name: "Vijay Prasad",
      time: "2 hrs",
      preview: "Hello brother how are you, I was ...",
    },
  ];

  // Data for the chat messages
  const chatMessages = [
    {
      sender: "Mohan Bhadouria",
      time: "2:12 AM",
      text: "Hi wkjfnclruafnkvnmrkjvnbkevyjfnbvhaeh bruvibvkb",
    },
    {
      sender: "Vijay Prasad",
      time: "2:12 AM",
      text: "Hi wkjfnclruafnkvnmrkjvnbkevyjfnbvhaeh bruvibvkb,eajrvbjekveayknn oernrifier lerifer.",
    },
    {
      sender: "Mohan Bhadouria",
      text: "It is always like this.",
    },
  ];

  /// ===============MOBILE CHAT DATA

  return (
    <>
      <div className="message-part-2-app">
        {/* Sidebar Section */}
        <div className="message-part-2-sidebar">
          <h1>Messages</h1>
          {sidebarMessages.map((message, index) => (
            <div key={index} className="message-part-2-message-item">
              <img
                src="https://via.placeholder.com/50"
                alt="profile"
                className="message-part-2-profile-pic"
              />
              <div className="message-part-2-message-info">
                <div className="message-part-2-message-header">
                  <span className="message-part-2-name">{message.name}</span>
                  <span className="message-part-2-time">{message.time}</span>
                </div>
                <p className="message-part-2-preview">{message.preview}</p>
              </div>
              <span className="message-part-2-unread-dot"></span>
            </div>
          ))}
        </div>

        {/* Chat Section */}
        <div className="message-part-2-chat">
          <div className="message-part-2-chat-header">
            <img
              src="https://via.placeholder.com/50"
              alt="profile"
              className="message-part-2-profile-pic"
            />
            <h3>Mohan Bhadouria</h3>
            <div className="call-video-icon">
              <span>
                <IoCall />
              </span>
              <span>
                <MdOutlineVideoCall />
              </span>
            </div>
          </div>
          <div className="message-part-2-chat-body">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`message-part-2-message ${
                  message.sender === "Vijay Prasad"
                    ? "message-part-2-sent"
                    : "message-part-2-received"
                }`}
              >
                <div className="message-part-2-message-content">
                  <p>{message.text}</p>
                  {message.time && (
                    <span className="message-part-2-time">{message.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="message-part-2-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              className="message-part-2-input"
            />
            <div className="message-part-2-icons">
              <span>😊</span>
              <span>📷</span>
              <span>🎙️</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-chat-profile-container">
        <div className="mobile-chat-container">
          <div className="mobile-chat-header">
            <div className="mobile-chat-header-top">
              <div className="mobile-chat-back-icon">
                <img  className="mobile-chat-all-icon" src={backIcon} alt="" />
              </div>
              <div className="mobile-chat-profile-pic-small">
                <img src={profilePicSmall} alt="Profile" />
                <div className="mobile-chat-header-bottom">
                  <span className="mobile-chat-name">Kartikey Pandey</span>
                  <span className="mobile-chat-username">
                    mohan_singh_bhadouria
                  </span>
                </div>
              </div>
            </div>
            <img className="mobile-chat-all-icon" src={callingIcon} alt="" />
          </div>
          <div className="mobile-chat-profile">
            <div className="mobile-chat-profile-pic-large">
              <img src={profilePicSmall} alt="Profile" />
            </div>
            <div className="mobile-chat-big-name">Kartikey Pandey</div>
            <div className="mobile-chat-big-username">mohan_singh_bhadouria</div>
            <button className="mobile-chat-voice-call">Voice Call</button>
            <div className="mobile-chat-interests">
              {" "}
              You both have interest in Reading Books, Basketball,Coding and 3
              other
            </div>
          </div>
          <div className="mobile-chat-input">
            <input
              type="text"
              className="mobile-chat-text-input"
              placeholder="Type a message"
            />
            <div className="mobile-chat-icons">
              <span><img className="mobile-chat-all-icon" src={stickerIcon} alt="StickerIcon" /></span>
              <span><img className="mobile-chat-all-icon" src={gallaryIcon} alt="GallaryIcon" /></span>
              <span><img className="mobile-chat-all-icon" src={microphoneIcon} alt="MicrophoneIcon" /></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageFinalClass2;
