const express = require("express");
const router = express.Router();
const app = express();
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middleware/authMiddleware");

app.use(express.json());
router.post("/login", AuthController.login)

//test protected api
router.get("/userinfo", AuthMiddleware.verifyToken, (req,res) => {
  res.json({user: req.user});
})

module.exports = router;
