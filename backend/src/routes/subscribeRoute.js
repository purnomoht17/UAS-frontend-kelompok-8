const express = require('express');
const SubscribeController = require('../controllers/subscribeController');
const AuthAdminMiddleware = require("../middleware/adminMiddleware");
const AuthMiddleware = require("../middleware/authMiddleware"); // Asumsikan middleware ini sudah ada

const router = express.Router();

// Route untuk mendapatkan semua subscribers
router.get('/', AuthAdminMiddleware.verifyAdminToken, SubscribeController.getAllSubscribe);

// Route untuk membuat subscriber baru
router.post('/', SubscribeController.createSubscribe);

module.exports = router;