const express = require("express");
const AssetService = require("../services/asset");
const router = express.Router();

router.get("/:departmentID", AssetService.getAssetsByDepartmentId);

module.exports = router;
