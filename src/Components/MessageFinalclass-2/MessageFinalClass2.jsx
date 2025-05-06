import React, { useEffect, useState, useRef } from "react";
import { IoCall, IoSend, IoArrowBackCircleSharp } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import { useParams } from "react-router-dom";
import gallaryIcon from "./gallary.svg";
import profilePicSmall from "./profilePicSmall.png";
import stickerIcon from "./sticker.svg";
import microphoneIcon from "./on.svg";
import "./MessageFinalClass2.css";
import Background2 from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbar/DesktopNavbar";
import { MdOutlineDeleteOutline } from "react-icons/md"
const Background = () => <div className="message-background" />;

function MessageFinalClass2() {
  const { messageId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversationError, setConversationError] = useState(null);
  const [sendError, setSendError] = useState(null);
  const [receiverData, setReceiverData] = useState({});
  const [showStickers, setShowStickers] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState(null);
  const chatBodyRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const longPressTimerRef = useRef(null);

  // State for selected emoji category
  const [selectedCategory, setSelectedCategory] = useState("Recently Used");

  // State for recently used emojis
  const [recentEmojis, setRecentEmojis] = useState(() => {
    const saved = localStorage.getItem("recentEmojis");
    return saved ? JSON.parse(saved) : [];
  });

  const senderId =
    localStorage.getItem("LoginuserId") ||
    "18114725-fcc6-4cbe-a617-894a464b9fc8";
  const token = localStorage.getItem("authToken") || "your-auth-token-here";

  // Categorized emojis
  const emojisByCategory = [
    {
      category: "Recently Used",
      emojis: recentEmojis.length > 0 ? recentEmojis : ["😊"], // Fallback emoji if empty
    },
    {
      category: "Smileys & Emotions",
      emojis: [
        "😀",
        "😊",
        "😂",
        "🤓",
        "😎",
        "😍",
        "🥰",
        "😘",
        "😜",
        "😛",
        "😇",
        "🙃",
        "😏",
        "😴",
        "🤗",
        "🤔",
        "🤤",
        "😢",
        "😭",
        "😤",
        "😡",
        "🤬",
        "😳",
        "😱",
        "😨",
        "😰",
        "😥",
        "😓",
        "🙄",
        "😬",
        "🤐",
        "😷",
        "🤒",
        "🤕",
        "🥳",
        "🤩",
        "🥺",
      ],
    },
    {
      category: "Gestures & Body Parts",
      emojis: [
        "🙌",
        "👏",
        "👍",
        "👎",
        "✌️",
        "🤘",
        "👌",
        "👈",
        "👉",
        "👆",
        "👇",
        "✋",
        "🤚",
        "🖐️",
        "👋",
        "🤝",
        "🙏",
        "💪",
        "🦵",
        "🦶",
        "👀",
        "👁️",
        "👅",
        "👄",
        "💋",
      ],
    },
    {
      category: "Hearts & Symbols",
      emojis: [
        "❤️",
        "💔",
        "💖",
        "💙",
        "💚",
        "💛",
        "💜",
        "🖤",
        "🤎",
        "💯",
        "💥",
        "💦",
        "💤",
        "💨",
        "🎉",
        "🎈",
        "🎁",
      ],
    },
    {
      category: "Food & Drink",
      emojis: [
        "🍎",
        "🍊",
        "🍋",
        "🍇",
        "🍉",
        "🍓",
        "🥝",
        "🍍",
        "🥭",
        "🥑",
        "🥕",
        "🌽",
        "🥔",
        "🍔",
        "🍕",
        "🌮",
        "🍟",
        "🍗",
        "🥚",
        "🥓",
        "🧀",
        "🍳",
        "☕",
        "🍵",
        "🥛",
        "🍷",
        "🍺",
        "🥂",
      ],
    },
    {
      category: "Animals & Nature",
      emojis: [
        "🐶",
        "🐱",
        "🐭",
        "🐰",
        "🦊",
        "🐻",
        "🐼",
        "🐨",
        "🦁",
        "🐮",
        "🐷",
        "🐸",
        "🐵",
        "🐦",
        "🐧",
        "🦄",
        "🐝",
        "🦋",
        "🌴",
        "🌵",
        "🌷",
        "🌸",
        "🌹",
        "🥀",
      ],
    },
    {
      category: "Activities & Sports",
      emojis: [
        "🎸",
        "🎹",
        "🥁",
        "🎤",
        "🎧",
        "🎮",
        "🏀",
        "⚽",
        "🏈",
        "🎾",
        "🏐",
        "🏓",
        "⛳",
        "🏊",
        "🏄",
        "🚴",
      ],
    },
    {
      category: "Travel & Places",
      emojis: [
        "🚗",
        "✈️",
        "🚀",
        "🛸",
        "🌍",
        "🌙",
        "⭐",
        "🌞",
        "☁️",
        "⛅",
        "🌧️",
        "⛄",
        "⚡",
        "🔥",
        "💧",
        "🌊",
      ],
    },
    {
      category: "Objects",
      emojis: [
        "💡",
        "📱",
        "💻",
        "📷",
        "📹",
        "🕰️",
        "🔑",
        "🔒",
        "🔓",
        "✂️",
        "🖌️",
        "🖍️",
        "📚",
        "🗳️",
        "🛠️",
        "⚖️",
      ],
    },
  ];

  // Update recent emojis in localStorage
  useEffect(() => {
    localStorage.setItem("recentEmojis", JSON.stringify(recentEmojis));
  }, [recentEmojis]);

  // Fetch conversations (sidebar)
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        setConversationError(null);
        const response = await fetch(
          `https://uniisphere-backend-latest.onrender.com/api/messages/conversations?userId=${senderId}`,
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
        setConversationError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token && senderId) {
      fetchConversations();
    }
  }, [senderId, token]);

  // Fetch conversation messages
  const fetchConversation = async () => {
    try {
      const response = await fetch(
        `https://uniisphere-backend-latest.onrender.com/api/messages/conversation/${messageId}`,
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
          sender:
            msg.senderId === senderId ? "You" : msg.user?.username || "Unknown",
          text: msg.content || msg.lastMessage,
          timestamp: msg.timestamp || msg.createdAt,
          image: msg.image || null,
          audio: msg.audio || null,
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      if (
        JSON.stringify(chatMessages) !== JSON.stringify(transformedMessages)
      ) {
        setChatMessages(transformedMessages);
      }

      if (messages.length > 0) {
        const receiver =
          messages.find((msg) => msg.senderId !== senderId)?.user || {};
        setReceiverData({
          username: receiver.username || "Unknown",
        });
      }
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  };

  useEffect(() => {
    if (!messageId || !token || !senderId) return;

    fetchConversation();

    const intervalId = setInterval(() => {
      if (isAtBottom) {
        fetchConversation();
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [messageId, token, senderId, isAtBottom]);

  // Handle scroll to determine if at bottom
  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (!chatBody) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatBody;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(isBottom);
    };

    chatBody.addEventListener("scroll", handleScroll);
    return () => chatBody.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBodyRef.current && isAtBottom) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isAtBottom]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle right-click (desktop) to show context menu
  const handleRightClick = (e, messageId) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      messageId,
    });
  };

  // Handle long press (mobile) to show context menu
  const handleTouchStart = (e, messageId) => {
    longPressTimerRef.current = setTimeout(() => {
      setContextMenu({
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        messageId,
      });
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimerRef.current);
  };

  // Handle delete message
  const handleDeleteMessage = async (messageId) => {
    const messageToDelete = chatMessages.find((msg) => msg.id === messageId);
    setChatMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setContextMenu(null);

    try {
      const response = await fetch(
        `https://uniisphere-backend-latest.onrender.com/api/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }
    } catch (err) {
      setChatMessages((prev) =>
        [...prev, messageToDelete].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      );
      setSendError(err.message);
    }
  };

  const sendMessage = async (content) => {
    if (!content.trim() || content.length > 1000) {
      setSendError("Message must be between 1 and 1000 characters");
      return;
    }

    if (!navigator.onLine) {
      setSendError("No internet connection");
      return;
    }

    setSendError(null);

    const tempId = Date.now().toString();
    const newMessage = {
      id: tempId,
      senderId: senderId,
      sender: "You",
      text: content,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
    setIsAtBottom(true);
    setIsSending(true);

    try {
      const response = await fetch(
        "https://uniisphere-backend-latest.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiverId: messageId,
            content,
          }),
        }
      );

      if (!response.ok) {
        setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId));

        let errorMsg = "Failed to send message";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          errorMsg = (await response.text()) || errorMsg;
        }
        throw new Error(errorMsg);
      }
    } catch (error) {
      setSendError(error.message);
      console.error("Message send error:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleStickerClick = () => {
    setShowStickers(!showStickers);
    setShowGallery(false);
  };

  const addEmojiToInput = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setShowStickers(false);
    // Update recent emojis
    setRecentEmojis((prev) => {
      const updated = [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 10);
      return updated;
    });
  };

  const handleGalleryClick = () => {
    setShowGallery(!showGallery);
    setShowStickers(false);
    fileInputRef.current.click();
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setSendError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSendError("Image size should be less than 5MB");
      return;
    }

    const tempId = Date.now().toString();
    const tempMessage = {
      id: tempId,
      senderId: senderId,
      sender: "You",
      text: "Sending image...",
      timestamp: new Date().toISOString(),
      image: URL.createObjectURL(file),
    };

    setChatMessages((prev) => [...prev, tempMessage]);
    setIsAtBottom(true);
    setShowGallery(false);
    setSendError(null);

    try {
      const formData = new FormData();
      formData.append("receiverId", messageId);
      formData.append("content", "Image");
      formData.append("file", file);

      const response = await fetch(
        "https://uniisphere-backend-latest.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send image");
      }
    } catch (error) {
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setSendError(error.message);
    }
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
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
            handleSendAudio(blob);
          };
        })
        .catch((err) => {
          setSendError("Microphone access denied: " + err.message);
        });
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendAudio = async (blob) => {
    const tempId = Date.now().toString();
    const tempMessage = {
      id: tempId,
      senderId: senderId,
      sender: "You",
      text: "Audio message",
      timestamp: new Date().toISOString(),
      audio: URL.createObjectURL(blob),
    };

    setChatMessages((prev) => [...prev, tempMessage]);
    setIsAtBottom(true);
    setSendError(null);

    try {
      const formData = new FormData();
      formData.append("receiverId", messageId);
      formData.append("content", "Audio");
      formData.append("file", blob, "audio.webm");

      const response = await fetch(
        "https://uniisphere-backend-latest.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send audio");
      }
    } catch (error) {
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setSendError(error.message);
    }
  };

  const handleSendClick = () => {
    if (messageInput.trim() && !isSending) {
      sendMessage(messageInput);
    }
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      sendMessage(messageInput);
    }
  };

  const currentConversation = conversations.find(
    (conv) => conv.id === messageId
  );

  return (
    <div className="message-part-container">
      <div className="message-part-navbar">
        <DesktopNavbarr />
      </div>
      <div className="message-part-2-app">
        <Background2 />
        <div className="message-part-2-sidebar">
          <h1>Messages</h1>
          {conversationError && (
            <div className="message-error-alert">
              <button
                onClick={() => setConversationError(null)}
                className="error-close-btn"
              >
                ✕
              </button>
            </div>
          )}
          {isLoading && <p>Loading conversations...</p>}
          {!isLoading && !conversations.length && !conversationError && (
            <p>No conversations found.</p>
          )}
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`message-part-2-message-item ${conversation.id === messageId ? "active" : ""
                }`}
              onClick={() =>
                (window.location.href = `/MessageFinalClass2/${conversation.id}`)
              }
              style={{ cursor: "pointer" }}
            >
              <img
                src={conversation.profilePictureUrl}
                alt="profile"
                className="message-part-2-profile-pic"
              />
              <div className="message-part-2-message-info">
                <div className="message-part-2-message-header">
                  <span className="message-part-2-name">
                    {conversation.name}
                  </span>
                  <span className="message-part-2-time">
                    {conversation.time}
                  </span>
                </div>
                <p className="message-part-2-preview">{conversation.preview}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="message-part-2-chat">
          <div className="message-part-2-chat-header">
            <span className="mobile-back-icon">
              <IoArrowBackCircleSharp onClick={() => window.history.back()} />
            </span>
            <img
              src={currentConversation?.profilePictureUrl || profilePicSmall}
              alt="profile"
              className="message-part-2-profile-pic"
            />
            <h3>{currentConversation?.name || "Loading..."}</h3>
            <div className="call-video-icon">
              <span style={{ fontSize: "34px" }}>
                <IoCall />
              </span>
              <span style={{ fontSize: "34px" }}>
                <MdOutlineVideoCall />
              </span>
            </div>
          </div>
          <div className="message-part-2-chat-body" ref={chatBodyRef}>
            {!chatMessages.length && !isLoading && (
              <p className="message-part-2-no-messages">
                No messages yet. Start the conversation!
              </p>
            )}
            {chatMessages.map((message, index) => {
              const isNewSender =
                index === 0 ||
                message.senderId !== chatMessages[index - 1]?.senderId;
              const messageTime = new Date(
                message.timestamp
              ).toLocaleTimeString([], {
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
                    onContextMenu={(e) => handleRightClick(e, message.id)}
                    onTouchStart={(e) => handleTouchStart(e, message.id)}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="message-part-2-message-content-container">
                      {message.senderId !== senderId && (
                        <img
                          className="message-part-2-message-person-image"
                          src={
                            currentConversation?.profilePictureUrl ||
                            profilePicSmall
                          }
                          alt=""
                        />
                      )}
                      <div className="message-part-2-message-content">
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Message content"
                            className="message-image"
                          />
                        )}
                        {message.audio && (
                          <audio controls src={message.audio} />
                        )}
                        <p>{message.text}</p>
                        <span className="message-part-2-time">
                          {messageTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {contextMenu && (
              <div
                className="message-context-menu"

              >
                <button
                  onClick={() => handleDeleteMessage(contextMenu.messageId)}
                  className="message-context-menu-item"
                >
                  Delete <MdOutlineDeleteOutline />
                </button>
              </div>
            )}
          </div>
          <div className="message-part-2-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              className="message-part-2-input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleSendMessage}
              disabled={isSending}
            />
            {sendError && (
              <div className="message-error-alert">
                <span>{sendError}</span>
                <button
                  className="error-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSendError(null);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            {showStickers && (
              <div
                className="emoji-panel"
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="emoji-categories"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    marginBottom: "10px",
                  }}
                >
                  {emojisByCategory.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => setSelectedCategory(category.category)}
                      style={{
                        padding: "5px 10px",
                        fontSize: "14px",
                        background:
                          selectedCategory === category.category
                            ? "#007bff"
                            : "#f0f0f0",
                        color:
                          selectedCategory === category.category
                            ? "#fff"
                            : "#000",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      {category.category}
                    </button>
                  ))}
                </div>
                <div
                  className="emoji-list"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))",
                    gap: "5px",
                  }}
                >
                  {emojisByCategory
                    .find((cat) => cat.category === selectedCategory)
                    ?.emojis.map((emoji, index) => (
                      <span
                        key={index}
                        className="emoji-option"
                        onClick={() => addEmojiToInput(emoji)}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                        aria-label={`Emoji ${emoji}`}
                      >
                        {emoji}
                      </span>
                    ))}
                </div>
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
              <span
                className={`message-part-2-send-icon ${isSending ? "disabled" : ""
                  }`}
                onClick={!isSending ? handleSendClick : undefined}
              >
                <IoSend />
              </span>
              <span onClick={handleStickerClick}>
                <img
                  className="message-part-2-chat-all-icon"
                  src={stickerIcon}
                  alt="StickerIcon"
                />
              </span>
              <span onClick={handleGalleryClick}>
                <img
                  className="message-part-2-chat-all-icon"
                  src={gallaryIcon}
                  alt="GallaryIcon"
                />
              </span>
              <span onClick={handleVoiceRecord}>
                <img
                  className={`message-part-2-chat-all-icon ${isRecording ? "recording" : ""
                    }`}
                  src={microphoneIcon}
                  alt="MicrophoneIcon"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageFinalClass2;
