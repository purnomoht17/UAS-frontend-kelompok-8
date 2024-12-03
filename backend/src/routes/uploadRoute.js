const express = require('express');
const uploadController = require('../controllers/uploadController');
const upload = require('../middlewares/uploadMiddleware'); // Middleware upload gambar
const router = express.Router();

// Route untuk upload gambar dan menambahkan tour
router.post('/upload-image', upload.single('imageCover'), uploadController.uploadImage);

module.exports = router;
