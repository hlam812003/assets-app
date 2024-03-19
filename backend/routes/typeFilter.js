const express = require('express');
const router = express.Router();
const db = require('../services/db');
const typeFilter = require('../services/asset')

router.get('/', async (req, res) => {
    try {
        const filters = await typeFilter.filterAssetsByType();
        res.json(filters);
    } catch {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
