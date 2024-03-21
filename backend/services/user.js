const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");

const getAuthenticatedUser = async (req, res, next) => {
	try {
		const [user] = await pool.query(
			`SELECT users.user_id, first_name, last_name, department_id, role, username 
			FROM users
			INNER JOIN authentication 
			ON users.user_id = authentication.user_id
			WHERE users.user_id = ${req.session.userId}`
		);

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

// const getUser = async (req, res, next) => {
// 	const userId = req.params.userId;

// 	try {
// 		const [user] = await pool.query(
// 			`SELECT users.user_id, first_name, last_name, department_id, role, username
// 			FROM users
// 			INNER JOIN authentication
// 			ON users.user_id = authentication.user_id
// 			WHERE users.user_id = ${userId}`
// 		);

// 		res.status(200).json(user);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const signUp = async (req, res, next) => {
// 	const { firstName, lastName, department, username, password } =
// 		req.body || null;

// 	try {
// 		if (!username || !password || !department) {
// 			throw createHttpError(400, "Missing fields!");
// 		}

// 		const [existingUsername] = await pool.query(
// 			`SELECT * FROM authentication WHERE username = '${username}'`
// 		);

// 		if (!isEmpty(existingUsername)) {
// 			throw createHttpError(
// 				409,
// 				"Username already existed! Please choose a different one or sign in instead."
// 			);
// 		}

// 		const [result] = await pool.query(
// 			`INSERT INTO user (first_name, last_name, department_id, role)
//             VALUES (?, ?, ?, 'Teacher');
//             `,
// 			[firstName, lastName, department]
// 		);
// 		const newUserId = result.insertId;
// 		const [newUser] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
// 			newUserId,
// 		]);

// 		// TODO: Need to hash password
// 		// const passwordHashed = await bcrypt.hash(password, 10);
// 		const passwordHashed = password;

// 		const [authentication] = await pool.query(
// 			`INSERT INTO authentication (user_id, username, password)
//             VALUES (?, ?, ?)`,
// 			[newUserId, username, passwordHashed]
// 		);

// 		res.status(201).json(newUser);
// 	} catch (error) {
// 		next(error);
// 	}
// };

const signIn = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		if (!username || !password) {
			throw createHttpError(400, "Missing fields!");
		}

		const [authentication] = await pool.query(
			`SELECT * FROM authentication WHERE username = ?`,
			[username]
		);

		if (isEmpty(authentication)) {
			throw createHttpError(401, "Incorrect username or password!");
		}

		// const passwordMatch = await bcrypt.compare(
		// 	password,
		// 	authentication[0].password
		// );

		const passwordMatch = password == authentication[0].password;

		if (!passwordMatch) {
			throw createHttpError(401, "Incorrect username or password!");
		}

		const [user] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
			authentication[0].user_id,
		]);

		req.session.userId = user[0].user_id;
		req.session.role = user[0].role;
		req.session.departmentId = user[0].department_id;

		console.log('Session after signIn', req.session);

		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

const signOut = async (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json({ message: "User signed out successfully!" });
		}
	});
};

module.exports = {
	getAuthenticatedUser,
	// getUser,
	// signUp,
	signIn,
	signOut,
};
