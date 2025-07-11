import React from 'react';
import '../styles/Message.css'; 

function Message({ text, sender, time }) {
  const messageClass = sender === 'me' ? 'my-message' : 'other-message';

  return (
    <div className={`message-bubble ${messageClass}`}>
      <p>{text}</p>
      <span className="message-time">{time}</span>
    </div>
  );
}


export default Message;