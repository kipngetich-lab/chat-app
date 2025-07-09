import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import chatService from '../../services/chatService';

const RoomSelector = ({ rooms, currentRoom, onSelectRoom, onCreateRoom }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [allRooms, setAllRooms] = useState(rooms);
  const socket = useSocket();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await chatService.getRooms();
        setAllRooms(rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      const room = await chatService.createRoom(newRoomName);
      setAllRooms([...allRooms, room]);
      setNewRoomName('');
      onCreateRoom(room._id);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-4">Chat Rooms</h3>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="New room name"
        />
        <button
          onClick={handleCreateRoom}
          className="px-2 py-1 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          +
        </button>
      </div>
      <ul className="space-y-2">
        {allRooms.map((room) => (
          <li
            key={room._id}
            className={`p-2 rounded cursor-pointer ${currentRoom === room._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => onSelectRoom(room._id)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomSelector;