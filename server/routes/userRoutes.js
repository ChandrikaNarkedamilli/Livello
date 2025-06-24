const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
} = require('../controllers/UserController');

const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', verifyToken, isAdmin, getUsers);   
router.get('/:id', verifyToken, getUserById);         
router.post('/', verifyToken, isAdmin,upload.single('profilePicture'), createUser);      
router.put('/:id', verifyToken,upload.single('profilePicture'), updateUser);             
router.delete('/:id', verifyToken, isAdmin, deleteUser); 

module.exports = router;
