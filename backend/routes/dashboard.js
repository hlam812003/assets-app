const express = require("express");
const DashboardService = require("../services/dashboard");

const router = express.Router();

router.get("/", DashboardService.getStatistics);

module.exports = router;
