const express = require("express");
const router = express.Router();
const user = require("../services/user");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
	try {
		res.json(await user.getMultiple(req.query.page));
	} catch (err) {
		console.error(`Error while getting programming languages `, err.message);
		next(err);
	}
});

module.exports = router;

// import express from "express";
// const UserService = require("../services/user");

// const router = express.Router();

// router.get("/", UsersController.getAuthenticatedUser);

// router.post("/signup", UsersController.signUp);

// router.post("/signin", UsersController.signIn);

// router.post("/signout", UsersController.signOut);

// export default router;
