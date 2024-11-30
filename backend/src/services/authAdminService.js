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
  
}

module.exports = AuthAdminService;
