const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");

const getAssets = async (req, res, next) => {
	const searchQuery = req.query.search_query;

	try {
		let [assets] = [];
		if (searchQuery) {
			[assets] = await pool.query(
				`SELECT * FROM asset WHERE asset_name LIKE '%${searchQuery}%'`
			);
		} else {
			[assets] = await pool.query("SELECT * FROM asset");
		}

		res.status(200).json(assets);
	} catch (error) {
		next(error);
	}
};

const getAsset = async (req, res, next) => {
	const assetId = req.params.assetId;

	try {
		if (typeof parseInt(assetId) != "number") {
			throw createHttpError(400, "Invalid asset ID!");
		}

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [
			assetId,
		]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		res.status(200).json(asset);
	} catch (error) {
		next(error);
	}
};

const createAsset = async (req, res, next) => {
	const {
		name,
		type,
		status,
		price,
		description,
		image,
		department,
		purchasedDate,
	} = req.body || null;

	try {
		if (!name) {
			throw createHttpError(400, "Asset must have a name!");
		}

		const [result] = await pool.query(
			`INSERT INTO asset (asset_name, asset_type, condition_state, price, description, asset_img, department_id, purchased_date)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[name, type, status, price, description, image, department, purchasedDate]
		);

		const newAssetId = result.insertId;
		const [newAsset] = await pool.query(
			`SELECT * FROM asset WHERE asset_id = ?`,
			[newAssetId]
		);

		res.status(201).json(newAsset);
	} catch (error) {
		next(error);
	}
};

const updateAsset = async (req, res, next) => {
	const assetId = req.params.assetId;
	const {
		name,
		type,
		status,
		price,
		description,
		image,
		department,
		purchasedDate,
	} = req.body;

	try {
		if (typeof parseInt(assetId) != "number") {
			throw createHttpError(400, "Invalid asset ID!");
		}

		if (!name) {
			throw createHttpError(400, "Asset must have a name!");
		}

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [
			assetId,
		]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		const [result] = await pool.query(
			`UPDATE asset 
			SET 
			asset_name = ?,  
			asset_type = ?, 
			condition_state = ?, 
			price = ?, 
			description = ?, 
			asset_img = ?, 
			department_id = ?, 
			purchased_date = ?
			WHERE asset_id = ?`,
			[
				name,
				type,
				status,
				price,
				description,
				image,
				department,
				purchasedDate,
				assetId,
			]
		);

		const [updatedAsset] = await pool.query(
			`SELECT * FROM asset WHERE asset_id = ?`,
			[assetId]
		);

		res.status(200).json(updatedAsset);
	} catch (error) {
		next(error);
	}
};

const deleteAsset = async (req, res, next) => {
	const assetId = req.params.assetId;

	try {
		if (typeof parseInt(assetId) != "number") {
			throw createHttpError(400, "Invalid asset ID!");
		}

		const [asset] = await pool.query(`SELECT * FROM asset WHERE asset_id = ?`, [
			assetId,
		]);

		if (isEmpty(asset)) {
			throw createHttpError(404, "Asset not found!");
		}

		const [result] = await pool.query(`DELETE FROM asset WHERE asset_id = ?`, [
			assetId,
		]);

		res.status(204).json(asset);
	} catch (error) {
		next(error);
	}
};

async function getByDepartment(departmentID) {
    try {
        const query = 'SELECT * FROM asset WHERE department_id = ?';
        const [rows] = await db.query(query, [departmentID]);
        return rows;
    } catch (error) {
        console.error('Error fetching assets by department:', error);
        throw error;
    }
}
async function filterAssetsByType(type) {
    try {
        const type ="Chair";
        const query = 'SELECT *FROM asset WHERE department_id='+mysql.escape(type);
        const [rows] = await db.query(query,[type]);
        return rows;
    } catch (error) {
      console.error('Error filtering assets by type:', error);
      throw error;
    }
  }

module.exports = {
	getAssets,
	getAsset,
	createAsset,
	updateAsset,
	deleteAsset,
	getByDepartment,
    filterAssetsByType
};
