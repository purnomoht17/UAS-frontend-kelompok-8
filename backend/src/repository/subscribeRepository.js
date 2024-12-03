const db = require('../config/database');

class ContactRepository {
  // Menampilkan semua subscribers
  static async getAllSubscribe() {
    const query = `
      SELECT 
        id,
        first_name,
        email,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM subscribe
    `;
    const result = await db.query(query);
    return result.rows;
  }

  // Menambahkan subscriber baru
  static async createSubscribe(data) {
    try {
      const { first_name, email } = data;

      const query = `
        INSERT INTO subscribe (first_name, email)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [first_name, email];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating subscriber in repository:', error);
      throw error;
    }
  }
}

module.exports = ContactRepository;