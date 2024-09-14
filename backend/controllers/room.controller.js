const prisma = require('../config/prisma');

// Create a new chat room
const createRoom = async (req, res) => {
  try {
    const { name, isPrivate } = req.body;

    // Check if room with the same name exists
    const existingRoom = await prisma.room.findUnique({
      where: { name: name },
    });

    if (existingRoom) {
      return res.status(400).json({ message: 'Room name already exists.' });
    }

    const room = await prisma.room.create({
      data: {
        name,
        isPrivate: isPrivate || false,
      },
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// List all available rooms
const listRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isPrivate: false }, // Only show public rooms
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createRoom, listRooms };