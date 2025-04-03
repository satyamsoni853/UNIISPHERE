import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./BottomMessagesWidget.css";
import Usericon from "./Usericon.png";
 
import profileImage from './profilephoto.png'
const MessagesWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Unread");
  const [showMessages,setShowMessages]=useState(false)
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
    <div className="bottom-message-main-container">
     {/* mesage -drop-up section */}
      {showMessages && (<div className="message-section">
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

        <div className="message-list">
          {filteredMessages.map((message) => (
            <div key={message.id} className="message-row">
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
                  {message.status === "unread" && <span className="dot"></span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>)}
      {/* Message option code */}
      <div className="messages-widget" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={Usericon} // Replace with actual image URL
          alt="Profile"
          className="userIcon-image"
        />
        <span 
          onClick={()=>{
            setShowMessages(!showMessages)
          }}
        className="messages-text">Messages</span>
        <span
        onClick={()=>{
          setShowMessages(!showMessages)
        }}
        className="icon">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
 
    </div>
  );
};

export default MessagesWidget;
