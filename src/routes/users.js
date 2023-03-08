const express = require('express');

const {
  deleteUser,
  getUser,
  updateUser,
} = require('../controllers/userCont.js');

const {
  verifyAdmin,
  verifyUser,
} = require('../lib/verifyToken.js');

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

router.get('/test/me', async (req, res) => {
  res.status(200).json({
    name: 'Jesse Ajioh',
  });
});
//GET ALL
router.get('/', verifyAdmin, getUsers);

module.exports = router;
