import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./BottomMessagesWidget.css";
import Usericon from "./Usericon.png";
import profileImage from "./profilephoto.png";

const MessagesWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Unread");
  const [showMessages, setShowMessages] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = "your-user-id-here"; // Replace with actual userId
  const token = localStorage.getItem("authToken");

  // Dummy data remains unchanged
  const dummyDrafts = [
    {
      id: 1,
      sender: "Draft User 1",
      timestamp: "1 hr ago",
      text: "Draft message 1...",
      status: "read",
      profileImage: profileImage,
      draft: true,
      group: false,
    },
    {
      id: 2,
      sender: "Draft User 2",
      timestamp: "Yesterday",
      text: "Draft message 2...",
      status: "read",
      profileImage: profileImage,
      draft: true,
      group: false,
    },
  ];

  const dummyGroups = [
    {
      id: 3,
      sender: "Group Chat 1",
      timestamp: "2 hrs ago",
      text: "Group message 1...",
      status: "read",
      profileImage: profileImage,
      draft: false,
      group: true,
    },
    {
      id: 4,
      sender: "Group Chat 2",
      timestamp: "3 hrs ago",
      text: "Group message 2...",
      status: "read",
      profileImage: profileImage,
      draft: false,
      group: true,
    },
  ];

  const dummyFilters = [
    {
      id: 5,
      sender: "Filtered User 1",
      timestamp: "4 hrs ago",
      text: "Filtered message 1...",
      status: "read",
      profileImage: profileImage,
      draft: false,
      group: false,
    },
    {
      id: 6,
      sender: "Filtered User 2",
      timestamp: "5 hrs ago",
      text: "Filtered message 2...",
      status: "read",
      profileImage: profileImage,
      draft: false,
      group: false,
    },
  ];

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/messages/conversations?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch conversations: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full API Response:", data);

        const unread = data.filter(
          (msg) => msg.status === "unread" || !msg.read
        );
        setUnreadMessages(unread.map(msg => ({
          id: msg.id || msg._id,
          sender: msg.user?.username || "Unknown User",  // Using username from user object
          timestamp: new Date(msg.timestamp).toLocaleString(),  // Format timestamp
          text: msg.lastMessage,
          status: msg.status || (msg.read ? "read" : "unread"),
          profileImage: msg.user?.profilePictureUrl || profileImage,
          draft: false,
          group: msg.isGroup || false
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchConversations();
    }
  }, [userId, token]);

  const filteredMessages = () => {
    if (activeTab === "Unread") return unreadMessages;
    if (activeTab === "Drafts") return dummyDrafts;
    if (activeTab === "Groups") return dummyGroups;
    if (activeTab === "Filters") return dummyFilters;
    return [];
  };

  return (
    <div className="bottom-message-main-container">
      {showMessages && (
        <div className="message-section">
          <div className="header">
            <button
              onClick={() => setActiveTab("Unread")}
              className={`message-btn ${activeTab === "Unread" ? "active" : ""}`}
            >
              Unread
            </button>
            <button
              onClick={() => setActiveTab("Drafts")}
              className={`message-btn ${activeTab === "Drafts" ? "active" : ""}`}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab("Groups")}
              className={`message-btn ${activeTab === "Groups" ? "active" : ""}`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab("Filters")}
              className={`message-btn ${activeTab === "Filters" ? "active" : ""}`}
            >
              Filters
            </button>
          </div>

          <div className="message-list">
            {loading && <p>Loading conversations...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && filteredMessages().length === 0 && (
              <p>
                {activeTab === "Unread"
                  ? "No unread messages."
                  : `No ${activeTab.toLowerCase()} available.`}
              </p>
            )}
            {!loading &&
              !error &&
              filteredMessages().map((message) => (
                <div key={message.id} className="message-row">
                  <div className="profile-image">
                    <img
                      src={message.profileImage}
                      alt={`${message.sender}'s profile`}
                    />
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
      )}
      <div className="messages-widget" onClick={() => setIsOpen(!isOpen)}>
        <img src={Usericon} alt="Profile" className="userIcon-image" />
        <span
          onClick={() => setShowMessages(!showMessages)}
          className="messages-text"
        >
          Messages
        </span>
        <span
          onClick={() => setShowMessages(!showMessages)}
          className="icon"
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
    </div>
  );
};

export default MessagesWidget;