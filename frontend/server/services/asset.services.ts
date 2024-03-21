import axios from "axios";

axios.defaults.withCredentials = true;

interface AssetData {
    asset_id?: number;
    asset_name?: string;
    asset_type?: string;
    asset_img?: string;
    department_id?: string;
    image?: string;
    status?: string;
};

const updateAsset = (assetId: number, assetData: AssetData) => {
  return axios
    .patch(`/api/asset/${assetId}`, assetData)
    .then(res => {
        console.log(res.data);
        return res.data;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const deleteAsset = (assetId: number) => {
  return axios
    .delete(`/api/asset/${assetId}`)
    .then(res => {
        console.log(res.data);
        return res.data;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export default {
  updateAsset,
  deleteAsset
};