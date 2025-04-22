import React, { useState, useEffect } from "react";
import "./MessageFinalclass.css";
import MobileFooter from "../Mobilefooter/MobileFooter";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbar from  '../DesktopNavbar/DesktopNavbar.jsx'
import { FaPlusCircle } from "react-icons/fa";

function MessageFinalclass() {
  const messagesData = [
    {
      id: 1,
      name: "Vijay Prasad",
      message: "Hello brother how are you. I am that ...",
      status: "unread",
      draft: false,
      group: false,
    },
    {
      id: 2,
      name: "Arjun Verma",
      message: "Hello brother how are you. I am that ...",
      status: "unread",
      draft: false,
      group: false,
    },
    {
      id: 3,
      name: "Sakshi",
      message: "Hello brother how are you. I am that ...",
      status: "unread",
      draft: false,
      group: true,
    },
    {
      id: 4,
      name: "Vinod",
      message: "Hello brother how are you. I am that ...",
      status: "read",
      draft: false,
      group: false,
    },
    {
      id: 5,
      name: "Riya",
      message: "Hello brother how are you. I am that ...",
      status: "unread",
      draft: true,
      group: false,
    },
    {
      id: 6,
      name: "Aditya",
      message: "Hello brother how are you. I am sure that ...",
      status: "read",
      draft: false,
      group: true,
    },
    {
      id: 7,
      name: "Prajwal",
      message: "Hello brother how are you. I am sure that ...",
      status: "unread",
      draft: false,
      group: false,
    },
    {
      id: 8,
      name: "Rohit",
      message: "Hello brother how are you. I am sure that ...",
      status: "draft",
      draft: true,
      group: false,
    },
    {
      id: 9,
      name: "Prajwal",
      message: "Hello brother how are you. I am sure that ...",
      status: "read",
      draft: false,
      group: true,
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Removed duplicate useEffect and state declaration

  // State for active tab, selected chat, chat messages, and emoji picker
  const [activeTab, setActiveTab] = useState("Unread");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({}); // Store messages and reactions for each chat
  const [showEmojiPicker, setShowEmojiPicker] = useState(null); // Track which message is showing the emoji picker

  // Available emojis for reactions (like Instagram)
  const emojiOptions = ["❤️", "😂", "😮", "😢", "😡", "👍"];

  // Filter messages based on the active tab
  const filteredMessages = messagesData.filter((msg) => {
    if (activeTab === "Unread") return msg.status === "unread";
    if (activeTab === "Drafts") return msg.draft;
    if (activeTab === "Groups") return msg.group;
    if (activeTab === "Filters") return true;
    return true;
  });

  // Handle clicking on a message to open the chat
  const handleChatOpen = (msg) => {
    setSelectedChat(msg);
    // Initialize chat messages if not already present
    if (!chatMessages[msg.id]) {
      setChatMessages({
        ...chatMessages,
        [msg.id]: [
          { id: 1, text: msg.message, type: "received", reactions: [] },
          {
            id: 2,
            text: "Hey, I'm doing great! How about you?",
            type: "sent",
            reactions: [],
          },
        ],
      });
    }
  };

  // Handle going back to the message list
  const handleBack = () => {
    setSelectedChat(null);
    setShowEmojiPicker(null);
  };

  // Handle clicking on a message to show the emoji picker
  const handleMessageClick = (chatId, messageId) => {
    setShowEmojiPicker({ chatId, messageId });
  };

  // Handle adding a reaction to a message
  const handleAddReaction = (chatId, messageId, emoji) => {
    setChatMessages((prev) => {
      const updatedMessages = [...(prev[chatId] || [])];
      const messageIndex = updatedMessages.findIndex(
        (msg) => msg.id === messageId
      );
      if (messageIndex !== -1) {
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          reactions: [...updatedMessages[messageIndex].reactions, emoji],
        };
      }
      return { ...prev, [chatId]: updatedMessages };
    });
    setShowEmojiPicker(null); // Hide the emoji picker after selecting
  };

  return (
    <div>
      <DesktopNavbar />
      <div className="message-main-container">
        <Background />
        <div className="message-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </div>
        <div className="message-middle-main-container">
          <div className="message-finall-class">
            {selectedChat ? (
              // Chat View
              <div className="chat-view">
                <div className="chat-header">
                  <button onClick={handleBack} className="back-button">
                    ←
                  </button>
                  <div className="chat-name">{selectedChat.name}</div>
                </div>
                <div className="chat-messages">
                  {chatMessages[selectedChat.id]?.length > 0 ? (
                    chatMessages[selectedChat.id].map((msg) => (
                      <div key={msg.id} className="message-wrapper">
                        <div
                          className={`chat-message ${msg.type}`}
                          onClick={() =>
                            handleMessageClick(selectedChat.id, msg.id)
                          }
                        >
                          {msg.text}
                        </div>
                        {msg.reactions.length > 0 && (
                          <div className={`reactions ${msg.type}`}>
                            {msg.reactions.map((reaction, index) => (
                              <span key={index} className="reaction-emoji">
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                        {showEmojiPicker?.chatId === selectedChat.id &&
                          showEmojiPicker?.messageId === msg.id && (
                            <div className={`emoji-picker ${msg.type}`}>
                              {emojiOptions.map((emoji) => (
                                <span
                                  key={emoji}
                                  className="emoji-option"
                                  onClick={() =>
                                    handleAddReaction(
                                      selectedChat.id,
                                      msg.id,
                                      emoji
                                    )
                                  }
                                >
                                  {emoji}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    ))
                  ) : (
                    <div className="no-messages">No messages yet.</div>
                  )}
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Type a message..." />
                  <button className="send-button">➤</button>
                </div>
              </div>
            ) : (
              <>
                {/* Header Section */}
                <div className="header">
                  <div className="profile-pic">
                    <div className="profile-placeholder"></div>
                  </div>
                  <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <span className="search-icon">🔍</span>
                  </div>
                  <div className="add-icon">
                    <FaPlusCircle className="add-icon" />
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="tabs">
                  <button
                    className={`tab ${activeTab === "Unread" ? "active" : ""}`}
                    onClick={() => setActiveTab("Unread")}
                    id="tabs-Unread"
                  >
                    Unread
                  </button>
                  <button
                    className={`tab ${activeTab === "Drafts" ? "active" : ""}`}
                    id="tabs-Drafts"
                    onClick={() => setActiveTab("Drafts")}
                  >
                    Drafts
                  </button>
                  <button
                    className={`tab ${activeTab === "Groups" ? "active" : ""}`}
                    onClick={() => setActiveTab("Groups")}
                    id="tabs-Groups"
                  >
                    Groups
                  </button>
                  <button
                    className={`tab ${activeTab === "Filters" ? "active" : ""}`}
                    onClick={() => setActiveTab("Filters")}
                    id="tabs-Filters"
                  >
                    Filters
                  </button>
                </div>

                {/* Message List Section */}
                <div className="message-list">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="message-item"
                      onClick={() => handleChatOpen(msg)}
                    >
                      <div className="message-avatar">
                        <div className="avatar-placeholder"></div>
                      </div>
                      <div className="message-content">
                        <div className="message-name">{msg.name}</div>
                        <div className="message-text">{msg.message}</div>
                      </div>

                      {msg.status === "unread" && (
                        <div className="unread-dot"></div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          {isMobile && <MobileFooter />}
        </div>
        <div className="message-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default MessageFinalclass;
