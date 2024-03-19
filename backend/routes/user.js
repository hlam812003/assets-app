const express = require("express");
const { requiresAuth } = require("../middleware/auth");
const UserService = require("../services/user");

const router = express.Router();

router.get("/", requiresAuth, UserService.getAuthenticatedUser);

// router.get("/:userId", UserService.getUser);

router.post("/signin", UserService.signIn);

router.post("/signout", UserService.signOut);

module.exports = router;
