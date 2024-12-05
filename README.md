# Panduan Menjalankan Aplikasi

Aplikasi ini terdiri dari dua bagian: **Frontend** dan **Backend**. Untuk menjalankannya, Anda memerlukan dua terminal. Ikuti langkah-langkah berikut:

## Langkah-Langkah

1. **Buka dua terminal.**

2. **Navigasikan ke direktori masing-masing:**
   - Di **terminal pertama**, pindah ke direktori frontend:
     ```bash
     cd frontend
     ```
   - Di **terminal kedua**, pindah ke direktori backend:
     ```bash
     cd backend
     ```

3. **Instal dependensi:**
   - Di **terminal backend**, jalankan:
     ```bash
     npm install
     ```
   - Di **terminal frontend**, jalankan:
     ```bash
     npm install
     ```

4. **Migrasi database:**
   - Di **terminal backend**, jalankan perintah berikut untuk menjalankan migrasi database:
     ```bash
     npm run migrate
     ```

5. **Jalankan server backend:**
   - Tetap di **terminal backend**, jalankan perintah berikut untuk memulai server:
     ```bash
     npm start
     ```

6. **Jalankan frontend:**
   - Tetap di **terminal frontend**, jalankan perintah berikut untuk memulai pengembangan web:
     ```bash
     npm run dev
     ```

7. **masuk ke endpoint ini untuk menjalankan web**
    - http://localhost:5173/
    
  VITE v5.4.11  ready in 127 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

 

## Catatan
- Pastikan Anda memiliki Node.js dan npm yang telah diinstal di komputer Anda.
- Jika menggunakan database, pastikan konfigurasi database telah disesuaikan pada file `.env` atau konfigurasi terkait lainnya.

Sekarang, aplikasi Anda seharusnya berjalan dengan **Backend** aktif pada server dan **Frontend** dapat diakses melalui browser!
