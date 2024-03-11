const express = require('express');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());

module.exports = app;
