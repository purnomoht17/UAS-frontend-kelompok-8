const multer = require('multer');
const path = require('path');

// Menentukan tempat penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Menyimpan file ke folder 'uploads'
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Membuat nama file unik menggunakan timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname); // Ekstensi file
    cb(null, uniqueSuffix + extname); // Menggunakan timestamp + ekstensi file asli
  }
});

// Filter untuk membatasi tipe file yang bisa diupload (misalnya hanya gambar)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // File valid
  } else {
    cb(new Error('Only image files are allowed'), false); // Jika tipe file tidak valid
  }
};

// Membatasi ukuran file upload (misalnya maksimal 5MB)
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Maksimal 5MB
});

module.exports = upload;
