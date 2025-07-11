// src/components/Message.jsx
import React from 'react';
import '../styles/Message.css'; // Estilos para los mensajes

function Message({ message }) {
  // La clase CSS dependerá de si el mensaje es 'me' (mío) o 'other' (del otro)
  const messageClass = message.sender === 'me' ? 'my-message' : 'other-message';

  return (
    <div className={`message-bubble ${messageClass}`}>
      <p>{message.text}</p>
      <span className="message-time">{message.time}</span>
    </div>
  );
}

export default Message;