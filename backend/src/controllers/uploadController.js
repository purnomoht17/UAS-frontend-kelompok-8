const TourRepository = require('../repositories/tourRepository'); // Import repository untuk menyimpan data

const uploadImage = async (req, res) => {
  try {
    // Ambil nama file yang telah di-upload
    const imageCover = req.file.filename;

    // Simpan data tur baru dengan nama file gambar di database
    const tourData = {
      name: req.body.name,
      duration: req.body.duration,
      max_group_size: req.body.max_group_size,
      difficulty: req.body.difficulty,
      price: req.body.price,
      summary: req.body.summary,
      description: req.body.description,
      image_cover: imageCover // Menyimpan nama file gambar
    };

    // Panggil repository untuk menambah tour baru
    const newTour = await TourRepository.createTour(tourData);

    res.status(200).json({
      message: 'Tour created successfully',
      tour: newTour
    });
  } catch (error) {
    console.error('Error uploading image or creating tour:', error);
    res.status(500).json({ message: 'Error uploading image or creating tour' });
  }
};

module.exports = { uploadImage };
