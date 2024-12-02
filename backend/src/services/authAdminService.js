const AdminModel = require("../repository/authAdminRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../config/env");

class AuthAdminService {
  
  // Fungsi untuk memeriksa kredensial admin
  static async checkAdminCredentials(username, password) {
    try {
      // Mencari admin berdasarkan username
      const admin = await AdminModel.getAdminByUsername(username);
      
      if (!admin) {
        throw new Error("Admin not found");
      }

      // Memeriksa kecocokan password yang diberikan dengan password yang disimpan
      const passCheck = await bcrypt.compare(password, admin.password);
      
      if (passCheck) {
        // Jika berhasil login, buat token JWT
        console.log("Admin authenticated:", {
          admin_id: admin.admin_id,
          username: admin.username,
        });

        return {
          admin_id: admin.admin_id,
          username: admin.username,
          token: jwt.sign({ adminId: admin.admin_id }, data.secret, { expiresIn: "1h" }),
        };
      } else {
        throw new Error("Invalid password");
      }
      
    } catch (error) {
      console.error("Error checking admin credentials:", error.message);
      throw error; // Mengembalikan error agar dapat ditangani oleh controller
    }
  }
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
module.exports = AuthAdminService;
