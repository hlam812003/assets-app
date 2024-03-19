const createHttpError = require("http-errors");
const pool = require("./db");
const isEmpty = require("../utils/isEmpty");
const { num } = require("envalid");
// const assertIsDefined = require("../utils/assertIsDefined");

const getAssets = async (req, res, next) => {
	// const authenticatedUserId = req.session.userId;
	const searchQuery = req.query.search_query;
	const page = req.query.page;

	try {
		// assertIsDefined(authenticatedUserId);

		if (page) {
			if (typeof parseInt(page) != "number" || parseInt(page) < 1) {
				throw createHttpError(400, "Invalid page!");
			}

			const ITEMS_PER_PAGE = 5;
			const OFFSET = (page - 1) * ITEMS_PER_PAGE;

			let [assets] = [];
			let [total] = [];

			if (searchQuery) {
				[total] = await pool.query(
					`SELECT COUNT(asset_id) FROM asset WHERE asset_name LIKE '%${searchQuery}%'`
				);
				const numberOfPages = Math.ceil(
					total[0]["COUNT(asset_id)"] / ITEMS_PER_PAGE
				);

				if (parseInt(page) > numberOfPages) {
					throw createHttpError(400, "Invalid page!");
				} else {
					[assets] = await pool.query(
						`SELECT * FROM asset WHERE asset_name LIKE '%${searchQuery}%' LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`
					);
				}
			} else {
				[total] = await pool.query(`SELECT COUNT(asset_id) FROM asset`);
				const numberOfPages = Math.ceil(
					total[0]["COUNT(asset_id)"] / ITEMS_PER_PAGE
				);

				if (parseInt(page) > numberOfPages) {
					throw createHttpError(400, "Invalid page!");
				} else {
					[assets] = await pool.query(
						`SELECT * FROM asset LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`
					);
				}
			}

			const START = OFFSET + 1;
			const END = OFFSET + Object.keys(assets).length;

			res.status(200).json({
				assets: assets,
				start: START,
				end: END,
				total: total[0]["COUNT(asset_id)"],
			});
		} else {
			const [assets] = await pool.query(`SELECT * FROM asset`);
			res.status(200).json({
				assets: assets,
			});
		}
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

module.exports = {
	getAssets,
	getAsset,
	createAsset,
	updateAsset,
	deleteAsset,
};
