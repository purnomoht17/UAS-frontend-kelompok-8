const express = require("express");
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route untuk login
router.post("/login", AuthController.login);

// Route untuk logout
router.get("/logout", AuthController.logout);

// Route protected untuk mendapatkan informasi pengguna
router.get("/userinfo", AuthMiddleware.verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
