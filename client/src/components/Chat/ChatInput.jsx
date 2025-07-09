import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';

const ChatInput = ({ roomId, userId, isPrivate, recipientId }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const socket = useSocket();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (isPrivate) {
      socket.emit('sendPrivateMessage', {
        senderId: userId,
        recipientId,
        content: message
      });
    } else {
      socket.emit('sendMessage', {
        roomId,
        senderId: userId,
        content: message
      });
    }

    setMessage('');
    socket.emit('stopTyping', { roomId, userId });
    setIsTyping(false);
  };

  const handleKeyDown = () => {
    if (!isTyping) {
      socket.emit('typing', { roomId, userId });
      setIsTyping(true);
    }
  };

  const handleBlur = () => {
    if (isTyping) {
      socket.emit('stopTyping', { roomId, userId });
      setIsTyping(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;