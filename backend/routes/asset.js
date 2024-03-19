const express = require("express");
const AssetService = require("../services/asset");

const router = express.Router();

router.get("/", AssetService.getAssets); // search_query

router.get("/:assetId", AssetService.getAsset);

router.post("/", AssetService.createAsset);

router.patch("/:assetId", AssetService.updateAsset);

router.delete("/:assetId", AssetService.deleteAsset);

//router.get("/deapartment/:departmentID", AssetService.getAssetsByDepartmentId);

module.exports = router;
