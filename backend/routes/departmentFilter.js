const express = require('express');
const router = express.Router();
const db = require('../services/db');
const assetFilter = require('../services/asset')

router.post('/', async (req, res) => {
    try {
        if (req.body.departmentID === undefined) {
            return res.status(400).json({ error: 'departmentID is required' });
            console.log(res.body.departmentID);
        }

        const departmentID = req.body.departmentID;
        const filter = await assetFilter.getByDepartment(departmentID);
        res.json(filter);
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
