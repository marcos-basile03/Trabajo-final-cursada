import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

export default function ChatPage() {
  return (
    <div className="chat-page">
      <ChatHeader />
      <ChatWindow />
      <MessageInput />
    </div>
  );
}
