const express = require("express");
const AssetService = require("../services/asset");
const router = express.Router();

router.get("/:type", AssetService.getAssetsByType);

module.exports = router;