import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  autoConnect: false,
 // withCredentials: true,
  withCredentials: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
});

export const connectSocket = (token) => {
  if (token) {
    socket.auth = { token };
  }
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;