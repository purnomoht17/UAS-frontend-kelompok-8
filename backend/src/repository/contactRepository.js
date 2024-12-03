const db = require('../config/database');

class ContactRepository {
  // Menampilkan semua kontak
  static async getAllContacts() {
    const query = `
      SELECT 
        id,
        first_name,
        email,
        text_message,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM contact
    `;
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      throw new Error('Failed to fetch contacts');
    }
  }

  // Menambahkan kontak baru
  static async createContact(data) {
    const { first_name, email, text_message = null } = data;

    const query = `
      INSERT INTO contact (first_name, email, text_message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [first_name, email, text_message];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating contact in repository:', error.message);
      throw new Error('Failed to create contact');
    }
  }

  // Menambahkan fitur jika Anda ingin mengupdate kontak
  static async updateContact(id, data) {
    const { first_name, email, text_message } = data;

    const query = `
      UPDATE contact
      SET 
        first_name = COALESCE($1, first_name),
        email = COALESCE($2, email),
        text_message = COALESCE($3, text_message),
        updated_at = current_timestamp
      WHERE id = $4
      RETURNING *;
    `;
    const values = [first_name, email, text_message, id];

    try {
      const result = await db.query(query, values);
      if (result.rowCount === 0) {
        throw new Error('Contact not found');
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error updating contact:', error.message);
      throw new Error('Failed to update contact');
    }
  }
}

module.exports = ContactRepository;
