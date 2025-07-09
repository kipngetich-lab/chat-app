import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function Chat({ token }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const [activeChat, setActiveChat] = useState('global');
  const [privateMessages, setPrivateMessages] = useState({});

const handleSendPrivateMessage = (userId, content) => {
  socketRef.current.emit('private message', { to: userId, content });
};

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:5000', {
      auth: { token },
    });

    // Set up event listeners
    socketRef.current.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on('user online', (username) => {
      setOnlineUsers((prev) => [...prev, username]);
    });

    socketRef.current.on('user offline', (username) => {
      setOnlineUsers((prev) => prev.filter((u) => u !== username));
    });


    socketRef.current.on('private message', (msg) => {
  const chatId = msg.isPrivate 
    ? msg.sender._id === socketRef.current.user.userId 
      ? msg.recipient 
      : msg.sender._id
    : 'global';
  
  setPrivateMessages((prev) => ({
    ...prev,
    [chatId]: [...(prev[chatId] || []), msg],
  }));
});

    socketRef.current.on('typing', ({ username, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping && !prev.includes(username)) {
          return [...prev, username];
        } else if (!isTyping) {
          return prev.filter((u) => u !== username);
        }
        return prev;
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      socketRef.current.emit('chat message', {
        content: messageInput,
        room: 'global',
      });
      setMessageInput('');
    }
  };

  const handleTyping = () => {
    socketRef.current.emit('typing', 'global');
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('stop typing', 'global');
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      {/* Online users sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h3 className="font-semibold mb-4">Online Users</h3>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user} className="py-1">{user}</li>
          ))}
        </ul>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="font-semibold">{msg.sender.username}</div>
              <div className="text-gray-700">{msg.content}</div>
              <div className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
          
          {typingUsers.length > 0 && (
            <div className="text-sm text-gray-500 italic">
              {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
                handleTyping();
              }}
              className="flex-1 p-2 border rounded-l"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}