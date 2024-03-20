import axios from "axios";

axios.defaults.withCredentials = true;

interface LoginData {
    username?: string;
    password?: string;
};

const login = (data: LoginData) => {
    return axios.post('http://localhost:3001/user/signin', data)
      .then((res) => {
        console.log(res.data[0]);
        return res.data[0];
      })
      .catch((err) => {
            console.error('Login Error:', err);
            if (axios.isAxiosError(err) && err.response) {
                console.error('Error Response:', err.response.data);
                throw err;
            } else {
                console.error('Unexpected Error:', err);
                throw new Error('An unexpected error occurred during login.');
            }
      });
  };
  
  export default {
    login
  };