const express = require("express");
const DashboardService = require("../services/dashboard");

const router = express.Router();

router.get("/general/", DashboardService.getGeneralStatistics);
router.get("/department/", DashboardService.getDepartmentStatistics);
router.get("/pie_chart/", DashboardService.getPieChart);

module.exports = router;
