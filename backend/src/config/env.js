const dotenv = require("dotenv");
process.env.NODE_ENV = (process.env.NODE_ENV || "development").toLowerCase();

const envFound = dotenv.config({ path: ".env" });
if (envFound.error) {
  throw new Error("File .env tidak ditemukan!");
}

module.exports = {
    user: process.env.DB_USER,
    port: process.env.PORT,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    secret: process.env.JWT_SECRET,
};