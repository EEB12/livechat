const express = require('express');
const { createRoom, listRooms} = require('../../../../controllers/room.controller')
const router = express.Router();


router.post('/create', createRoom);  
router.get('/list', listRooms);

module.exports = router;