const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const assertIsDefined = require("../utils/assertIsDefined");
const isNumber = require("../utils/isNumber");
const ROLE = require("../utils/role")


const getUsers = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	const page = req.query.page;
	const limit = req.query.limit;
	const search = req.query.search;
	const department = req.query.department;

	try {
		assertIsDefined(authenticatedUserId);
		let whereConditions = [];

		if (search) {
			whereConditions.push(`asset_name LIKE '%${search}%'`);
		}

		if (isNumber(department)) {
			whereConditions.push(`department_id = ${department}`);
		}

		const WHERE_CLAUSE =
			whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}\n` : "";

		const [count] = await pool.query(`SELECT COUNT(user_id) FROM users\n` + WHERE_CLAUSE);
		const TOTAL = count[0]["COUNT(user_id)"];
		let start = 1;
		let end = TOTAL;

		let limitClause = "";

		if (page && limit) {
			if (!isNumber(page)) {
				throw createHttpError(400, "Invalid page!");
			}
			if (!isNumber(limit) || limit < 1) {
				throw createHttpError(400, "Invalid limit!");
			}

			const ITEMS_PER_PAGE = parseInt(limit);
			const NUMBER_OF_PAGES = Math.ceil(TOTAL / ITEMS_PER_PAGE);
			const OFFSET = (page - 1) * ITEMS_PER_PAGE;

			if (page < 1 || page > NUMBER_OF_PAGES) {
				throw createHttpError(400, "Page is out of range!");
			}

			limitClause = `LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}\n`;

			start = OFFSET + 1;
			end = page == NUMBER_OF_PAGES ? TOTAL : ITEMS_PER_PAGE * page;
		}

		const [assets] = await pool.query(
			`SELECT users.*, authentication.username 
            FROM users 
            LEFT JOIN authentication ON users.user_id = authentication.user_id\n` +
				WHERE_CLAUSE +
				limitClause
		);

		res.status(200).json({
			assets: assets,
			total: TOTAL,
			start: start,
			end: end,
		});
	} catch (error) {
		next(error);
	}
};
const getUser = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	const userId = req.params.userId;

	try {
		assertIsDefined(authenticatedUserId);

		const [user] = await pool.query(
			`SELECT users.*, authentication.username 
            FROM users 
            LEFT JOIN authentication ON users.user_id = authentication.user_id  
            WHERE user_id = ?`,
			[userId]
		);

		if (isEmpty(user)) {
			throw createHttpError(404, "User not found!");
		}

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
const createUser = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	const { firstName, lastName, departmentId, role, username, password } = req.body;

	try {
		assertIsDefined(authenticatedUserId);

		if (!firstName || !lastName || !departmentId || role || !username || !password) {
			throw createHttpError(400, "Input is not ");
		}

		if (
			authenticatedUserRole != ROLE.Admin &&
			authenticatedUserDepartmentId != asset[0].department_id
		) {
			departmentId = authenticatedUserDepartmentId;
		}

		const [result] = await pool.query(
			`INSERT INTO asset (asset_name, asset_type, asset_img, description, purchased_date, price, department_id, status) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[firstName, lastName, role, username, password, price, departmentId, status]
		);

		const newAssetId = result.insertId;
		const [newAsset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [newAssetId]);

		res.status(201).json(newAsset);
	} catch (error) {
		next(error);
	}
};
const updateUser = async (req, res, next) => {};
const deleteUser = async (req, res, next) => {};

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
