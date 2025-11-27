import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import '../styles/ChatPage.css';

export default function ChatPage() {
  return (
    <div className="chat-page">
      <div className="chat-container">
        <ChatHeader />
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
}