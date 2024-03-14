const mysql = require('mysql2/promise');

class User {
    constructor(pool) {
        this.pool = pool;
    }

    async loginUser(username, password) {
        try {
            const [rows] = await this.pool.execute('SELECT * FROM authentication WHERE username = ? AND password = ?', [username, password]);
            if (rows.length === 1) {
                return rows[0]; // Return user data if found
            } else {
                return null; // Return null if user not found or password incorrect
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    }
}

module.exports = User;
