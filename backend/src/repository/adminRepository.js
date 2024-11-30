const db = require('../config/database');

class AdminRepository {

  // Mendapatkan semua admin
  static async getAllAdmins() {
    const query = "SELECT username, email, created_at, updated_at FROM admins";
    const result = await db.query(query);
    if (result.rows.length === 0) {
      return null; // Menandakan tidak ada admin
    }
    return result.rows;
  }

  // Mendapatkan admin berdasarkan ID
  static async getAdminById(id) {
    const query = "SELECT username, email, password, created_at, updated_at FROM admins WHERE username = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Menambahkan admin baru
  static async createAdmin(username, email, password) {
    const query = `
      INSERT INTO admins (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING username, email, created_at, updated_at
    `;
    const result = await db.query(query, [username, email, password]);
    return result.rows[0];
  }

  // Memperbarui informasi admin
  static async updateAdmin(username, email, password) {
    const query = `
      UPDATE admins
      SET email = $2, password = $3, updated_at = NOW()
      WHERE username = $1
      RETURNING username, email, created_at, updated_at
    `;
    const result = await db.query(query, [username, email, password]);
    return result.rows[0];
  }

  // Menghapus admin berdasarkan username
  static async deleteAdmin(username) {
    const query = "DELETE FROM admins WHERE username = $1 RETURNING username";
    const result = await db.query(query, [username]);
    return result.rows[0];
  }

}

module.exports = AdminRepository;
