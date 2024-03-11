const app = require('./server');
const mysql = require('mysql2/promise'); 

const PORT = process.env.PORT || 8080;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});