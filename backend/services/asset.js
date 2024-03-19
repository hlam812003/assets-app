const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const assertIsDefined = require("../utils/assertIsDefined");

const ROLE = {
	ADMIN: "Admin",
	MANAGER: "Manager",
};

/**
 * GET query parameters:
 * @param page Page number to retrieve. (Optional)
 * @param search Search keyword. (Optional)
 * @param type Type of assets. (Optional)
 * @param department Department ID of assets. (Optional)
 * @param status Status of assets. (Optional)
 *
 */
const getAssets = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;
	const authenticatedUserRole = req.session.role;
	const authenticatedUserDepartmentId = req.session.departmentId;

	const page = req.query.page;
	const search = req.query.search;
	const type = req.query.type;
	const department = req.query.department;
	const status = req.query.status;

	try {
		assertIsDefined(authenticatedUserId);

		if (page) {
			if (typeof parseInt(page) != "number" || parseInt(page) < 1) {
				throw createHttpError(400, "Invalid page!");
			}

			const ITEMS_PER_PAGE = 5;
			const OFFSET = (page - 1) * ITEMS_PER_PAGE;

			let whereConditions = [];

			if (search) {
				whereConditions.push(`asset_name LIKE '%${search}%'`);
			}

			if (authenticatedUserRole == ROLE.ADMIN) {
				if (department) {
					whereConditions.push(`department_id = ${department}`);
				}
			} else {
				whereConditions.push(`department_id = ${authenticatedUserDepartmentId}`);
			}

			if (type) {
				whereConditions.push(`asset_type = '${type}'`);
			}

			if (status) {
				whereConditions.push(`status = '${status}'`);
			}

			const WHERE_CLAUSE =
				whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}\n` : "";

			const [count] = await pool.query(`SELECT COUNT(asset_id) FROM asset\n` + WHERE_CLAUSE);

			const TOTAL = count[0]["COUNT(asset_id)"];
			const NUMBER_OF_PAGES = Math.ceil(TOTAL / ITEMS_PER_PAGE);

			if (parseInt(page) > NUMBER_OF_PAGES) {
				throw createHttpError(400, "Invalid page!");
			}

			const [assets] = await pool.query(
				`SELECT * FROM asset\n` + WHERE_CLAUSE + `LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`
			);

			const START = OFFSET + 1;
			const END = OFFSET + Object.keys(assets).length;

			res.status(200).json({
				assets: assets,
				start: START,
				end: END,
				total: TOTAL,
			});
		} else {
			const [assets] = await pool.query(`SELECT * FROM asset\n`);
			res.status(200).json({
				assets: assets,
			});
		}
	} catch (error) {
		next(error);
	}
};

const getAsset = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;
	const authenticatedUserRole = req.session.role;
	const authenticatedUserDepartmentId = req.session.departmentId;

	const assetId = req.params.assetId;

	try {
		assertIsDefined(authenticatedUserId);

		if (typeof parseInt(assetId) != "number") {
			throw createHttpError(400, "Invalid asset ID!");
		}

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [assetId]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		if (
			authenticatedUserRole != ROLE.ADMIN &&
			authenticatedUserDepartmentId != asset[0].department_id
		) {
			throw createHttpError(401, "You are not allowed to access this asset!");
		}

		res.status(200).json(asset);
	} catch (error) {
		next(error);
	}
};

const createAsset = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;
	const authenticatedUserRole = req.session.role;
	const authenticatedUserDepartmentId = req.session.departmentId;

	const {
		assetName,
		assetType,
		assetImage,
		description,
		purchasedDate,
		price,
		departmentId,
		status,
	} = req.body || null;

	try {
		assertIsDefined(authenticatedUserId);

		if (!assetName) {
			throw createHttpError(400, "Asset must have a name!");
		}

		if (
			authenticatedUserRole != ROLE.ADMIN &&
			authenticatedUserDepartmentId != asset[0].department_id
		) {
			departmentId = authenticatedUserDepartmentId;
		}

		const [result] = await pool.query(
			`INSERT INTO asset (asset_name, asset_type, asset_img, description, purchased_date, price, department_id, status) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[assetName, assetType, assetImage, description, purchasedDate, price, departmentId, status]
		);

		const newAssetId = result.insertId;
		const [newAsset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [newAssetId]);

		res.status(201).json(newAsset);
	} catch (error) {
		next(error);
	}
};

const updateAsset = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;
	const authenticatedUserRole = req.session.role;
	const authenticatedUserDepartmentId = req.session.departmentId;

	const assetId = req.params.assetId;
	const {
		assetName,
		assetType,
		assetImage,
		description,
		purchasedDate,
		price,
		departmentId,
		status,
	} = req.body;

	try {
		assertIsDefined(authenticatedUserId);

		if (typeof parseInt(assetId) != "number") {
			throw createHttpError(400, "Invalid asset ID!");
		}

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [assetId]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		if (authenticatedUserRole != ROLE.ADMIN) {
			if (authenticatedUserDepartmentId != asset[0].department_id) {
				throw createHttpError(401, "You are not allowed to access this asset!");
			} else {
				departmentId = authenticatedUserDepartmentId;
			}
		}

		const [result] = await pool.query(
			`UPDATE asset 

			SET 
			asset_name = ${assetName ? assetName : asset[0].asset_name}, 
			asset_type = ${assetType ? assetType : asset[0].asset_type}, 
			asset_img = ${assetImage ? assetImage : asset[0].asset_img}, 
			description = ${description ? description : asset[0].description}, 
			purchased_date = ${purchasedDate ? purchasedDate : asset[0].purchased_date},
			price = ${price ? price : asset[0].price}, 
			department_id = ${departmentId ? departmentId : asset[0].department_id}, 
			status = ${status ? status : asset[0].status}
			
			WHERE asset_id = ${assetId}`
		);

		const [updatedAsset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [assetId]);

		res.status(200).json(updatedAsset);
	} catch (error) {
		next(error);
	}
};

const deleteAsset = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;
	const authenticatedUserRole = req.session.role;
	const authenticatedUserDepartmentId = req.session.departmentId;

	const assetId = req.params.assetId;

	try {
		assertIsDefined(authenticatedUserId);

		if (typeof parseInt(assetId) != "number") {
			throw createHttpError(400, "Invalid asset ID!");
		}

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [assetId]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		if (
			authenticatedUserRole != ROLE.ADMIN &&
			authenticatedUserDepartmentId != asset[0].department_id
		) {
			throw createHttpError(401, "You are not allowed to access this asset!");
		}

		const [result] = await pool.query(`DELETE FROM asset WHERE asset_id = ?`, [assetId]);

		res.status(204).json(asset);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAssets,
	getAsset,
	createAsset,
	updateAsset,
	deleteAsset,
};
