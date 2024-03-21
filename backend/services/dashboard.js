const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const isNumber = require("../utils/isNumber");
const assertIsDefined = require("../utils/assertIsDefined");

const getStatistics = async (req, res, next) => {};

module.exports = { getStatistics };
