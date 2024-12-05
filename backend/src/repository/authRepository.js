// Mengimpor konfigurasi database dari file yang terletak di folder config
const db = require("../config/database");

// Mendefinisikan kelas AuthModel
class AuthModel {
    // Mendefinisikan metode statis untuk mendapatkan user berdasarkan email
    static async getUserByEmail(email){
        try{
            // Menyusun query SQL untuk mencari user berdasarkan email
            const query = "SELECT * FROM users WHERE email = $1";
            
            // Menjalankan query SQL dengan parameter email
            const result = await db.query(query, [email]);
            
            // Menampilkan hasil query di console untuk keperluan debugging
            console.log(result.rows[0]);
            
            // Mengembalikan hasil pertama dari query (baris pertama user yang ditemukan)
            return result.rows[0];
        }catch(error){
            // Menangkap dan menampilkan error jika terjadi kesalahan pada query
            console.log(error);
        }
    }   
}
// Mengekspor kelas AuthModel agar dapat digunakan di file lain
module.exports = AuthModel;
