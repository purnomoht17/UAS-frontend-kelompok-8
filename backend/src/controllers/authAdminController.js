const AuthAdminService = require("../services/authAdminService");

class AuthAdminController {
  // Login untuk admin
  static async login(req, res, next) {
    const { username, password } = req.body;

    try {
      // Mengecek kredensial admin
      const adminData = await AuthAdminService.checkAdminCredentials(username, password);

      // Jika kredensial tidak valid
      if (!adminData) {
        return res.status(400).json({ message: "Wrong Username or Password!" });
      }

      // Login berhasil, kirimkan token dan data admin
      res.status(200).json({
        message: "Login successful",
        admin: {
          username: adminData.username,
          email: adminData.email,
        },
        token: adminData.token,  // Kirimkan token JWT
      });
    } catch (error) {
      // Tangani error
      console.error("Error logging in admin:", error);
      return next(error);  // Melanjutkan error ke handler middleware
    }
  }
}

module.exports = AuthAdminController;
