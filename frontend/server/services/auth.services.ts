import axios from "axios";

interface LoginData {
    username?: string;
    password?: string;
};

const login = async (data: LoginData): Promise<any> => {
    try {
        const res = await axios.post('http://localhost:3001/user/signin', data);
        console.log(res);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export default {
    login
};