import axios from "axios";
import { type AssetData } from "types/Asset";

axios.defaults.withCredentials = true;

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