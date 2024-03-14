// index.js

const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});