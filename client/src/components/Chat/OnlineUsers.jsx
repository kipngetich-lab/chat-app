import React from 'react';

const OnlineUsers = ({ users, onSelectUser }) => {
  return (
    <div className="w-64 border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-4">Online Users</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => onSelectUser(user)}
          >
            <span className={`inline-block w-3 h-3 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;