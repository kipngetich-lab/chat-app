import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import chatService from '../services/chatService';
import RoomSelector from '../components/Chat/RoomSelector';
import ChatMessages from '../components/Chat/ChatMessages';
import ChatInput from '../components/Chat/ChatInput';
import OnlineUsers from '../components/Chat/OnlineUsers';

const ChatPage = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  const [privateRecipient, setPrivateRecipient] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await chatService.getRooms();
        setRooms(rooms);
        if (rooms.length > 0 && !currentRoom) {
          setCurrentRoom(rooms[0]._id);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (!currentRoom && !privateRecipient) return;

    const fetchMessages = async () => {
      try {
        let messages;
        if (privateRecipient) {
          messages = await chatService.getPrivateMessages(privateRecipient._id);
        } else {
          messages = await chatService.getMessages(currentRoom);
        }
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentRoom, privateRecipient]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUserTyping = ({ userId }) => {
      // In a real app, we'd fetch the user details
      setTypingUsers((prev) => {
        if (!prev.some(u => u._id === userId)) {
          return [...prev, { _id: userId, username: 'User' }];
        }
        return prev;
      });
    };

    const handleUserStoppedTyping = ({ userId }) => {
      setTypingUsers((prev) => prev.filter(u => u._id !== userId));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newPrivateMessage', handleNewMessage);
    socket.on('userTyping', handleUserTyping);
    socket.on('userStoppedTyping', handleUserStoppedTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newPrivateMessage', handleNewMessage);
      socket.off('userTyping', handleUserTyping);
      socket.off('userStoppedTyping', handleUserStoppedTyping);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !currentRoom) return;

    socket.emit('joinRoom', { roomId: currentRoom, userId: user.id });

    return () => {
      socket.emit('leaveRoom', { roomId: currentRoom, userId: user.id });
    };
  }, [socket, currentRoom, user.id]);

  const handleSelectRoom = (roomId) => {
    setCurrentRoom(roomId);
    setPrivateRecipient(null);
    setIsPrivateChat(false);
  };

  const handleSelectUser = (user) => {
    setPrivateRecipient(user);
    setIsPrivateChat(true);
    setCurrentRoom(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <RoomSelector
        rooms={rooms}
        currentRoom={currentRoom}
        onSelectRoom={handleSelectRoom}
        onCreateRoom={handleSelectRoom}
      />
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold">
            {isPrivateChat ? `Private chat with ${privateRecipient?.username}` : `Room: ${rooms.find(r => r._id === currentRoom)?.name}`}
          </h2>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <ChatMessages
              messages={messages}
              typingUsers={typingUsers}
              onlineUsers={users}
            />
            <ChatInput
              roomId={currentRoom}
              userId={user.id}
              isPrivate={isPrivateChat}
              recipientId={privateRecipient?._id}
            />
          </div>
          <OnlineUsers
            users={users}
            onSelectUser={handleSelectUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;