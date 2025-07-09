const User = require('../models/User'); // Add this import at the top
const Message = require('../models/Message');
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Join room handler
    socket.on('joinRoom', async ({ roomId, userId }) => {
      try {
        socket.join(roomId);
        await User.findByIdAndUpdate(userId, { 
          online: true, 
          socketId: socket.id 
        });
        io.to(roomId).emit('userOnline', { userId });
        console.log(`User ${userId} joined room ${roomId}`);
      } catch (error) {
        console.error('Join room error:', error);
      }
    });

    // Leave room handler
    socket.on('leaveRoom', async ({ roomId, userId }) => {
      try {
        socket.leave(roomId);
        await User.findByIdAndUpdate(userId, { 
          online: false, 
          lastSeen: Date.now() 
        });
        io.to(roomId).emit('userOffline', { userId });
        console.log(`User ${userId} left room ${roomId}`);
      } catch (error) {
        console.error('Leave room error:', error);
      }
    });

    // Message handlers
    socket.on('sendMessage', async ({ roomId, senderId, content }) => {
      try {
        const message = await Message.create({
          sender: senderId,
          content,
          room: roomId
        });
        
        const populatedMessage = await Message.populate(message, {
          path: 'sender',
          select: 'username'
        });

        io.to(roomId).emit('newMessage', populatedMessage);
      } catch (error) {
        console.error('Send message error:', error);
      }
    });

    // Disconnection handler
    socket.on('disconnect', async () => {
      try {
        const user = await User.findOneAndUpdate(
          { socketId: socket.id },
          { 
            online: false, 
            lastSeen: Date.now(), 
            socketId: null 
          }
        );
        
        if (user) {
          io.emit('userOffline', { userId: user._id });
        }
        console.log(`User disconnected: ${socket.id}`);
      } catch (error) {
        console.error('Disconnection error:', error);
      }
    });
  });
};