// Menentukan bahwa shorthands tidak digunakan dalam migrasi ini (untuk mendeklarasikan tipe kolom secara singkat)
exports.shorthands = undefined;

/**
 * Fungsi untuk menjalankan migrasi yang akan diterapkan saat migrasi 'up' dilakukan
 * @param pgm {import('node-pg-migrate').MigrationBuilder} - Objek MigrationBuilder yang digunakan untuk membuat dan memodifikasi database
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Membuat tabel 'users' dengan kolom-kolom yang sudah didefinisikan
  pgm.createTable("users", {
    // Kolom 'user_id' dengan tipe serial yang akan bertambah otomatis (auto-increment) dan menjadi primary key
    user_id: {
      type: "serial",
      primaryKey: true, // Menentukan 'user_id' sebagai primary key
    },
    // Kolom 'name' dengan tipe varchar yang memiliki panjang maksimum 50 karakter, harus diisi (notNull), dan unik
    name: {
      type: "varchar(50)",
      notNull: true,
      unique: true, // Memastikan tidak ada dua user yang memiliki nama yang sama
    },
    // Kolom 'email' dengan tipe varchar yang memiliki panjang maksimum 100 karakter, harus diisi (notNull), dan unik
    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true, // Memastikan tidak ada dua user yang memiliki email yang sama
    },
    // Kolom 'password' dengan tipe varchar yang panjang maksimum 100 karakter, harus diisi (notNull)
    password: {
      type: "varchar(100)",
      notNull: true,
    },
    // Kolom 'created_at' dengan tipe timestamp yang menunjukkan waktu pembuatan, harus diisi (notNull), default adalah waktu saat ini
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"), // Menggunakan fungsi untuk menetapkan waktu saat ini
    },
    // Kolom 'updated_at' dengan tipe timestamp yang menunjukkan waktu terakhir kali data diperbarui, harus diisi (notNull), default adalah waktu saat ini
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"), // Menggunakan fungsi untuk menetapkan waktu saat ini
    },
  });
};

/**
 * Fungsi untuk menjalankan migrasi yang membatalkan migrasi 'up' (drop tabel 'users')
 * @param pgm {import('node-pg-migrate').MigrationBuilder} - Objek MigrationBuilder yang digunakan untuk memodifikasi database
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Menghapus tabel 'users' jika migrasi dibatalkan
  pgm.dropTable("users");
};
