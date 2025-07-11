import { createContext, useContext, useState } from 'react';
import mockContacts from '../data/mockContacts';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [contacts] = useState(mockContacts);
  const [messages, setMessages] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  const sendMessage = (id, text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { text, sender: 'me', time };

    setMessages((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newMessage],
    }));
  };

  return (
    <ChatContext.Provider
      value={{
        contacts,
        messages,
        currentUserId,
        setCurrentUserId,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
