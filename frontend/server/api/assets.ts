import axios from "axios";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const pageIndex = query.page || '1';

        const res = await axios.get(`http://localhost:3001/asset?page=${pageIndex}`);
        const { assets, total } = res.data;

        return {
            assets,
            totalAssets: total
        };
    } catch (err) {
        console.error(err);
        return { error: 'Failed to fetch assets' };
    }
});