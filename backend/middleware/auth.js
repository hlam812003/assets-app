const createHttpError = require("http-errors");

const requiresAuth = (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		throw createHttpError(401, "User not authenticated!");
	}
};

module.exports = requiresAuth;
