const express = require("express");
const AssetService = require("../services/asset");
const router = express.Router();

router.get("/:assetStatus", AssetService.getAssetsByStatus);

module.exports = router;