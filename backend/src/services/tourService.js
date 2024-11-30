const TourRepository = require('../repository/tourRepository');

class TourService {
  // Mendapatkan semua data tur (lengkap)
  static async getAllTours() {
    return TourRepository.getAllTours();
  }

  // Mendapatkan data tur sederhana
  static async getToursSimple() {
    return TourRepository.getToursSimple();
  }

  // Mendapatkan data tur lengkap berdasarkan ID
  static async getTourById(id) {
    return TourRepository.getTourById(id);
  }

  // Membuat tur baru
  static async createTour(tourData) {
    return TourRepository.createTour(tourData);
  }

  // Mengupdate tur berdasarkan ID
  static async updateTour(id, updatedData) {
    return TourRepository.updateTour(id, updatedData);
  }

  // Menghapus tur berdasarkan ID
  static async deleteTour(id) {
    return TourRepository.deleteTour(id);
  }
}

module.exports = TourService;
