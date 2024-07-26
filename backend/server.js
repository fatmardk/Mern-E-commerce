const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connect = require('./config/db');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const review = require("./models/Reviews")


dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);



connect().catch((error) => {
  console.error(`MongoDB bağlantı hatası: ${error.message}`.red);
  process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.magenta.italic);
});
