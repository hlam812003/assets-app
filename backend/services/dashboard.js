const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const isNumber = require("../utils/isNumber");
const assertIsDefined = require("../utils/assertIsDefined");

const getStatistics = async (req, res, next) => {
    try {
        // Query to get count of assets in use
        const inUseQuery = "SELECT COUNT(*) AS in_use FROM asset WHERE status = 'in use'";
        const [inUseResult] = await pool.query(inUseQuery);

        // Query to get count of assets under maintenance
        const maintenanceQuery = "SELECT COUNT(*) AS under_maintenance FROM asset WHERE status = 'under maintenance'";
        const [maintenanceResult] = await pool.query(maintenanceQuery);

        // Query to get count of assets in stock
        const inStockQuery = "SELECT COUNT(*) AS in_stock FROM asset WHERE status = 'in stock'";
        const [inStockResult] = await pool.query(inStockQuery);

        // Prepare the response object
        const statistics = {
            in_use: inUseResult[0].in_use,
            under_maintenance: maintenanceResult[0].under_maintenance,
            in_stock: inStockResult[0].in_stock
        };
        // console.log("aaa");
        // console.log(inUseResult);
        res.json(statistics);
    } catch (error) {
        console.error("Error while fetching statistics:", error);
        next(createHttpError(500, "Internal Server Error"));
    }
};
module.exports = { getStatistics };
