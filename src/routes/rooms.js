const express = require('express');

const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require('../controllers/roomCont.js');

const { verifyAdmin } = require('../lib/verifyToken.js');

const router = express.Router();

//CREATE
router.post('/:hotelId', verifyAdmin, createRoom);
//UPDATE
router.put('/:id', verifyAdmin, updateRoom);

router.put('/available/:id', updateRoomAvailability);
//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);
//GET
router.get('/:id', getRoom);
//GET ALL
router.get('/', getRooms);

module.exports = router;
