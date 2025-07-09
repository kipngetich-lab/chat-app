const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const authService = {
  register: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
  
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
};

export default authService;