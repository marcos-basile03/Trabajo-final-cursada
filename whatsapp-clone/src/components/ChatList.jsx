import React from 'react';
import ChatListItem from './ChatListItem'; 
import { playersData } from '../data/playersData'; 
import '../styles/ChatList.css'; 

function ChatList() {
  return (
    <div className="chat-list-container">
      <h2>Chats</h2>
      <div className="chat-items">

        {playersData.map((player) => (
          <ChatListItem key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;