const SubscribeService = require('../services/subscribeService');

class SubscribeController {
  // Mendapatkan semua subscribers
  static async getAllSubscribe(req, res) {
    try {
      const subscribers = await SubscribeService.getAllSubscribe();
      res.status(200).json({ status: 'success', data: subscribers });
    } catch (error) {
      console.error('Error retrieving subscribers:', error);
      res.status(500).json({ status: 'error', message: 'Error retrieving subscribers', error: error.message });
    }
  }

  // Membuat subscriber baru
  static async createSubscribe(req, res) {
    try {
      const { first_name, email } = req.body;

      // Validasi input
      if (!first_name || !email) {
        return res.status(400).json({ status: 'error', message: 'first_name and email are required.' });
      }

      const newSubscriber = await SubscribeService.createSubscribe({ first_name, email });
      res.status(201).json({ status: 'success', data: newSubscriber });
    } catch (error) {
      console.error('Error creating subscriber:', error);
      res.status(500).json({ status: 'error', message: 'Error creating subscriber', error: error.message });
    }
  }
}

module.exports = SubscribeController;