const AdminRepository = require('../repository/adminRepository');
const bcrypt = require('bcrypt');

class AdminService {
  // Mendapatkan semua admin
  static async getAllAdmins() {
    return AdminRepository.getAllAdmins();
  }

  // Mendapatkan admin berdasarkan username
  static async getAdminByUsername(username) {
    return AdminRepository.getAdminByUsername(username);
  }

  // Membuat admin baru
  static async createAdmin(username, email, password) {
    // Meng-hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10); 
    return AdminRepository.createAdmin(username, email, hashedPassword);
  }

  // Mengupdate admin berdasarkan username
  static async updateAdmin(username, email, password) {
    // Meng-hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10); 
    return AdminRepository.updateAdmin(username, email, hashedPassword);
  }

  // Menghapus admin berdasarkan username
  static async deleteAdmin(username) {
    return AdminRepository.deleteAdmin(username);
  }
}

module.exports = AdminService;
