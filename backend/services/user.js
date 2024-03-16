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
        const [rows] = await db.query('SELECT * FROM authentication WHERE username = ? AND password = ?', [username, password]);
        
        // Close the connection
        //await connection.end();
        if (Object.keys(rows).length === 3) {
            console.log(rows)
            return rows; // Return user data if found

        } else {
            return null; // Return null if user not found or password incorrect
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

async function searchAsset(search_query) {
    try {
        var query = `SELECT * FROM asset WHERE asset_name LIKE '%${search_query}%' LIMIT 10`;
        const rows = await db.query(`SELECT * FROM asset WHERE asset_name LIKE '%${search_query}%' LIMIT 10`);

        console.log(rows)

        return rows;
    } catch (error) {
        console.error('Error occurred while searching asset:', error);
        throw error;
    }
}
module.exports = {
    getMultiple,loginUser,searchAsset
}