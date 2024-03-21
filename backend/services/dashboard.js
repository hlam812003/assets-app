const pool = require("./db");

const getGeneralStatistics = async (req, res, next) => {
	try {
		const maintenanceQuery =
			"SELECT COUNT(*) AS under_maintenance FROM asset WHERE status = 'under maintenance'";
		const [maintenanceResult] = await pool.query(maintenanceQuery);

		const inStockQuery = "SELECT COUNT(*) AS in_stock FROM asset WHERE status = 'in stock'";
		const [inStockResult] = await pool.query(inStockQuery);

		const userCountQuery = "SELECT COUNT(*) AS user_count FROM users";
		const [userCountResult] = await pool.query(userCountQuery);

		const typeCountQuery = `
            SELECT COUNT(*) AS count
            FROM (SELECT DISTINCT asset_type FROM asset) AS asset_types
        `;
		const [distinctTypeResult] = await pool.query(typeCountQuery);

		const statistics = {
			type_of_asset: distinctTypeResult[0].count,
			available: inStockResult[0].in_stock,
			under_maintenance: maintenanceResult[0].under_maintenance,
			user_count: userCountResult[0].user_count,
		};

		res.status(200).json(statistics);
	} catch (error) {
		next(error);
	}
};

const getDepartmentStatistics = async (req, res, next) => {
	try {
		const [result] = await pool.query(
			`SELECT department.department_name, COUNT(DISTINCT asset_type), COUNT(asset_id) 
            FROM department 
            LEFT JOIN asset ON department.department_id=asset.department_id
            GROUP BY department.department_id`
		);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

module.exports = { getGeneralStatistics, getDepartmentStatistics };
