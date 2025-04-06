import React, { useEffect, useRef, useState } from "react";
import "./MessageFinalClass2.css";
import { IoCall } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import profilePicSmall from "./profilePicSmall.png";
import callingIcon from "./call.svg";
import gallaryIcon from "./gallary.svg";
import microphoneIcon from "./on.svg";
import stickerIcon from "./sticker.svg";
import backIcon from "./backsvg.svg";
import checkImage from "./image.jpg";
import ProfileIcon from "./ProfileIcon.png";
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

      text: "Hi wkjfnclruafnkvnmrkjvnbkevyjfnbvhaeh bruvibvkb",
    },
    {
      sender: "Vijay Prasad",

      text: "Hi wkjfnclruafnkvnmrkjvnbkevyjfnbvhaeh bruvibvkb,eajrvbjekveayknn oernrifier lerifer.",
    },
    {
      sender: "Mohan Bhadouria",

      text: "It is always like this.",
    },
    {
      sender: "Mohan Bhadouria",

      text: "It is always like a ASSASIIN",
      image: checkImage,
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
                src={checkImage}
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
              src={profilePicSmall}
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
            {chatMessages.map((message, index) => {
              const isNewSender =
                index === 0 ||
                message.sender !== chatMessages[index - 1].sender;
              return (
                <>
                  {isNewSender && (
                    <p className="message-part-2-timestamp">Today 2:00 AM</p>
                  )}

                  <div
                    key={index}
                    className={`message-part-2-message ${
                      message.sender === "Vijay Prasad"
                        ? "message-part-2-sent"
                        : "message-part-2-received"
                    }`}
                  >
                    <div className="message-part-2-message-content-container">
                      {message.sender === "Mohan Bhadouria" && (
                        <img
                          className="message-part-2-message-person-image"
                          src={profilePicSmall}
                          alt=""
                        />
                      )}
                      <div className="message-part-2-message-content">
                        {message.image && (
                          <div className="message-part-2-message-profile">
                            <img src={ProfileIcon} alt="" />
                            <span>Vijay Prasad</span>
                          </div>
                        )}
                        {message.image && (
                          <img
                            className="message-part-2-chat-image"
                            src={message.image}
                            alt=""
                          />
                        )}
                        <p>{message.text}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="message-part-2-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              className="message-part-2-input"
            />
            <div className="message-part-2-icons">
              <span>
                <img
                  className="message-part-2-chat-all-icon"
                  src={stickerIcon}
                  alt="StickerIcon"
                />
              </span>
              <span>
                <img
                  className="message-part-2-chat-all-icon"
                  src={gallaryIcon}
                  alt="GallaryIcon"
                />
              </span>
              <span>
                <img
                  className="message-part-2-chat-all-icon"
                  src={microphoneIcon}
                  alt="MicrophoneIcon"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-chat-profile-container">
        <div className="mobile-chat-container">
          <div className="mobile-chat-header">
            <div className="mobile-chat-header-top">
              <div className="mobile-chat-back-icon">
                <img className="mobile-chat-all-icon" src={backIcon} alt="" />
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
            <div className="mobile-chat-big-username">
              mohan_singh_bhadouria
            </div>
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
              <span>
                <img
                  className="mobile-chat-all-icon"
                  src={stickerIcon}
                  alt="StickerIcon"
                />
              </span>
              <span>
                <img
                  className="mobile-chat-all-icon"
                  src={gallaryIcon}
                  alt="GallaryIcon"
                />
              </span>
              <span>
                <img
                  className="mobile-chat-all-icon"
                  src={microphoneIcon}
                  alt="MicrophoneIcon"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageFinalClass2;
