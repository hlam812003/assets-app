const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const isNumber = require("../utils/isNumber");
const assertIsDefined = require("../utils/assertIsDefined");
const ROLE = require("../utils/role");

// get list of department
const getDepartmentList = async (req, res, next) => {
	try {
		const [departments] =
			await pool.query(`SELECT d.department_id, d.department_name, COUNT(*) as asset_count
		FROM asset a
		JOIN department d ON a.department_id = d.department_id
		GROUP BY d.department_id`);

		if (isEmpty(departments)) {
			throw createHttpError(404, "No departments found for the given assets!");
		}
		res.status(200).json(departments);
	} catch (error) {
		next(error);
	}
};

const getTypeList = async (req, res, next) => {};

const getStatusList = async (req, res, next) => {};

module.exports = {
	getDepartmentList,
	getTypeList,
	getStatusList,
};
