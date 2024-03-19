const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function addUser(userData) {
    try {
        // Execute SQL query to add a new user
        const query = `INSERT INTO user (user_id,first_name, last_name, department_id, role) VALUES (?,?, ?, ?, ?)`;
        const result = await db.query(query, [userData.user_id,userData.first_name, userData.last_name, userData.department_id, userData.role]);

        return result.insertId; // Return the ID of the newly added user
    } catch (error) {
        console.error('Error occurred while adding user:', error);
        throw error;
    }
}

async function updateUser(userId, userData) {
    try {
        // Execute SQL query to update an existing user
        const query = `UPDATE user SET first_name=?, last_name=?, department_id=?, role=? WHERE user_id=?`;
        const result = await db.query(query, [userData.first_name, userData.last_name, userData.department_id, userData.role, userId]);

        return result.affectedRows > 0; // Return true if the user was successfully updated
    } catch (error) {
        console.error('Error occurred while updating user:', error);
        throw error;
    }
}

module.exports = {
    addUser,
    updateUser
};
