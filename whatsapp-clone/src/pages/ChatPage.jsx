import ChatList from '../components/ChatList'; // Importa la lista de chats para el sidebar
import ChatWindow from '../components/ChatWindow'; // Tu ventana de chat
import '../styles/App.css'; // Importa el CSS que tiene las clases de layout (.app-container, .sidebar, .main-content)

export default function ChatPage() {
  return (
    // 1. Contenedor principal para el layout de dos columnas
    <div className="app-container">
      
      {/* 2. Barra lateral (Sidebar): Muestra la lista de chats */}
      <div className="sidebar">
        <ChatList />
      </div>
      
      {/* 3. Área principal (Main Content): Contiene la ventana de chat activa */}
      <div className="main-content">
        {/* Usamos solo ChatWindow, ya que este componente incluye el Header y el Input */}
        <ChatWindow />
      </div>
    </div>
  );
}