const AuthModel = require("../repository/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../config/env");

class AuthService {
  // Memeriksa kredensial pengguna
  static async checkCredentials(email, password) {
    try {
      const user = await AuthModel.getUserByEmail(email);
      if (!user) {
        console.error("User not found with email:", email);
        return null;
      }

      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        console.log("User authenticated:", {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        });

        // Generate token dengan JWT
        const token = jwt.sign({ userId: user.user_id }, data.secret, { expiresIn: "1h" });

        return {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          token,
        };
      }

      console.error("Password mismatch for email:", email);
      return null;
    } catch (error) {
      console.error("Error in checkCredentials:", error.message);
      throw error;
    }
  }

  // Logout dengan pengelolaan token (opsional)
  static async logout(req) {
    try {
      // Hapus token pada sisi client (biasanya di frontend)
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          throw new Error("Failed to logout user.");
        }
      });

      console.log("User session destroyed successfully.");
      return { success: true, message: "User logged out successfully." };
    } catch (error) {
      console.error("Error in logout:", error.message);
      throw error;
    }
  }
}

module.exports = AuthService;
