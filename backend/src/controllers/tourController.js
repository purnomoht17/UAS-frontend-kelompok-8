const TourService = require('../services/tourService');

class TourController {
  // Mendapatkan semua data tur (lengkap)
  static async getAllTours(req, res) {
    try {
      const tours = await TourService.getAllTours();
      res.status(200).json({ status: 'success', data: tours });
    } catch (error) {
      console.error(error);  // Menampilkan error di konsol untuk debugging
      res.status(500).json({ message: 'Error retrieving tours', error: error.message });
    }
  }

  // Mendapatkan data tur sederhana
  static async getToursSimple(req, res) {
    try {
      const tours = await TourService.getToursSimple();
      res.status(200).json({ status: 'success', data: tours });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving simple tours', error: error.message });
    }
  }

  // Mendapatkan data tur lengkap berdasarkan ID
  static async getTourById(req, res) {
    try {
      const { id } = req.params;
      const tour = await TourService.getTourById(id);
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.status(200).json({ status: 'success', data: tour });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving tour', error: error.message });
    }
  }

  // Membuat tur baru
  static async createTour(req, res) {
    try {
      const tourData = req.body; // Data tur dari request body
      let imageCover = null;

      // Jika file gambar diupload, simpan nama file-nya
      if (req.file) {
        imageCover = req.file.filename; // Nama file yang diupload
      }

      // Menambahkan nama gambar ke dalam data tour
      const newTour = await TourService.createTour({ ...tourData, imageCover });
      res.status(201).json({ status: 'success', data: newTour });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating tour', error: error.message });
    }
  }

  // Mengupdate tur berdasarkan ID
  static async updateTour(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body; // Data tur yang diperbarui dari request body
      let imageCover = updatedData.imageCover || null;

      // Jika file gambar baru diupload, perbarui nama file-nya
      if (req.file) {
        imageCover = req.file.filename; // Nama file yang diupload
      }

      const updatedTour = await TourService.updateTour(id, { ...updatedData, imageCover });
      if (!updatedTour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.status(200).json({ status: 'success', data: updatedTour });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating tour', error: error.message });
    }
  }

  // Menghapus tur berdasarkan ID
  static async deleteTour(req, res) {
    try {
      const { id } = req.params;
      const deletedTour = await TourService.deleteTour(id);
      if (!deletedTour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.status(200).json({ status: 'success', message: 'Tour deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting tour', error: error.message });
    }
  }
}

module.exports = TourController;
