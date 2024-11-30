const express = require("express");
const router = express.Router();
const AuthAdminController = require("../controllers/authAdminController");
const AuthAdminMiddleware = require("../middleware/adminMiddleware"); // Middleware untuk verifikasi token admin

// Menggunakan JSON body parser
router.use(express.json());

// Route untuk login admin
router.post("/login", AuthAdminController.login);

// Route terproteksi untuk mendapatkan informasi admin yang sudah login
// Menggunakan middleware untuk memverifikasi token admin
router.get("/admininfo", AuthAdminMiddleware.verifyAdminToken, (req, res) => {
  res.json({
    message: "Admin info retrieved successfully",
    user: req.user,  // Admin info yang terverifikasi diambil dari req.user setelah token valid
  });
});

module.exports = router;
