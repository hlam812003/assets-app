const express = require("express");
const requiresAuth = require("../middleware/auth");
const AdminService = require("../services/admin");

const router = express.Router();

router.get("/user/", AdminService.getUsers);

router.get("/user/:userId", AdminService.getUser);

router.post("/user/", AdminService.createUser);

router.patch("/user/:userId", AdminService.updateUser);

router.delete("/user/:userId", AdminService.deleteUser);

module.exports = router;
