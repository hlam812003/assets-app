const express = require("express");
const AssetService = require("../services/asset");
const router = express.Router();

router.get("/:departmentID", AssetService.getAssetsByDepartmentId);
router.get("/",AssetService.getDepartmentlist);
module.exports = router;
