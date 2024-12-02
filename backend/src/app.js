// Menghapus body-parser karena express.json() sudah menangani parsing JSON
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const path = require("path");

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const tourRoutes = require('./routes/tourRoute');
const adminRoutes = require('./routes/adminRoute');
const authAdminRoutes = require('./routes/authAdminRoute');

// CORS options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Middleware untuk parsing body request
// Middleware untuk parse JSON body
app.use(express.json());

// Jika menerima data dengan urlencoded format
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/authAdmin', authAdminRoutes);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});
