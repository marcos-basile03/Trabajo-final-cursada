import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import '../styles/MessageInput.css';

function MessageInput() {
  const [messageText, setMessageText] = useState('');
  const { playerId } = useParams();
  const { sendMessage } = useChat();

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      sendMessage(playerId, newMessage);
      setMessageText('');
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
      <button type="submit" className="send-button">
        ➤
      </button>
    </form>
  );
}

export default MessageInput;
