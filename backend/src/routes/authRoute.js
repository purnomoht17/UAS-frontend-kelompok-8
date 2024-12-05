// Mengimpor framework Express untuk membuat router
const express = require("express");

// Mengimpor AuthController yang berisi logika untuk otentikasi pengguna
const AuthController = require("../controllers/authController");

// Mengimpor AuthMiddleware yang berisi middleware untuk memverifikasi token
const AuthMiddleware = require("../middleware/authMiddleware");

// Membuat router baru menggunakan Express
const router = express.Router();

// Route untuk login
router.post("/login", AuthController.login);  
// Menangani permintaan POST ke "/login" yang akan memanggil fungsi "login" di AuthController untuk memverifikasi kredensial pengguna

// Route untuk logout
router.get("/logout", AuthController.logout);  
// Menangani permintaan GET ke "/logout" yang akan memanggil fungsi "logout" di AuthController untuk menghancurkan sesi pengguna

// Route protected untuk mendapatkan informasi pengguna
router.get("/userinfo", AuthMiddleware.verifyToken, (req, res) => {  
  // Menangani permintaan GET ke "/userinfo". Pertama, middleware "verifyToken" akan dijalankan untuk memverifikasi token JWT
  // Jika token valid, maka eksekusi fungsi berikutnya yang mengirimkan informasi pengguna yang sudah terautentikasi
  res.json({ user: req.user });  
  // Mengembalikan respons berupa data pengguna yang telah terautentikasi
});

// Mengekspor router agar bisa digunakan di file lain
module.exports = router;
