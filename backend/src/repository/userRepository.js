const db = require('../config/database');

class UserModel {

  static async getAllUsers() {
    const query =
      "SELECT user_id, name, email, created_at, updated_at FROM users";
    const result = await db.query(query);
    return result.rows;
  }

  static async getUserById(id) {
    const query =
      "SELECT user_id, name, email, password, created_at, updated_at FROM users WHERE user_id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async createUser(name, email, password) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING user_id, name, email, created_at, updated_at
    `;
    const result = await db.query(query, [name, email, password]);
    return result.rows[0];
  }

  static async updateUser(id, name, email) {
    const query = `
      UPDATE users
      SET name = $2, email = $3, updated_at = NOW()
      WHERE user_id = $1
      RETURNING user_id, name, email, created_at, updated_at
    `;
    const result = await db.query(query, [id, name, email]);
    return result.rows[0];
  }

  static async deleteUser(id) {
    const query = "DELETE FROM users WHERE user_id = $1 RETURNING user_id";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = UserModel;
