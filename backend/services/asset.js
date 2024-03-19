const db = require('./db');
const mysql = require('mysql2/promise');
const helper = require('../helper');
const config = require('../config');

async function getAssets() {
    try {
        const query = `SELECT * FROM asset`;
        const rows = await db.query(query);
        return rows;
        //const [rows] = await db.query('SELECT * FROM asset');
        //return rows;
    } catch (error) {
        console.error('Error fetching assets:', error);
        throw error;
    }
}
async function getByDepartment(departmentID) {
    try {
        const query = 'SELECT * FROM asset WHERE department_id = ?';
        const [rows] = await db.query(query, [departmentID]);
        return rows;
    } catch (error) {
        console.error('Error fetching assets by department:', error);
        throw error;
    }
}
async function filterAssetsByType(type) {
    try {
        const type ="Chair";
        const query = 'SELECT *FROM asset WHERE department_id='+mysql.escape(type);
        const [rows] = await db.query(query,[type]);
        return rows;
    } catch (error) {
      console.error('Error filtering assets by type:', error);
      throw error;
    }
  }

module.exports = {
    getAssets,
    getByDepartment,
    filterAssetsByType
    
};