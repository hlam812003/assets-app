const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT user_id, first_name FROM user LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}
async function loginUser(username, password) {
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
module.exports = {
    getMultiple
}