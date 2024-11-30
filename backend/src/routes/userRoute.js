const express = require('express');
const UserController = require('../controllers/userController');
const AuthMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/',AuthMiddleware.verifyToken, UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
module.exports = router;    
