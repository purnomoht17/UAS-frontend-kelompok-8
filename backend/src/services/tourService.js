const TourRepository = require('../repository/tourRepository');

class TourService {
  // Mendapatkan semua data tur (lengkap)
  static async getAllTours() {
    try {
      return await TourRepository.getAllTours();
    } catch (error) {
      throw new Error(`Error fetching all tours: ${error.message}`);
    }
  }

  // Mendapatkan data tur sederhana
  static async getToursSimple() {
    try {
      return await TourRepository.getToursSimple();
    } catch (error) {
      throw new Error(`Error fetching simple tours: ${error.message}`);
    }
  }

  // Mendapatkan data tur lengkap berdasarkan ID
  static async getTourById(id) {
    try {
      return await TourRepository.getTourById(id);
    } catch (error) {
      throw new Error(`Error fetching tour by ID: ${error.message}`);
    }
  }

  // Membuat tur baru
  static async createTour(req, res) {
    try {
      return await TourRepository.createTour(req, res);
    } catch (error) {
      throw new Error(`Error creating tour: ${error.message}`);
    }
  }

  // Mengupdate tur berdasarkan ID
  static async updateTour(id, updatedData) {
    try {
      return await TourRepository.updateTour(id, updatedData);
    } catch (error) {
      throw new Error(`Error updating tour: ${error.message}`);
    }
  }

  // Menghapus tur berdasarkan ID
  static async deleteTour(id) {
    try {
      return await TourRepository.deleteTour(id);
    } catch (error) {
      throw new Error(`Error deleting tour: ${error.message}`);
    }
  }
}

module.exports = TourService;
