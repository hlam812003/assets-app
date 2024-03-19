const express = require('express');
const router = express.Router();
const admin = require('../services/admin');


// Route to add a new user
router.post('/add', async (req, res, next) => {
    try {
        const userId = await admin.addUser(req.body);
        res.status(201).json({ success: true, userId: userId });
    } catch (error) {
        console.error('Error while adding user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to update an existing user
router.put('/update/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const success = await admin.updateUser(userId, req.body);
        if (success) {
            res.json({ success: true, message: 'User updated successfully' });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error while updating user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
