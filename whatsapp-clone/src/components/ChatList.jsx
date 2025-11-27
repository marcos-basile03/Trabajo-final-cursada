import React, { useEffect, useState } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ChatList() {

  const {
    chats,
    fetchChats,
    currentChatId,
    setCurrentChatId,
    createChat
  } = useChat();

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchChats();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div className="p-4 text-center">Inicia sesión para ver tus chats.</div>;
  }

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  const handleCreateChat = async () => {
    setError("");

    if (!partnerId.trim()) {
      setError("Debes ingresar un ID de usuario válido.");
      return;
    }

    try {
      setCreating(true);

      const newChat = await createChat(partnerId);

      if (!newChat || !newChat._id) {
        throw new Error("Error inesperado creando el chat");
      }

      // limpiar
      setPartnerId("");
      setShowCreateForm(false);

      // navegar al chat recién creado
      handleSelectChat(newChat._id);

    } catch (err) {
      setError(err.message || "Error al crear el chat");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="sidebar-container">

      {/* HEADER + BOTÓN NUEVO */}
      <div className="sidebar-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Chats</h1>

        <button
          onClick={() => setShowCreateForm(prev => !prev)}
          className="new-chat-button"
          style={{
            background: "#4a90e2",
            color: "white",
            borderRadius: "6px",
            padding: "4px 10px",
            cursor: "pointer",
            fontSize: "14px",
            border: "none"
          }}
        >
          + Nuevo
        </button>
      </div>

      {/* FORMULARIO DE CREACIÓN */}
      {showCreateForm && (
        <div className="create-chat-form" style={{ padding: "10px" }}>
          <label style={{ fontSize: "14px" }}>ID del usuario:</label>
          <input
            type="text"
            value={partnerId}
            onChange={e => setPartnerId(e.target.value)}
            placeholder="ID del usuario con quien chatear"
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />

          {error && (
            <p style={{ color: "red", marginTop: "4px", fontSize: "13px" }}>
              {error}
            </p>
          )}

          <button
            disabled={creating}
            onClick={handleCreateChat}
            style={{
              marginTop: "10px",
              width: "100%",
              background: creating ? "#999" : "#4caf50",
              color: "white",
              padding: "8px",
              border: "none",
              borderRadius: "4px",
              cursor: creating ? "not-allowed" : "pointer"
            }}
          >
            {creating ? "Creando..." : "Crear Chat"}
          </button>
        </div>
      )}

      {/* LISTA DE CHATS */}
      <div className="chat-list-scroll">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Aún no tienes chats. ¡Crea uno!
          </div>
        ) : (
          chats.map(chat => (
            <div
              key={chat._id}
              className={`chat-item ${chat._id === currentChatId ? 'active' : ''}`}
              onClick={() => handleSelectChat(chat._id)}
            >
              <div className="chat-info">
                <span className="chat-name">
                  {chat.partnerName || "Chat"}
                </span>

                <span className="chat-last-message">
                  {chat.lastMessage?.content || "Pulsa para empezar a chatear"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
