import axios from "axios";

axios.defaults.withCredentials = true;

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const pageIndex = query.page || "1";
		const itemLimit = query.limit || "5";
		const searchQuery = query.search || "";
        
		const res = await axios.get(`/api/asset`, {
			params: {
				page: pageIndex,
				limit: itemLimit,
				search: searchQuery,
			},
		});
		
		const { assets, total } = res.data;

		return {
			assets,
			totalAssets: total,
		};
	} catch (err) {
		console.error(err);
		return { error: "Failed to fetch assets" };
	}
});
