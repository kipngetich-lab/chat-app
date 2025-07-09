// server/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const {
  getRooms,
  createRoom,
  getMessages,
  getPrivateMessages
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/rooms', protect, getRooms);
router.post('/rooms', protect, createRoom);
router.get('/rooms/:roomId/messages', protect, getMessages);
router.get('/users/:userId/messages', protect, getPrivateMessages);

module.exports = router;