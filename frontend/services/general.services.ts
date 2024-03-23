import axios from "axios";

axios.defaults.withCredentials = true;

// interface GeneralData {
//     total_asset_type?: number;
//     total_asset_available?: number;
//     total_under_maintenance?: number;
//     total_users?: number;
// };

const getAllGenerals = async () => {
  try {
    const res = await axios
      .get(`/api/dashboard/general`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllDepartments = async () => {
    try {
    const res = await axios
      .get(`/api/dashboard/department`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getPieChart = async () => {
    try {
    const res = await axios
      .get(`/api/dashboard/pie_chart`);
    return res.data;
  } catch (err) {
    console.error("Error fetching pie chart data:", err);
    throw err;
  }
};

export default {
    getAllGenerals,
    getAllDepartments,
    getPieChart
};