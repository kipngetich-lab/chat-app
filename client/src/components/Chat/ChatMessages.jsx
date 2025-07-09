import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const ChatMessages = ({ messages, typingUsers, onlineUsers }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`flex ${message.sender._id === user.id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender._id === user.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            <div className="font-semibold">{message.sender.username}</div>
            <div>{message.content}</div>
            <div className={`text-xs mt-1 ${message.sender._id === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
              {format(new Date(message.createdAt), 'HH:mm')}
            </div>
          </div>
        </div>
      ))}
      {typingUsers.length > 0 && (
        <div className="italic text-gray-500 text-sm">
          {typingUsers.map(user => user.username).join(', ')} is typing...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;