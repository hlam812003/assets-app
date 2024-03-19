import axios from "axios";

interface LoginData {
    username?: string;
    password?: string;
};

const login = async (data: LoginData): Promise<any> => {
    try {
        const res = await axios.post('http://localhost:3001/user/signin', data, {
            withCredentials: true
        });
        return res.data[0];
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err.response?.data || { status: 'ERROR', message: 'Network or server error!' };
        } else {
            console.error(err);
            return { status: 'ERROR', message: 'An unexpected error occurred!' };
        }
    }
};

export default {
    login
};