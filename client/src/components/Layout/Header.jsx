import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Socket.io Chat</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;