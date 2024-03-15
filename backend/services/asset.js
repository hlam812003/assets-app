const db = require('./db');
const mysql = require('mysql2/promise');
const helper = require('../helper');
const config = require('../config');

async function getAssets() {
    try {
        
        const [rows] = await db.query('SELECT * FROM asset');
        return rows;
    } catch (error) {
        console.error('Error fetching assets:', error);
        throw error;
    }
}

module.exports = {
    getAssets
};