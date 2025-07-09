import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import notificationSound from '../../assets/notification.mp3';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      const audio = new Audio(notificationSound);
      audio.play();
      
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `New message from ${message.sender.username}`,
          content: message.content,
        },
      ]);

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newPrivateMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newPrivateMessage', handleNewMessage);
    };
  }, [socket]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-xs"
        >
          <p className="font-semibold">{notification.message}</p>
          <p className="text-sm text-gray-600 truncate">{notification.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;