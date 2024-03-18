// const express = require('express');
// const router = express.Router();
// const user = require('../services/user');
// const db = require('../services/db');

// router.post('/', async function (req, res, next) {
//     try {
//         const searchResult = await user.searchAsset(req.body.search_query);
//         res.json(searchResult);
//     } catch (err) {
//         console.error('Error while searching asset: ', err.message);
//         next(err);
//     }
// });

// module.exports = router;