const express = require("express");
const AssetFilterService = require("../services/asset_filter");

const router = express.Router();

router.get("/department/", AssetFilterService.getDepartmentList);

router.get("/type/", AssetFilterService.getTypeList);

router.get("/status/", AssetFilterService.getStatusList);

module.exports = router;
