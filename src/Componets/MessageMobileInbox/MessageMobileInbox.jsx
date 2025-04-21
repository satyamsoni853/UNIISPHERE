import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MessageMobileInbox.css";
import { IoIosAddCircle } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5"; // Import backward arrow icon
import profileImage from "./profilephoto.png"; // Reuse from MessagesWidget

const MessageMobileInbox = () => {
  const [selectedTab, setSelectedTab] = useState("Unread");
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "your-user-id-here"; // Replace with actual userId retrieval
  const token = localStorage.getItem("authToken");

  // Dummy data for Drafts, Groups, Filters (same as MessagesWidget)
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

  // Fetch conversations from API
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
        setUnreadMessages(
          unread.map((msg, index) => {
            const messageId =
              msg.id ||
              msg._id ||
              msg.conversationId ||
              msg.user?.id ||
              `fallback-${index}`;
            console.log("Mapping message:", msg, "Assigned ID:", messageId);
            return {
              id: messageId,
              sender: msg.user?.username || "Unknown User",
              timestamp: new Date(msg.timestamp).toLocaleString(),
              text: msg.lastMessage,
              status: msg.status || (msg.read ? "read" : "unread"),
              profileImage: msg.user?.profilePictureUrl || profileImage,
              draft: false,
              group: msg.isGroup || false,
            };
          })
        );
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

  // Filter messages based on selected tab
  const filteredMessages = () => {
    if (selectedTab === "Unread") return unreadMessages;
    if (selectedTab === "Drafts") return dummyDrafts;
    if (selectedTab === "Groups") return dummyGroups;
    if (selectedTab === "Filters") return dummyFilters;
    return [];
  };

  // Navigate to individual message thread
  const handleMessageClick = (messageId) => {
    if (!messageId) {
      console.error("No messageId provided for navigation");
      return;
    }
    console.log("Navigating to MessageFinalClass2 with ID:", messageId);
    navigate(`/MessageFinalClass2/${messageId}`);
  };

  // Handle backward navigation
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const tabs = ["Unread", "Drafts", "Groups", "Filters"];

  return (
    <div className="Message-Mobile-Container">
      {/* Navbar */}
      <div className="Message-Mobile-Navbar">
        <button className="Message-Mobile-Navbar-Back" onClick={handleBackClick}>
          <IoArrowBack />
        </button>
        {/* <img
          className="Message-Mobile-Navbar-Avatar"
          src="https://api.dicebear.com/8.x/thumbs/svg?seed=user"
          alt="User"
        /> */}
        <input
          className="Message-Mobile-Navbar-Input"
          type="text"
          placeholder="Search or type a message..."
        />
        <button className="Message-Mobile-Navbar-Add">
          <IoIosAddCircle />
        </button>
      </div>

      {/* Tabs */}
      <div className="Message-Mobile-Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`Message-Mobile-Tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="Message-Mobile-List">
        {loading && <p>Loading conversations...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && filteredMessages().length === 0 && (
          <p>
            {selectedTab === "Unread"
              ? "No unread messages."
              : `No ${selectedTab.toLowerCase()} available.`}
          </p>
        )}
        {!loading &&
          !error &&
          filteredMessages().map((msg) => (
            <div
              key={msg.id}
              className="Message-Mobile-Item"
              onClick={() => handleMessageClick(msg.id)}
            >
              <div className="Message-Mobile-Profile">
                <img
                  src={msg.profileImage || `https://api.dicebear.com/8.x/thumbs/svg?seed=${msg.sender}`}
                  alt={msg.sender}
                  className="Message-Mobile-Avatar"
                />
                <div>
                  <h3 className="Message-Mobile-Name">{msg.sender}</h3>
                  <p className="Message-Mobile-Text">{msg.text}</p>
                </div>
              </div>
              {msg.status === "unread" && <span className="Message-Mobile-Dot"></span>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MessageMobileInbox;