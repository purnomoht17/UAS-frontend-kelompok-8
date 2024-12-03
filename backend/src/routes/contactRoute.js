const express = require('express');
const ContactController = require('../controllers/contactController');
const AuthAdminMiddleware = require("../middleware/adminMiddleware");
const AuthMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Mendapatkan semua kontak, hanya untuk admin
router.get('/', AuthAdminMiddleware.verifyAdminToken, ContactController.getAllContact);

// Membuat kontak baru, membutuhkan token autentikasi
router.post('/', ContactController.createContact);

module.exports = router;
