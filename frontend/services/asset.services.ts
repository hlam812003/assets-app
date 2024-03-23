import axios from "axios";
import { type AssetData } from "types/Asset";

axios.defaults.withCredentials = true;

const updateAsset = async (assetId: number, assetData: AssetData) => {
  try {
    const res = await axios
      .patch(`/api/asset/${assetId}`, assetData);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteAsset = async (assetId: number) => {
  try {
    const res = await axios
      .delete(`/api/asset/${assetId}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  updateAsset,
  deleteAsset
};