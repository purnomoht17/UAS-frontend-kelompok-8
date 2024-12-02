const AuthService = require("../services/authService");
const AuthModel = require("../repository/authRepository");

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await AuthModel.getUserByEmail(email);
      const loginSuccess = await AuthService.checkCredentials(email, password);
      if (!loginSuccess) {
        return res.status(400).json({ message: "Wrong Email or Password!" });
      }
      res.json({ loginSuccess });
    } catch (error) {
      return next(error);
    }
  }

  // Fungsi logout
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err); // Log error logout
        return res.status(500).json({ error: "Error logging out", details: err.message });
      }

      // Redirect ke halaman login dengan pesan sukses
      res.redirect("/login?logout=success");
    });
  }
}

module.exports = AuthController;
