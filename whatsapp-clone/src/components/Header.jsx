import { useParams } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import '../styles/ChatWindow.css';

export default function ChatHeader() {
  const { id } = useParams();
  const { contacts } = useChat();
  const contact = contacts.find((c) => c.id === id);

  return (
    <div className="chat-header">
      <img src={contact.image} alt={contact.name} className="chat-header-avatar" />
      <strong>{contact.name}</strong>
    </div>
  );
}
