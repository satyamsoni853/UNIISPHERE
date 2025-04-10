import React, { useEffect, useState, useRef } from "react";
import { IoCall, IoSend } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import { useParams } from "react-router-dom";
import backIcon from "./backsvg.svg";
import callingIcon from "./call.svg";
import gallaryIcon from "./gallary.svg";
import profilePicSmall from "./profilePicSmall.png";
import stickerIcon from "./sticker.svg";
import microphoneIcon from "./on.svg";
import "./MessageFinalClass2.css";

// Placeholder Background component (replace with your actual implementation if needed)
const Background = () => <div className="message-background" />;

function MessageFinalClass2() {
  const { messageId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [receiverData, setReceiverData] = useState({});
  const [showStickers, setShowStickers] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const chatBodyRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch senderId dynamically from localStorage (set during login in UserLogin.jsx)
  const senderId = localStorage.getItem("LoginuserId") || "18114725-fcc6-4cbe-a617-894a464b9fc8"; // Fallback for testing
  const token = localStorage.getItem("authToken") || "your-auth-token-here";

  // Sample emojis array for sticker functionality
  const emojis = [
    "😀", "😊", "😂", "🤓", "😎", "😍", "🥰", "😘", "😜", "😛",
    "😇", "🙃", "😏", "😴", "🤗", "🤔", "🤤", "😢", "😭", "😤",
    "😡", "🤬", "😳", "😱", "😨", "😰", "😥", "😓", "🙄", "😬",
    "🤐", "😷", "🤒", "🤕", "🥳", "🤩", "🥺", "🙌", "👏", "👍",
    "👎", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "✋", "🤚",
    "🖐️", "👋", "🤝", "🙏", "💪", "🦵", "🦶", "👀", "👁️", "👅",
    "👄", "💋", "❤️", "💔", "💖", "💙", "💚", "💛", "💜", "🖤",
    "🤎", "💯", "💥", "💦", "💤", "💨", "🎉", "🎈", "🎁", "🎂",
    "🍰", "🍫", "🍬", "🍭", "🍎", "🍊", "🍋", "🍇", "🍉", "🍓",
    "🥝", "🍍", "🥭", "🥑", "🥕", "🌽", "🥔", "🍔", "🍕", "🌮",
    "🍟", "🍗", "🥚", "🥓", "🧀", "🍳", "☕", "🍵", "🥛", "🍷",
    "🍺", "🥂", "🎸", "🎹", "🥁", "🎤", "🎧", "🎮", "🏀", "⚽",
    "🏈", "🎾", "🏐", "🏓", "⛳", "🏊", "🏄", "🚴", "🚗", "✈️",
    "🚀", "🛸", "🌍", "🌙", "⭐", "🌞", "☁️", "⛅", "🌧️", "⛄",
    "⚡", "🔥", "💧", "🌊", "🌴", "🌵", "🌷", "🌸", "🌹", "🥀"
  ];

  // Fetch conversations for sidebar (initial load only)
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/messages/conversations?userId=${senderId}`,
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
        const transformedConversations = data.map((msg) => ({
          id: msg.id || msg._id || msg.conversationId || msg.user?.id,
          name: msg.user?.username || "Unknown User",
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          preview: msg.lastMessage || "No messages yet",
          profilePictureUrl: msg.user?.profilePictureUrl || profilePicSmall,
        }));

        setConversations(transformedConversations);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && senderId) {
      fetchConversations();
    }
  }, [senderId, token]);

  // Fetch conversation messages (with polling)
  const fetchConversation = async () => {
    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/messages/conversation/${messageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const data = await response.json();
      const messages = Array.isArray(data) ? data : data.messages || [];
      const transformedMessages = messages
        .map((msg) => ({
          id: msg.id || msg._id,
          senderId: msg.senderId,
          sender: msg.senderId === senderId ? "You" : msg.user?.username || "Unknown",
          text: msg.content || msg.lastMessage,
          timestamp: msg.timestamp || msg.createdAt,
          image: msg.image || null,
          audio: msg.audio || null,
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      // Only update if there are changes to avoid unnecessary re-renders
      if (JSON.stringify(chatMessages) !== JSON.stringify(transformedMessages)) {
        setChatMessages(transformedMessages);
      }

      if (messages.length > 0) {
        const receiver = messages.find((msg) => msg.senderId !== senderId)?.user || {};
        setReceiverData({
          username: receiver.username || "Unknown",
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Polling logic for conversation updates
  useEffect(() => {
    if (!messageId || !token || !senderId) return;

    // Initial fetch
    fetchConversation();

    // Poll every 2 seconds
    const intervalId = setInterval(() => {
      fetchConversation();
    }, 2000);

    // Cleanup interval on unmount or dependency change
    return () => clearInterval(intervalId);
  }, [messageId, token, senderId]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Send text message
  const sendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      const response = await fetch("https://uniisphere-1.onrender.com/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: messageId,
          content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      // Refresh conversation after sending
      await fetchConversation();
      setMessageInput("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle sticker click
  const handleStickerClick = () => {
    setShowStickers(!showStickers);
    setShowGallery(false);
  };

  // Add emoji to input
  const addEmojiToInput = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setShowStickers(false);
  };

  // Gallery functionality
  const handleGalleryClick = () => {
    setShowGallery(!showGallery);
    setShowStickers(false);
    fileInputRef.current.click();
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("receiverId", messageId);
        formData.append("content", "Image");
        formData.append("file", file);

        const response = await fetch("https://uniisphere-1.onrender.com/api/messages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to send image");
        }
        setShowGallery(false);
        // Polling will update the chat
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Voice recording (placeholder implementation)
  const handleVoiceRecord = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsRecording(true);

        const audioChunks = [];
        recorder.ondataavailable = (event) => audioChunks.push(event.data);
        recorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: "audio/webm" });
          setAudioBlob(blob);
          stream.getTracks().forEach((track) => track.stop());
        };
      });
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendClick = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput);
    }
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(messageInput);
    }
  };

  const currentConversation = conversations.find((conv) => conv.id === messageId);

  return (
    <>
      <div className="message-part-2-app">
        <Background />
        <div className="message-part-2-sidebar">
          <h1>Messages</h1>
          {error && <p>Error: {error}</p>}
          {!conversations.length && !error && <p>No conversations found.</p>}
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`message-part-2-message-item ${conversation.id === messageId ? "active" : ""
                }`}
              onClick={() => (window.location.href = `/MessageFinalClass2/${conversation.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={conversation.profilePictureUrl}
                alt="profile"
                className="message-part-2-profile-pic"
              />
              <div className="message-part-2-message-info">
                <div className="message-part-2-message-header">
                  <span className="message-part-2-name">{conversation.name}</span>
                  <span className="message-part-2-time">{conversation.time}</span>
                </div>
                <p className="message-part-2-preview">{conversation.preview}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="message-part-2-chat">
          <div className="message-part-2-chat-header">
            <img
              src={currentConversation?.profilePictureUrl || profilePicSmall}
              alt="profile"
              className="message-part-2-profile-pic"
            />
            <h3>{currentConversation?.name || "Loading..."}</h3>
            <div className="call-video-icon">
              <span>
                <IoCall />
              </span>
              <span>
                <MdOutlineVideoCall />
              </span>
            </div>
          </div>
          <div className="message-part-2-chat-body" ref={chatBodyRef}>
            {!chatMessages.length && (
              <p className="message-part-2-no-messages">No messages yet.</p>
            )}
            {chatMessages.map((message, index) => {
              const isNewSender =
                index === 0 || message.senderId !== chatMessages[index - 1]?.senderId;
              const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <React.Fragment key={message.id || index}>
                  {isNewSender && (
                    <p className="message-part-2-timestamp">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </p>
                  )}
                  <div
                    className={`message-part-2-message ${message.senderId === senderId
                        ? "message-part-2-sent"
                        : "message-part-2-received"
                      }`}
                  >
                    <div className="message-part-2-message-content-container">
                      {message.senderId !== senderId && (
                        <img
                          className="message-part-2-message-person-image"
                          src={currentConversation?.profilePictureUrl || profilePicSmall}
                          alt=""
                        />
                      )}
                      <div className="message-part-2-message-content">
                        {message.image && <img src={message.image} alt="Message content" />}
                        {message.audio && <audio controls src={message.audio} />}
                        <p>{message.text}</p>
                        <span className="message-part-2-time">{messageTime}</span>
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
              onKeyDown={handleSendMessage}
            />
            {error && (
              <div className="message-error-alert">
                {error}
                <button onClick={() => setError(null)}>✕</button>
              </div>
            )}
            {showStickers && (
              <div className="emoji-panel">
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    className="emoji-option"
                    onClick={() => addEmojiToInput(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageSelect}
            />
            <div className="message-part-2-icons">
              <span className="message-part-2-send-icon" onClick={handleSendClick}>
                <IoSend />
              </span>
              <span onClick={handleStickerClick}>
                <img className="message-part-2-chat-all-icon" src={stickerIcon} alt="StickerIcon" />
              </span>
              <span onClick={handleGalleryClick}>
                <img className="message-part-2-chat-all-icon" src={gallaryIcon} alt="GallaryIcon" />
              </span>
              <span onClick={handleVoiceRecord}>
                <img
                  className={`message-part-2-chat-all-icon ${isRecording ? "recording" : ""}`}
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
                <img className="mobile-chat-all-icon" src={backIcon} alt="Back" />
              </div>
              <div className="mobile-chat-profile-pic-small">
                <img
                  src={currentConversation?.profilePictureUrl || profilePicSmall}
                  alt="Profile"
                />
                <div className="mobile-chat-header-bottom">
                  <span className="mobile-chat-name">
                    {currentConversation?.name || "Loading..."}
                  </span>
                  <span className="mobile-chat-username">{receiverData.username || ""}</span>
                </div>
              </div>
            </div>
            <img className="mobile-chat-all-icon" src={callingIcon} alt="Call" />
          </div>
          <div className="mobile-chat-profile">
            <div className="mobile-chat-profile-pic-large">
              <img
                src={currentConversation?.profilePictureUrl || profilePicSmall}
                alt="Profile"
              />
            </div>
            <div className="mobile-chat-big-name">
              {currentConversation?.name || "Loading..."}
            </div>
            <div className="mobile-chat-big-username">{receiverData.username || ""}</div>
            <button className="mobile-chat-voice-call">Voice Call</button>
            <div className="mobile-chat-interests">Loading interests...</div>
          </div>
          <div className="mobile-chat-input">
            <input
              type="text"
              className="mobile-chat-text-input"
              placeholder="Type a message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleSendMessage}
            />
            {showStickers && (
              <div className="emoji-panel">
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    className="emoji-option"
                    onClick={() => addEmojiToInput(emoji)}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageSelect}
            />
            <div className="mobile-chat-icons">
              <span onClick={handleStickerClick}>
                <img className="mobile-chat-all-icon" src={stickerIcon} alt="StickerIcon" />
              </span>
              <span onClick={handleGalleryClick}>
                <img className="mobile-chat-all-icon" src={gallaryIcon} alt="GallaryIcon" />
              </span>
              <span onClick={handleVoiceRecord}>
                <img
                  className={`mobile-chat-all-icon ${isRecording ? "recording" : ""}`}
                  src={microphoneIcon}
                  alt="MicrophoneIcon"
                />
              </span>
              <span className="mobile-chat-send-icon" onClick={handleSendClick}>
                <IoSend />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageFinalClass2;
