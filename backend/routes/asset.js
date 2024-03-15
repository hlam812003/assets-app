const express = require('express');
const router = express.Router();
const db = require('../services/db');
const assetService = require('../services/asset');


router.get('/', async (req, res) => {
    try {
        const assets = await assetService.getAssets();
        res.json(assets);
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
