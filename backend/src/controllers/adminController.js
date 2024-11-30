const AdminService = require('../services/adminService');

class AdminController {
  // Endpoint untuk mendapatkan semua admin
  static async getAllAdmins(req, res) {
    try {
      const admins = await AdminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving admins', error: error.message });
    }
  }

  // Endpoint untuk mendapatkan admin berdasarkan username
  static async getAdminByUsername(req, res) {
    try {
      const { username } = req.params;
      const admin = await AdminService.getAdminByUsername(username);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving admin', error: error.message });
    }
  }

  // Endpoint untuk membuat admin baru
  static async createAdmin(req, res) {
    try {
      const { username, email, password } = req.body;
      const newAdmin = await AdminService.createAdmin(username, email, password);
      res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
      res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
  }

  // Endpoint untuk mengupdate admin
  static async updateAdmin(req, res) {
    try {
      const { username } = req.params;
      const { email, password } = req.body;
      const updatedAdmin = await AdminService.updateAdmin(username, email, password);
      if (!updatedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
      res.status(500).json({ message: 'Error updating admin', error: error.message });
    }
  }

  // Endpoint untuk menghapus admin
  static async deleteAdmin(req, res) {
    try {
      const { username } = req.params;
      const deletedAdmin = await AdminService.deleteAdmin(username);
      if (!deletedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting admin', error: error.message });
    }
  }
}

module.exports = AdminController;
