
import React, { createContext, useState, useContext } from 'react';
import { playersData } from '../data/playersData';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messagesByPlayer, setMessagesByPlayer] = useState(() => {
    const initial = {};
    playersData.forEach(player => {
      initial[player.id] = player.messages || [];
    });
    return initial;
  });

  const sendMessage = (playerId, newMessage) => {
    setMessagesByPlayer(prev => ({
      ...prev,
      [playerId]: [...(prev[playerId] || []), newMessage],
    }));
  };

  return (
    <ChatContext.Provider value={{ messagesByPlayer, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
