const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const authRoutes = require('./routes/authRuote');
const userRoutes = require('./routes/userRoute');
const tourRoutes = require('./routes/tourRoute');
const adminRoutes = require('./routes/adminRoute');
const authAdminRoutes = require('./routes/authAdminRoute');
// const transactionsRoutes = require('./features/transactions/transactionsRoute');
// const categoryRoutes = require('./features/category/categoryRoute');

// CORS options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  };
  app.use(cors(corsOptions));
  
  // Middleware untuk parsing body request
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/authAdmin', authAdminRoutes)
// app.use('/api/transactions', transactionsRoutes);
// app.use('/api/category', categoryRoutes);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});   