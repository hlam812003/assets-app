import axios from "axios";
import { type UserInfo } from "types/User";

axios.defaults.withCredentials = true;

const updateUser = async (userId: number, userData: UserInfo) => {
    try {
        const res = await axios
            .patch(`/api/admin/user/${userId}`, userData);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default {
    updateUser
};