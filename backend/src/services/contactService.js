const ContactRepository = require('../repository/contactRepository');

class ContactService {
  // Mendapatkan semua kontak
  static async getAllContacts() {
    try {
      const contacts = await ContactRepository.getAllContacts();
      return contacts;
    } catch (error) {
      console.error('Error in ContactService.getAllContacts:', error.message);
      throw new Error('Failed to fetch contacts');
    }
  }

  // Membuat kontak baru
  static async createContact(data) {
    try {
      const newContact = await ContactRepository.createContact(data);
      return newContact;
    } catch (error) {
      console.error('Error in ContactService.createContact:', error.message);
      throw new Error('Failed to create contact');
    }
  }

  // Memperbarui kontak yang ada
  static async updateContact(id, data) {
    try {
      const updatedContact = await ContactRepository.updateContact(id, data);
      return updatedContact;
    } catch (error) {
      console.error('Error in ContactService.updateContact:', error.message);
      if (error.message === 'Contact not found') {
        throw new Error('Contact not found');
      }
      throw new Error('Failed to update contact');
    }
  }
}

module.exports = ContactService;
