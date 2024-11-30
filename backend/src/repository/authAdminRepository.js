const db = require("../config/database");

class AuthAdminRepository {
  // Mendapatkan admin berdasarkan username
  static async getAdminByUsername(username) {
    try {
      const query = "SELECT * FROM admins WHERE username = $1";
      const result = await db.query(query, [username]);

      // Jika tidak ditemukan admin dengan username tersebut
      if (result.rows.length === 0) {
        return null;  // Mengembalikan null jika tidak ditemukan admin
      }

      return result.rows[0];  // Mengembalikan data admin pertama (karena username unik)
    } catch (error) {
      console.error("Error fetching admin by username:", error);
      throw new Error("Error fetching admin from database");
    }
  }
}

module.exports = AuthAdminRepository;
