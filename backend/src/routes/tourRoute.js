const express = require('express');
const TourController = require('../controllers/tourController');
const AuthMiddleware = require("../middleware/authMiddleware");
const AuthAdminMiddleware = require("../middleware/adminMiddleware");
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });  // Maksimal 10MB untuk file

const router = express.Router();

// Mendapatkan semua data tur (lengkap) dengan autentikasi
router.get('/', TourController.getAllTours);

// Mendapatkan tur berdasarkan ID dengan autentikasi
router.get('/:id', AuthMiddleware.verifyToken, TourController.getTourById);

// Membuat tur baru, hanya dapat diakses oleh admin dan menambahkan upload gambar
router.post('/', AuthAdminMiddleware.verifyAdminToken, upload.single('imageCover'), async (req, res, next) => {
  // Jika ada file yang diupload, pastikan file itu ada
  if (req.file) {
    req.body.imageCover = req.file.filename; // Menyimpan nama file untuk digunakan di controller
  }
  next();
}, TourController.createTour);

// Mengupdate tur berdasarkan ID, hanya dapat diakses oleh admin, dengan kemungkinan upload gambar
router.put('/:id', AuthAdminMiddleware.verifyAdminToken, upload.single('imageCover'), async (req, res, next) => {
  // Jika ada file yang diupload, pastikan file itu ada
  if (req.file) {
    req.body.imageCover = req.file.filename; // Menyimpan nama file untuk digunakan di controller
  }
  next();
}, TourController.updateTour);

// Menghapus tur berdasarkan ID, hanya dapat diakses oleh admin
router.delete('/:id', AuthAdminMiddleware.verifyAdminToken, TourController.deleteTour);

module.exports = router;
