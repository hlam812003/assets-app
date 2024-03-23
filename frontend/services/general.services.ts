import axios from "axios";

axios.defaults.withCredentials = true;

// interface GeneralData {
//     total_asset_type?: number;
//     total_asset_available?: number;
//     total_under_maintenance?: number;
//     total_users?: number;
// };

const getAllGenerals = () => {
  return axios
    .get(`/api/dashboard/general`)
    .then(res => {
        // console.log(res.data);
        return res.data;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const getAllDepartments = () => {
    return axios
      .get(`/api/dashboard/department`)
      .then(res => {
          // console.log(res.data);
          return res.data;
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
};

const getPieChart = () => {
    return axios
      .get(`/api/dashboard/pie_chart`)
      .then(res => res.data)
      .catch(err => {
        console.error("Error fetching pie chart data:", err);
        throw err;
      });
};

export default {
    getAllGenerals,
    getAllDepartments,
    getPieChart
};