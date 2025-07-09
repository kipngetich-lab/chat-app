import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const chatService = {
  getRooms: async () => {
    try {
      const response = await axios.get(`${API_URL}/rooms`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  createRoom: async (name) => {
    try {
      const response = await axios.post(`${API_URL}/rooms`, { name }, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  },

  getMessages: async (roomId) => {
    try {
      const response = await axios.get(`${API_URL}/rooms/${roomId}/messages`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  getPrivateMessages: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}/messages`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error fetching private messages:', error);
      throw error;
    }
  }
};

export default chatService;