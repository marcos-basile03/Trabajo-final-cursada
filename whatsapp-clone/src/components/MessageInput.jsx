import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import '../styles/MessageInput.css';

const API_URL = import.meta.env.VITE_API_URL;

function MessageInput() {
  const [messageText, setMessageText] = useState('');
  const { id: chatId } = useParams();

  const {
    addMessageOptimistic,
    updateMessage,
    markMessageAsError
  } = useChat();

  const { token } = useAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText.trim()) return;
    if (!token) {
      console.warn("No hay token disponible. Requiere autenticación.");
      return;
    }

    const content = messageText.trim();

    const tempId = Date.now();
    const optimisticMessage = {
      id: tempId,
      sender: "me",
      text: content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "sending"
    };

    addMessageOptimistic(chatId, optimisticMessage);
    setMessageText('');

    try {
       const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ content })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      const realMessage = data.message;


      updateMessage(chatId, tempId, realMessage);

    } catch (err) {
      console.error("Error enviando mensaje:", err.message);
      markMessageAsError(chatId, tempId);
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="message-input"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button type="submit" className="send-button">➤</button>
    </form>
  );
}

export default MessageInput;
