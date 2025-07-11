import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatListItem.css'; 

function ChatListItem({ player }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${player.id}`); 
  };

  return (
    <div className="chat-list-item" onClick={handleClick}>
      <img src={player.avatar} alt={player.name} className="avatar" />
      <div className="chat-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="last-message">{player.lastMessage}</p>
      </div>
      <span className="message-time">{player.lastMessageTime}</span>
    </div>
  );
}

export default ChatListItem;