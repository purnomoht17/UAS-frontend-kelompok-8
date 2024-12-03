const SubscribeRepository = require('../repository/subscribeRepository');

class SubscribeService {
  // Mendapatkan semua subscribers
  static async getAllSubscribe() {
    try {
      const subscribers = await SubscribeRepository.getAllSubscribe();
      return subscribers;
    } catch (error) {
      throw new Error(`Error fetching all subscribers: ${error.message}`);
    }
  }

  // Membuat subscriber baru
  static async createSubscribe(data) {
    try {
      // Validasi data
      if (!data.first_name || !data.email) {
        throw new Error('first_name and email are required.');
      }

      // Memanggil repository untuk menambahkan subscriber
      const newSubscriber = await SubscribeRepository.createSubscribe(data);
      return newSubscriber;
    } catch (error) {
      throw new Error(`Error creating subscriber: ${error.message}`);
    }
  }
}

module.exports = SubscribeService;