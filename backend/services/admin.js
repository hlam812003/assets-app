const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const assertIsDefined = require("../utils/assertIsDefined");
const isNumber = require("../utils/isNumber");
const ROLE = require("../utils/role");
const bcrypt = require("bcrypt");

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
			whereConditions.push(`authentication.username LIKE '%${search}%'`);
		}

		if (isNumber(department)) {
			whereConditions.push(`department_id = ${department}`);
		}

		const WHERE_CLAUSE = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")} ` : "";
		const joinClause = `LEFT JOIN authentication ON users.user_id = authentication.user_id`;

		const [countResult] = await pool.query(`SELECT COUNT(*) AS count FROM users ${joinClause} ${WHERE_CLAUSE}`);
		const TOTAL = countResult[0].count;
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
			// `SELECT users.*, authentication.username 
            // FROM users 
            // LEFT JOIN authentication ON users.user_id = authentication.user_id\n` +
			// 	WHERE_CLAUSE +
			// 	limitClause
			`SELECT users.*, authentication.username 
			FROM users 
			${joinClause} 
			${WHERE_CLAUSE} 
			${limitClause}`
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
            WHERE users.user_id = ?`,
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

		if (!firstName || !lastName || !departmentId || !role || !username || !password) {
			throw createHttpError(400, "Missing fields!");
		}

		const [existingAuthentication] = await pool.query(
			`SELECT * FROM authentication WHERE username = ?`,
			[username]
		);

		if (!isEmpty(existingAuthentication)) {
			throw createHttpError(
				409,
				"Username already existed! Please choose a different one or sign in instead."
			);
		}

		const [newUser] = await pool.query(
			`INSERT INTO users (first_name, last_name, department_id, role) 
			VALUES (?, ?, ?, ?)`,
			[firstName, lastName, departmentId, role]
		);

		// const passwordHashed = await bcrypt.hash(password, 10);
		const newUserId = newUser.insertId;

		const [newAuthentication] = await pool.query(
			`INSERT INTO authentication (user_id, username, password)
			VALUES (?, ?, ?)`,
			[newUserId, username, password]
		);

		const [result] = await pool.query(
			`SELECT users.*, authentication.username
			FROM users
			LEFT JOIN authentication ON users.user_id = authentication.user_id
			WHERE users.user_id = ?`,
			[newUserId]
		);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	const userId = req.params.userId;

	const { firstName, lastName, departmentId, role, username, password } = req.body;

	try {
		assertIsDefined(authenticatedUserId);

		const [user] = await pool.query(
			`SELECT users.*, authentication.username
			FROM users
			LEFT JOIN authentication ON users.user_id = authentication.user_id
			WHERE users.user_id = ?`,
			[userId]
		);

		if (isEmpty(user)) {
			throw createHttpError(404, "User not found!");
		}

		const [result] = await pool.query(
			`UPDATE users 
			SET 
			first_name = '${firstName ? firstName : user[0].first_name}', 
			last_name = '${lastName ? lastName : user[0].last_name}', 
			department_id = '${departmentId ? departmentId : user[0].department_id}',
			role = '${role && userId != authenticatedUserId ? role : user[0].role}'
			WHERE user_id = ${userId}`
		);

		const [updatedUser] = await pool.query(
			`SELECT users.*, authentication.username
			FROM users
			LEFT JOIN authentication ON users.user_id = authentication.user_id
			WHERE users.user_id = ?`,
			[userId]
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;

	const userId = req.params.userId;

	try {
		assertIsDefined(authenticatedUserId);

		const [user] = await pool.query(
			`SELECT users.*, authentication.username
			FROM users
			LEFT JOIN authentication ON users.user_id = authentication.user_id
			WHERE users.user_id = ?`,
			[userId]
		);

		if (isEmpty(user)) {
			throw createHttpError(404, "User not found!");
		}

		const [deleteAuthentication] = await pool.query(
			`DELETE FROM authentication WHERE user_id = ${userId}`
		);
		const [deleteUser] = await pool.query(`DELETE FROM users WHERE user_id = ${userId}`);

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
