const express = require('express');
const User = require('./User'); // Assuming User model is in the same directory
const router = express.Router();
const pool = require('./index'); // Import the pool object from index.js
// Create a new instance of the User model

const user = new User(pool);

router.get('/' ,async (req, res) => {
    return res.json({
        status: "SUCCESS",
        message: "User signed in successfully"})
})

// Sign-in route
router.post('/signin', async (req, res) => {
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();

    try {
        // Validate input fields
        if (username === "" || password === "") {
            return res.json({
                status: "FAILED",
                message: "Empty input fields",
            });
        }

        // Authenticate user
        const userData = await user.loginUser(username, password);
        if (userData) {
            return res.json({
                status: "SUCCESS",
                message: "User signed in successfully",
                userData
            });
        } else {
            return res.status(401).json({
                status: "FAILED",
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error('Error signing in user:', error);
        return res.status(500).json({
            status: "FAILED",
            error: "Internal Server Error"
        });
    }
});

module.exports = router;
