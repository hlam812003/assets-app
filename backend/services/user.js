const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const bcrypt = require("bcrypt");
const { unsubscribe, get } = require("../routes/user");

const getUser = async (req, res, next) => {
	const userId = req.params.userId;

	try {
		const [user] = await pool.query(
			`SELECT user.user_id, first_name, last_name, department_id, role, username 
			FROM user 
			INNER JOIN authentication 
			ON user.user_id = authentication.user_id
			WHERE user.user_id = ${userId}`
		);

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

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
// 		const [newUser] = await pool.query(`SELECT * FROM user WHERE user_id = ?`, [
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

		// req.session.userId = authentication.userId;

		const [user] = await pool.query(`SELECT * FROM user WHERE user_id = ?`, [
			authentication[0].user_id,
		]);

		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

const signOut = async (req, res, next) => {
	// req.session.destroy((error) => {
	// 	if (error) {
	// 		next(error);
	// 	} else {
	// 		res.status(200).json({ message: "User signed out successfully!" });
	// 	}
	// });

	// TODO: Need a better practices
	try {
		res.status(200).json({ message: "User signed out successfully!" });
	} catch (error) {
		next(error);
	}
};

// async function loginUser(username, password) {
// 	try {
// 		const [rows] = await db.query(
// 			"SELECT * FROM authentication WHERE username = ? AND password = ?",
// 			[username, password]
// 		);

// 		// Close the connection
// 		//await connection.end();
// 		if (Object.keys(rows).length === 3) {
// 			console.log(rows);
// 			return rows; // Return user data if found
// 		} else {
// 			return null; // Return null if user not found or password incorrect
// 		}
// 	} catch (error) {
// 		console.error("Error logging in user:", error);
// 		throw error;
// 	}
// }

module.exports = {
	getUser,
	// signUp,
	signIn,
	signOut,
};
