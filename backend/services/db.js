// import mysql from 'mysql2'

const mysql = require("mysql2");
const config = require("../config");

// async function query(sql, params) {
// 	const connection = await mysql.createConnection(config.db);
// 	const [results] = await connection.execute(sql, params);

// 	return results;
// }

const pool = mysql.createPool(config.db).promise();

module.exports = pool;

// async function start() {
// 	const [rows] = await pool.query("SELECT * FROM asset");
// 	console.log(rows);
// }
