const express = require('express');
const pool = require('./index'); // Import the pool object from index.js

const app = express();

require('dotenv').config();

// Middleware
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use(express.json());

module.exports = app;
