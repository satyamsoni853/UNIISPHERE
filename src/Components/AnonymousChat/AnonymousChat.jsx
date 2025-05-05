import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import { createAnonymousChat, sendAnonymousMessage, endAnonymousChat } from '../../services/anonymousChatService';
import './AnonymousChat.css';

const AnonymousChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatStatus, setChatStatus] = useState('initial'); // initial, waiting, chatting, ended
    const [chatId, setChatId] = useState(null);
    const [isUser1, setIsUser1] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Get userId from localStorage
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            navigate('/');
            return;
        }
        setUserId(storedUserId);

        // Connect socket
        const socket = socketService.connect(storedUserId);

        // Listen for chat match
        socket.on('chat-matched', (data) => {
            setChatId(data.chatId);
            setIsUser1(data.isUser1);
            setChatStatus('chatting');
            setError(null);
        });

        // Listen for messages
        socket.on('anonymous-message', (data) => {
            setMessages(prev => [...prev, {
                content: data.content,
                isFromMe: false,
                timestamp: new Date()
            }]);
        });

        // Listen for chat end
        socket.on('chat-ended', () => {
            setChatStatus('ended');
            // Clean up chat state after delay
            setTimeout(() => {
                setChatId(null);
                setMessages([]);
                setChatStatus('initial');
            }, 5000);
        });

        return () => {
            socketService.disconnect();
        };
    }, [navigate]);

    const startChat = async () => {
        if (!userId) {
            setError('User not authenticated');
            navigate('/');
            return;
        }

        try {
            setChatStatus('waiting');
            setError(null);
            const response = await createAnonymousChat(userId);
            
            if (response.chatId) {
                setChatId(response.chatId);
                setIsUser1(response.isUser1);
                setChatStatus('chatting');
            } else {
                setChatStatus('waiting');
            }
        } catch (err) {
            setError(err.message || 'Failed to start chat');
            setChatStatus('initial');
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || !chatId) return;

        try {
            await sendAnonymousMessage(chatId, inputMessage, isUser1, userId);
            setMessages(prev => [...prev, {
                content: inputMessage,
                isFromMe: true,
                timestamp: new Date()
            }]);
            setInputMessage('');
        } catch (err) {
            setError('Failed to send message');
        }
    };

    const handleEndChat = async () => {
        if (!chatId) return;

        try {
            await endAnonymousChat(chatId, userId);
            setChatStatus('ended');
        } catch (err) {
            setError('Failed to end chat');
        }
    };

    return (
        <div className="anonymous-chat-container">
            <div className="chat-header">
                <h2>Anonymous Chat</h2>
                {chatStatus === 'chatting' && (
                    <button onClick={handleEndChat} className="end-chat-btn">
                        End Chat
                    </button>
                )}
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {chatStatus === 'initial' && (
                <div className="start-chat-section">
                    <button onClick={startChat} className="start-chat-btn">
                        Start Anonymous Chat
                    </button>
                </div>
            )}

            {chatStatus === 'waiting' && (
                <div className="waiting-section">
                    <div className="spinner"></div>
                    <p>Waiting for someone to join...</p>
                </div>
            )}

            {(chatStatus === 'chatting' || chatStatus === 'ended') && (
                <>
                    <div className="messages-container">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.isFromMe ? 'sent' : 'received'}`}
                            >
                                <div className="message-content">{msg.content}</div>
                                <div className="message-timestamp">
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {chatStatus === 'chatting' && (
                        <div className="message-input-container">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                disabled={chatStatus !== 'chatting'}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || chatStatus !== 'chatting'}
                            >
                                Send
                            </button>
                        </div>
                    )}
                </>
            )}

            {chatStatus === 'ended' && (
                <div className="chat-ended-message">
                    <p>Chat has ended</p>
                    <button onClick={() => setChatStatus('initial')} className="start-new-chat-btn">
                        Start New Chat
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnonymousChat; 