import React, { createContext, useState, useContext } from "react"; 
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { token, user } = useAuth();

  const [messagesByChat, setMessagesByChat] = useState({});
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  const fetchChats = async () => {
    if (!token) return;

    setIsLoadingChats(true);
    try {
      const res = await fetch(`${API_URL}/chats`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error cargando chats");

      setChats(data.chats || []);

    } catch (error) {
      console.error("Error al obtener chats:", error);
    } finally {
      setIsLoadingChats(false);
    }
  };

  const fetchMessages = async (chatId) => {
    if (!token || !chatId) return;

    setIsLoadingMessages(prev => ({ ...prev, [chatId]: true }));

    try {
      const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error cargando mensajes");

      setMessagesByChat(prev => ({
        ...prev,
        [chatId]: data.messages || [],
      }));

    } catch (error) {
      console.error("Error mensajes:", error.message);
    } finally {
      setIsLoadingMessages(prev => ({ ...prev, [chatId]: false }));
    }
  };

  const sendMessage = async (chatId, content) => {
    if (!token || !user || !chatId || !content) return;

    const tempId = Date.now().toString() + Math.random();
    const optimisticMessage = {
      id: tempId,
      content: content,
      sender: user.id,
      createdAt: new Date().toISOString(),
      status: 'sending',
      error: false,
    };

    addMessageOptimistic(chatId, optimisticMessage);

    try {
      const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Error al enviar mensaje");
      }

      updateMessage(chatId, tempId, data.message);
      fetchChats();

    } catch (error) {
      console.error("Error al enviar mensaje:", error.message);
      markMessageAsError(chatId, tempId);
    }
  };

  const createChat = async (partnerId) => {
    if (!token || !partnerId) return null;

    try {
      const res = await fetch(`${API_URL}/chats`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ partnerId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Error al crear chat");
      }

      const newChat = data.chat;
      setChats(prev => [newChat, ...prev]);
      return newChat;

    } catch (error) {
      console.error("Error al crear chat:", error.message);
      return null;
    }
  };

  const addMessageOptimistic = (chatId, msg) => {
    setMessagesByChat(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), msg],
    }));
  };

  const updateMessage = (chatId, tempId, realMessage) => {
    setMessagesByChat(prev => ({
      ...prev,
      [chatId]: prev[chatId].map(msg =>
        msg.id === tempId
          ? { ...realMessage, id: realMessage._id, status: "sent" }
          : msg
      ),
    }));
  };

  const markMessageAsError = (chatId, tempId) => {
    setMessagesByChat(prev => ({
      ...prev,
      [chatId]: prev[chatId].map(msg =>
        msg.id === tempId ? { ...msg, status: "failed", error: true } : msg
      ),
    }));
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        fetchChats,
        setChats,
        isLoadingChats,

        currentChatId,
        setCurrentChatId,

        messagesByChat,
        fetchMessages,
        isLoadingMessages,
        addMessageOptimistic,
        updateMessage,
        markMessageAsError,
        sendMessage,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
