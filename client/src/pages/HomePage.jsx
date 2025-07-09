import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {user.username}!</h1>
        <p className="mb-6 text-center text-gray-600">
          You're now logged in to the chat application.
        </p>
        <button
          onClick={() => history.push('/chat')}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
        >
          Go to Chat
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;