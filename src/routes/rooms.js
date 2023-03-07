import express from 'express';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/roomCont.js';
import { verifyAdmin } from '../lib/verifyToken.js';
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

export default router;
