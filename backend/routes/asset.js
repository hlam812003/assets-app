const express = require("express");
const AssetService = require("../services/asset");

const router = express.Router();

router.get("/", AssetService.getAssets);

router.get("/:assetId", AssetService.getAsset);

router.post("/", AssetService.createAsset);

router.patch("/:assetId", AssetService.updateAsset);

router.delete("/:assetId", AssetService.deleteAsset);


module.exports = router;
