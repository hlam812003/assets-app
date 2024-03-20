const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const assertIsDefined = require("../utils/assertIsDefined");

const getUsers = async (req, res, next) => {};
const getUser = async (req, res, next) => {};
const createUser = async (req, res, next) => {};
const updateUser = async (req, res, next) => {};
const deleteUser = async (req, res, next) => {};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
