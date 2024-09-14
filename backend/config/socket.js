const prisma = require('../config/prisma'); // Import Prisma for database actions
const io = require('../bin/www').io; // Get the Socket.IO instance

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('new-notification', async ({ recipientId, message }) => {

    // Find the socket id of the recipient
    const recipient = await prisma.user.findFirst({
      where: {
        id: recipientId,
      }
    });

    if (recipient) {
      console.log(`Received new notification for recipientId: ${recipientId}, message: ${message}`);

      io.to(recipient.socket_id).emit('new-notification', {
        message,
      });
    }
  });
  // Join room
  socket.on('joinRoom', async ({ roomId, userId }) => {
    try {
      // Check if the user is already in the room
      const userRoom = await prisma.userRoom.findFirst({
        where: {
          roomId,
          userId,
        },
      });

      if (!userRoom) {
        // Add user to the room in the database
        await prisma.userRoom.create({
          data: {
            userId: userId,
            roomId: roomId,
          },
        });
      }

      // Join room in Socket.IO
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);

      // Notify the room that the user joined
      io.to(roomId).emit('message', {
        content: `User ${userId} joined the room.`,
        roomId,
        userId,
      });
    } catch (err) {
      console.error('Error joining room:', err);
    }
  });

  // Handle messages sent to the room
  socket.on('sendMessage', async ({ roomId, content, userId }) => {
    try {
      // Save the message in the database
      const message = await prisma.message.create({
        data: {
          content,
          userId,
          roomId,
        },
        include: {
          user: true,
        },
      });

      // Broadcast the message to everyone in the room
      io.to(roomId).emit('message', message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  // Leave room
  socket.on('leaveRoom', async ({ roomId, userId }) => {
    try {
      // Remove user from the room in the database
      await prisma.userRoom.deleteMany({
        where: {
          roomId: roomId,
          userId: userId,
        },
      });

      // Leave the room in Socket.IO
      socket.leave(roomId);
      console.log(`User ${userId} left room ${roomId}`);

      // Notify the room that the user left
      io.to(roomId).emit('message', {
        content: `User ${userId} left the room.`,
        roomId,
        userId,
      });
    } catch (err) {
      console.error('Error leaving room:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});