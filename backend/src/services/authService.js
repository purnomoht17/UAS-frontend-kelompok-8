// Mengimpor model AuthModel untuk mengakses data pengguna dari repository
const AuthModel = require("../repository/authRepository");
// Mengimpor bcrypt untuk memeriksa password yang terenkripsi
const bcrypt = require("bcrypt");
// Mengimpor jsonwebtoken untuk membuat dan memverifikasi token JWT
const jwt = require("jsonwebtoken");
// Mengimpor konfigurasi lingkungan untuk mendapatkan data seperti secret key
const data = require("../config/env");

class AuthService {
  // Memeriksa kredensial pengguna
  static async checkCredentials(email, password) {
    try {
      // Mengambil data pengguna berdasarkan email dari AuthModel
      const user = await AuthModel.getUserByEmail(email);

      // Jika pengguna tidak ditemukan, tampilkan pesan kesalahan
      if (!user) {
        console.error("User not found with email:", email);
        return null;  // Mengembalikan null jika pengguna tidak ditemukan
      }

      // Membandingkan password yang dimasukkan dengan password yang tersimpan (dalam bentuk terenkripsi)
      const passCheck = await bcrypt.compare(password, user.password);

      // Jika password cocok
      if (passCheck) {
        // Menampilkan data pengguna yang berhasil diautentikasi di konsol
        console.log("User authenticated:", {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        });

        // Membuat token JWT yang berisi ID pengguna, dengan waktu kedaluwarsa 1 jam
        const token = jwt.sign({ userId: user.user_id }, data.secret, { expiresIn: "1h" });

        // Mengembalikan informasi pengguna dan token yang dihasilkan
        return {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          token,  // Mengembalikan token JWT untuk sesi autentikasi pengguna
        };
      }

      // Jika password tidak cocok
      console.error("Password mismatch for email:", email);
      return null;  // Mengembalikan null jika password tidak cocok
    } catch (error) {
      // Menangkap dan menampilkan error jika terjadi kesalahan dalam proses
      console.error("Error in checkCredentials:", error.message);
      throw error;  // Melempar error lebih lanjut agar bisa ditangani di level yang lebih tinggi
    }
  }

  // Logout dengan pengelolaan token (opsional)
  static async logout(req) {
    try {
      // Menghancurkan sesi pengguna pada sisi server (misalnya menghapus session ID)
      req.session.destroy((err) => {
        // Menangani kesalahan jika gagal menghancurkan sesi
        if (err) {
          console.error("Error destroying session:", err);
          throw new Error("Failed to logout user.");  // Menghasilkan error jika logout gagal
        }
      });

      // Menampilkan pesan bahwa sesi pengguna telah dihancurkan
      console.log("User session destroyed successfully.");
      
      // Mengembalikan respons yang menandakan pengguna berhasil logout
      return { success: true, message: "User logged out successfully." };
    } catch (error) {
      // Menangkap dan menampilkan error jika terjadi kesalahan dalam proses logout
      console.error("Error in logout:", error.message);
      throw error;  // Melempar error lebih lanjut agar bisa ditangani di level yang lebih tinggi
    }
  }
}

// Mengekspor kelas AuthService agar dapat digunakan di bagian lain aplikasi
module.exports = AuthService;
