const db = require('../config/database');

class AdminRepository {
  // Mendapatkan semua admin
  static async getAllAdmins() {
    const query = "SELECT * FROM admins";
    const result = await db.query(query);
    if (result.rows.length === 0) {
      return null; // Menandakan tidak ada admin
    }
    return result.rows;
  }

  // Mendapatkan admin berdasarkan ID
  static async getAdminById(id) {
    const query = `
      SELECT id, username, email, password, created_at, updated_at 
      FROM admins 
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return null; // Admin dengan ID tertentu tidak ditemukan
    }
    return result.rows[0];
  }

  // Menambahkan admin baru
  static async createAdmin(username, email, password) {
    const query = `
      INSERT INTO admins (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at, updated_at
    `;
    const result = await db.query(query, [username, email, password]);
    return result.rows[0];
  }

  // Memperbarui informasi admin berdasarkan ID
  static async updateAdmin(id, username, email, password) {
    const query = `
      UPDATE admins
      SET username = $2, email = $3, password = $4, updated_at = NOW()
      WHERE id = $1
      RETURNING id, username, email, created_at, updated_at
    `;
    const result = await db.query(query, [id, username, email, password]);
    if (result.rows.length === 0) {
      return null; // Tidak ada admin dengan ID tersebut
    }
    return result.rows[0];
  }

  // Menghapus admin berdasarkan ID
  static async deleteAdmin(id) {
    const query = "DELETE FROM admins WHERE id = $1 RETURNING id, username";
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return null; // Tidak ada admin dengan ID tersebut
    }
    return result.rows[0];
  }
}

module.exports = AdminRepository;
