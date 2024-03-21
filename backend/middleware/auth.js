const createHttpError = require("http-errors");
const ROLE = require("../utils/role")

const requiresAuth = (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		throw createHttpError(401, "User not authenticated!");
	}
};

const adminAuth = (req, res, next) => {
	if (req.session.role == ROLE.Admin) {
		next();
	} else {
		throw createHttpError(401, "You are not an administrator!");
	}
};

module.exports = { requiresAuth, adminAuth };
