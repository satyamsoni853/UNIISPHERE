import React, { useEffect, useState } from "react";
import { IoCall } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import backIcon from "./backsvg.svg";
import callingIcon from "./call.svg";
import gallaryIcon from "./gallary.svg";
import checkImage from "./image.jpg";
import "./MessageFinalClass2.css";
import microphoneIcon from "./on.svg";
import profilePicSmall from "./profilePicSmall.png";
import stickerIcon from "./sticker.svg";

function MessageFinalClass2() {
  const [messageInput, setMessageInput] = useState(""); // State for message input
  const [chatMessages, setChatMessages] = useState([]); // State for chat messages
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Provided IDs
  const senderId = "18114725-fcc6-4cbe-a617-894a464b9fc8"; // pkartikey013@gmail.com
  const receiverId = "7be6aac4-b786-4b9f-b3ba-f911e2f89a04"; // pandkartikey0@gmail.com

  // Replace this with your actual token retrieval logic (e.g., from localStorage)
  const token = localStorage.getItem("authToken") || "your-auth-token-here";

  // Sidebar Messages (static data)
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

  // Fetch conversation messages from the API
  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/messages/conversation/${receiverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token if required
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversation");
        }

        const data = await response.json();
        // Print the full API response for fetching conversation
        console.log("GET API Response (Conversation):", data);

        // Transform API data to match chatMessages structure (adjust based on actual response)
        const transformedMessages = data.map((msg) => ({
          sender: msg.senderId === senderId ? "Vijay Prasad" : "Mohan Bhadouria",
          text: msg.content,
          image: msg.image || null, // Assuming API might return an image field
        }));

        setChatMessages(transformedMessages);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching conversation:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, []); // Empty dependency array to fetch once on mount

  // Update the sendMessage function
  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Please login to send messages");
      return;
    }

    try {
      console.log("Sending message with data:", {
        receiverId,
        content
      });

      const response = await fetch("https://uniisphere-1.onrender.com/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId,
          content
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);

      // Update chat messages with the new message
      setChatMessages(prevMessages => [...prevMessages, {
        sender: "Vijay Prasad",
        text: content,
        timestamp: new Date().toISOString(),
        id: data.id
      }]);

      // Clear input
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message || "Failed to send message");
    }
  };

  // Update the handleSendMessage function
  const handleSendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(messageInput);
    }
  };

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
            {loading && <p className="message-part-2-loading">Loading messages...</p>}
            {error && <p className="message-part-2-error">Error: {error}</p>}
            {!loading && !error && chatMessages.length === 0 && (
              <p className="message-part-2-no-messages">No messages yet.</p>
            )}
            {!loading &&
              !error &&
              chatMessages.map((message, index) => {
                const isNewSender =
                  index === 0 ||
                  message.sender !== chatMessages[index - 1].sender;
                
                const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <React.Fragment key={message.id || index}>
                    {isNewSender && (
                      <p className="message-part-2-timestamp">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </p>
                    )}
                    <div
                      className={`message-part-2-message ${
                        message.sender === "Vijay Prasad"
                          ? "message-part-2-sent"
                          : "message-part-2-received"
                      }`}
                    >
                      <div className="message-part-2-message-content-container">
                        {message.sender !== "Vijay Prasad" && (
                          <img
                            className="message-part-2-message-person-image"
                            src={message.sender.profilePictureUrl || profilePicSmall}
                            alt=""
                          />
                        )}
                        <div className="message-part-2-message-content">
                          <p>{message.text || message.content}</p>
                          <span className="message-time">{messageTime}</span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
          <div className="message-part-2-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              className="message-part-2-input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleSendMessage} // Send message on Enter key
            />
            {error && (
              <div className="message-error-alert">
                {error}
                <button onClick={() => setError(null)}>✕</button>
              </div>
            )}
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

      {/* Mobile Chat Section */}
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
              You both have interest in Reading Books, Basketball, Coding and 3
              other
            </div>
          </div>
          <div className="mobile-chat-input">
            <input
              type="text"
              className="mobile-chat-text-input"
              placeholder="Type a message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleSendMessage} // Send message on Enter key
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
