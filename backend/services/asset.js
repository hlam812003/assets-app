const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const isNumber = require("../utils/isNumber");
const assertIsDefined = require("../utils/assertIsDefined");
const ROLE = require("../utils/role");

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
	const limit = req.query.limit;
	const search = req.query.search;
	const type = req.query.type;
	const department = req.query.department;
	const status = req.query.status;

	try {
		assertIsDefined(authenticatedUserId);
		let whereConditions = [];

		if (search) {
			whereConditions.push(`asset_name LIKE '%${search}%'`);
		}

		if (authenticatedUserRole == ROLE.Admin) {
			if (isNumber(department)) {
				whereConditions.push(`asset.department_id = ${department}`);
			}
		} else {
			whereConditions.push(`asset.department_id = ${authenticatedUserDepartmentId}`);
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
		let start = 1;
		let end = TOTAL;

		let limitClause = "";

		if (page && limit) {
			if (!isNumber(page)) {
				throw createHttpError(400, "Invalid page!");
			}
			if (!isNumber(limit) || limit < 1) {
				throw createHttpError(400, "Invalid limit!");
			}

			const ITEMS_PER_PAGE = parseInt(limit);
			const NUMBER_OF_PAGES = Math.ceil(TOTAL / ITEMS_PER_PAGE);
			const OFFSET = (page - 1) * ITEMS_PER_PAGE;

			if (page < 1 || page > NUMBER_OF_PAGES) {
				throw createHttpError(400, "Page is out of range!");
			}

			limitClause = `LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}\n`;

			start = OFFSET + 1;
			end = page == NUMBER_OF_PAGES ? TOTAL : ITEMS_PER_PAGE * page;
		}

		const [assets] = await pool.query(
			`SELECT asset.*, department.department_name 
			FROM asset 
			LEFT JOIN department ON asset.department_id = department.department_id\n` +
				WHERE_CLAUSE +
				limitClause
		);

		res.status(200).json({
			assets: assets,
			total: TOTAL,
			start: start,
			end: end,
		});
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

		const [asset] = await pool.query(
			`SELECT asset.*, department.department_name 
			FROM asset 
			LEFT JOIN department ON asset.department_id = department.department_id
			WHERE asset_id = ?`,
			[assetId]
		);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		if (
			authenticatedUserRole != ROLE.Admin &&
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

	let {
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
			authenticatedUserRole != ROLE.Admin &&
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
	let {
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

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [assetId]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		if (authenticatedUserRole != ROLE.Admin) {
			if (authenticatedUserDepartmentId != asset[0].department_id) {
				throw createHttpError(401, "You are not allowed to access this asset!");
			} else {
				departmentId = authenticatedUserDepartmentId;
			}
		}

		const [result] = await pool.query(
			`UPDATE asset 

			SET 
			asset_name = '${assetName ? assetName : asset[0].asset_name}', 
			asset_type = '${assetType ? assetType : asset[0].asset_type}', 
			asset_img = '${assetImage ? assetImage : asset[0].asset_img}', 
			description = '${description ? description : asset[0].description}', 
			purchased_date = '${purchasedDate ? purchasedDate : asset[0].purchased_date}', 
			price = ${price ? price : asset[0].price}, 
			department_id = ${departmentId ? departmentId : asset[0].department_id}, 
			status = '${status ? status : asset[0].status}'
			
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

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [assetId]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		if (
			authenticatedUserRole != ROLE.Admin &&
			authenticatedUserDepartmentId != asset[0].department_id
		) {
			throw createHttpError(401, "You are not allowed to access this asset!");
		}

		const [deleteMaintenance] = await pool.query(`DELETE FROM maintenance WHERE asset_id = ?`, [assetId]);
		const [deleteAudit] = await pool.query(`DELETE FROM audit WHERE asset_id = ?`, [assetId]);
		const [deleteAsset] = await pool.query(`DELETE FROM asset WHERE asset_id = ?`, [assetId]);

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

// const getAssetsByDepartmentId = async (req, res, next) => {
// 	const departmentID = req.params.departmentID;
// 	try {
// 		const [assets] = await pool.query("SELECT * FROM asset WHERE department_id = ?", [
// 			departmentID,
// 		]);
// 		if (!assets.length) {
// 			throw createHttpError(404, "No assets found for the given department!");
// 		}
// 		res.status(200).json(assets);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const getAssetsByType = async (req, res, next) => {
// 	const type = req.params.type;
// 	try {
// 		const [assets] = await pool.query("SELECT * FROM asset WHERE asset_type = ?", [type]);
// 		if (!assets.length) {
// 			throw createHttpError(404, "No assets found for the given department!");
// 		}
// 		res.status(200).json(assets);
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const getAssetsByStatus = async (req, res, next) => {
// 	const assetStatus = req.params.assetStatus;
// 	try {
// 		const [assets] = await pool.query("SELECT * FROM asset WHERE status = ?", [assetStatus]);
// 		if (!assets.length) {
// 			throw createHttpError(404, "No assets found for the given department!");
// 		}
// 		res.status(200).json(assets);
// 	} catch (error) {
// 		next(error);
// 	}
// };




module.exports = {
	getAssets,
	getAsset,
	createAsset,
	updateAsset,
	deleteAsset,
};
