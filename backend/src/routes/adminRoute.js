const express = require('express');
const AdminController = require('../controllers/adminController');
const AdminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Route untuk mendapatkan semua admin
router.get('/', AdminController.getAllAdmins);

// Route untuk mendapatkan admin berdasarkan ID
router.get('/:id', AdminController.getAdminById);

// Route untuk membuat admin baru (tidak memerlukan token)
router.post('/', AdminController.createAdmin);

// Route untuk mengupdate admin berdasarkan ID
router.put('/:id', AdminController.updateAdmin);

// Route untuk menghapus admin berdasarkan ID
router.delete('/:id', AdminController.deleteAdmin);

module.exports = router;
