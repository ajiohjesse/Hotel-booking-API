import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userCont.js';
import {
  verifyAdmin,
  verifyUser,
} from '../lib/verifyToken.js';
const router = express.Router();

// router.get("/checkauthentication/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are logged in.");
// });

//UPDATE
router.put('/:id', verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyUser, deleteUser);
//GET
router.get('/:id', verifyUser, getUser);
//GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;
