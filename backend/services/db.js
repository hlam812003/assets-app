const mysql = require("mysql2");
const env = require("../utils/validateEnv");

const pool = mysql
	.createPool({
		host: env.MYSQL_HOST,
		user: env.MYSQL_USER,
		password: env.MYSQL_PASSWORD,
		database: env.MYSQL_DATABASE,
		dateStrings: true,
	})
	.promise();

module.exports = pool;