// Mengimpor objek Pool dari library 'pg' untuk mengelola koneksi ke database PostgreSQL
const { Pool } = require("pg");

// Mengimpor data konfigurasi dari file env.js yang berisi informasi sensitif seperti kredensial database
const data = require("./env.js");

// Membuat instance dari Pool dengan konfigurasi koneksi yang diambil dari file env.js
const pool = new Pool({
  user: data.user,        // Nama pengguna untuk mengakses database
  host: data.host,        // Alamat server database (misalnya, 'localhost')
  database: data.database, // Nama database yang akan digunakan
  password: data.password, // Kata sandi untuk pengguna database
  port: data.port,        // Port yang digunakan untuk koneksi ke server PostgreSQL (default: 5432)
  secret: data.secret     // Kunci atau informasi sensitif lainnya (biasanya untuk enkripsi atau autentikasi)
});

// Mengekspor objek pool agar bisa digunakan di bagian lain dari aplikasi untuk mengakses database
module.exports = pool;
