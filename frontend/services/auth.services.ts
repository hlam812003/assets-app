import axios from "axios";
import { type LoginData } from "types/User";

axios.defaults.withCredentials = true;

const login = async (data: LoginData) => {
	try {
		const res = await axios
			.post("/api/user/signin", data);
		return res.data[0];
	} catch (err) {
		console.error("Login Error:", err);
		if (axios.isAxiosError(err) && err.response) {
			console.error("Error Response:", err.response.data);
			throw err;
		} else {
			console.error("Unexpected Error:", err);
			throw new Error("An unexpected error occurred during login.");
		}
	}
};

export default {
	login,
};
