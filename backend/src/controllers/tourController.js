const TourService = require('../services/tourService');

class TourController {
  // Mendapatkan semua data tur (lengkap)
  static async getAllTours(req, res) {
    try {
      const tours = await TourService.getAllTours();
      res.status(200).json({ status: 'success', data: tours });
    } catch (error) {
      console.error(error);
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
    console.log('Request Body:', req.body);

    // Menarik data dari request body
    const { name, duration, max_group_size, difficulty, price, summary, description } = req.body;
    const imageCover = req.file ? req.file.path : null;  // Jika ada file, gunakan path file, jika tidak null

    // Validasi input yang diperlukan
    if (!name) {
      console.log("Missing name");
      return res.status(400).json({ message: 'Missing name' });
    }
    if (!duration) {
      console.log("Missing duration");
      return res.status(400).json({ message: 'Missing duration' });
    }
    if (!max_group_size) {
      console.log("Missing max_group_size");
      return res.status(400).json({ message: 'Missing max_group_size' });
    }
    if (!difficulty) {
      console.log("Missing difficulty");
      return res.status(400).json({ message: 'Missing difficulty' });
    }
    if (!price) {
      console.log("Missing price");
      return res.status(400).json({ message: 'Missing price' });
    }
    if (!summary) {
      console.log("Missing summary");
      return res.status(400).json({ message: 'Missing summary' });
    }

    // Proses untuk membuat tur baru (menggunakan service untuk menambahkan ke database)
    const newTour = await TourService.createTour({
      name,
      duration,
      max_group_size,
      difficulty,
      price,
      summary,
      description,
      imageCover: imageCover || 'default-image.jpg',  // Pastikan imageCover ditangani dengan benar
    });
    

    // Mengembalikan response sukses
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
      const updatedData = req.body;

      // Validasi input
      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: 'No data to update' });
      }

      // Jika ada file gambar baru, ganti imageCover
      let imageCover = updatedData.imageCover || null;
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
