const ContactService = require('../services/contactService');

class ContactController {
  // Mendapatkan semua kontak
  static async getAllContact(req, res) {
    try {
      const contacts = await ContactService.getAllContacts();
      res.status(200).json({ status: 'success', data: contacts });
    } catch (error) {
      console.error('Error in ContactController.getAllContact:', error.message);
      res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
  }

  // Membuat kontak baru
  static async createContact(req, res) {
    try {
      const { first_name, email, text_message } = req.body;

      // Validasi input
      if (!first_name) {
        return res.status(400).json({ message: 'Missing first name' });
      }
      if (!email) {
        return res.status(400).json({ message: 'Missing email' });
      }
      if (!text_message) {
        return res.status(400).json({ message: 'Missing message' });
      }

      // Memastikan bahwa email valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const newContact = await ContactService.createContact({ first_name, email, text_message });
      res.status(201).json({ status: 'success', data: newContact });
    } catch (error) {
      console.error('Error in ContactController.createContact:', error.message);
      res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
  }
}

module.exports = ContactController;
