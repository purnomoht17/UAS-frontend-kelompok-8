const db = require('../config/database');

class TourRepository {
  // Menampilkan semua data tur (normal)
  static async getAllTours() {
    const query = `
      SELECT 
        id,
        name,
        duration,
        max_group_size AS maxGroupSize,
        difficulty,
        ratings_average AS ratingsAverage,
        ratings_quantity AS ratingsQuantity,
        price,
        summary,
        description,
        image_cover AS imageCover,
        images,
        start_dates AS startDates
      FROM tours
    `;
    const result = await db.query(query);
    return result.rows; // Mengembalikan semua data dalam bentuk array
  }

  // Menampilkan data tur sederhana
  static async getToursSimple() {
    const query = `
      SELECT 
        name, 
        ratings_average AS ratingsAverage, 
        price, 
        summary, 
        image_cover AS imageCover 
      FROM tours
    `;
    const result = await db.query(query);
    return result.rows; // Mengembalikan data sederhana dalam bentuk array
  }

  // Menampilkan data tur lengkap berdasarkan ID
  static async getTourById(id) {
    const query = `
      SELECT 
        id,
        name,
        duration,
        max_group_size AS maxGroupSize,
        difficulty,
        ratings_average AS ratingsAverage,
        ratings_quantity AS ratingsQuantity,
        price,
        summary,
        description,
        image_cover AS imageCover,
        images,
        start_dates AS startDates
      FROM tours
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0]; // Mengembalikan objek tunggal
  }

  // Menambahkan tur baru
  static async createTour(tourData) {
    const { name, duration, maxGroupSize, difficulty, price, summary, description, startDates, imageCover } = tourData;

    // Jika imageCover tidak ada, set null
    const imageCoverValue = imageCover || null;

    const query = `
      INSERT INTO tours (name, duration, max_group_size, difficulty, price, summary, description, start_dates, image_cover)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [name, duration, maxGroupSize, difficulty, price, summary, description, startDates, imageCoverValue];
    
    const result = await db.query(query, values);
    return result.rows[0]; // Mengembalikan tur yang baru dibuat
  }

  // Mengupdate tur berdasarkan ID
  static async updateTour(id, updatedData) {
    const { name, duration, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, price, summary, description, imageCover, images, startDates } = updatedData;

    // Jika imageCover tidak ada, set null
    const imageCoverValue = imageCover || null;

    const query = `
      UPDATE tours
      SET 
        name = $1,
        duration = $2,
        max_group_size = $3,
        difficulty = $4,
        ratings_average = $5,
        ratings_quantity = $6,
        price = $7,
        summary = $8,
        description = $9,
        image_cover = $10,
        images = $11,
        start_dates = $12
      WHERE id = $13
      RETURNING id, name, duration, max_group_size AS maxGroupSize, difficulty, ratings_average AS ratingsAverage, ratings_quantity AS ratingsQuantity, price, summary, description, image_cover AS imageCover, images, start_dates AS startDates
    `;
    
    const values = [
      name,
      duration,
      maxGroupSize,
      difficulty,
      ratingsAverage,
      ratingsQuantity,
      price,
      summary,
      description,
      imageCoverValue,  // Pastikan image_cover tidak null jika tidak ada gambar
      images,
      startDates,
      id
    ];

    const result = await db.query(query, values);
    return result.rows[0]; // Mengembalikan objek tur yang sudah diperbarui
  }

  // Menghapus tur berdasarkan ID
  static async deleteTour(id) {
    const query = `
      DELETE FROM tours
      WHERE id = $1
      RETURNING id, name
    `;
    
    const result = await db.query(query, [id]);
    
    if (result.rowCount === 0) {
      throw new Error('Tour not found'); // Jika tidak ada tur yang dihapus
    }
    
    return result.rows[0]; // Mengembalikan data tur yang dihapus
  }
}

module.exports = TourRepository;
