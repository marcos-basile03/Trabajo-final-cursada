import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from './Message';
import MessageInput from './MessageInput';

import '../styles/ChatWindow.css';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

function ChatWindow() {

  const { id: chatId } = useParams();
  const navigate = useNavigate();

  const { chats, messagesByChat, fetchMessages } = useChat();
  const { user, token } = useAuth();

  const messagesEndRef = useRef(null);

  // ===========================
  // 1. Obtener info del chat
  // ===========================
  const chat = chats.find(c => c._id === chatId);

  // Nombre del otro usuario
  const partnerName = chat?.partnerName || "Chat";

  // ===========================
  // 2. Obtener mensajes
  // ===========================
  const currentMessages = messagesByChat[chatId] || [];

  // ===========================
  // 3. Fetch mensajes al abrir chat
  // ===========================
  useEffect(() => {
    if (chatId && token) {
      fetchMessages(chatId);
    }
  }, [chatId, token]);

  // ===========================
  // 4. Scroll al final
  // ===========================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleBack = () => navigate('/');

  if (!chat) {
    return (
      <div className="chat-window-container no-chat-selected">
        <p>Error: chat no encontrado. ID: {chatId}</p>
      </div>
    );
  }

  return (
    <div className="chat-window-container">

      {/* HEADER */}
      <div className="chat-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>

        <h3>{partnerName}</h3>
      </div>

      {/* MENSAJES */}
      <div className="messages-container">
        
        {currentMessages.map(msg => (
          <Message
            key={msg._id || msg.id}
            text={msg.content}
            isOwnMessage={msg.sender === user._id}
            time={msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
            error={msg.error}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <MessageInput chatId={chatId} />

    </div>
  );
}

export default ChatWindow;
