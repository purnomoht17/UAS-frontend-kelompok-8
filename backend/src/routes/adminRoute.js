const express = require('express');
const AdminController = require('../controllers/adminController');
const AdminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Menambahkan verifikasi token untuk semua route terkait admin, kecuali login
router.get('/', AdminMiddleware.verifyAdminToken, AdminController.getAllAdmins);
router.get('/:username', AdminMiddleware.verifyAdminToken, AdminController.getAdminByUsername);
router.post('/', AdminController.createAdmin);
router.put('/:username', AdminMiddleware.verifyAdminToken, AdminController.updateAdmin);
router.delete('/:username', AdminMiddleware.verifyAdminToken, AdminController.deleteAdmin);

module.exports = router;
