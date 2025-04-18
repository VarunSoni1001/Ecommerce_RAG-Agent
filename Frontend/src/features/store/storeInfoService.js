import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getStoreInfo = async () => {
  const response = await axios.get(`${base_url}store/`, config);

  return response.data;
};

const addOrUpdateStoreInfo = async (store) => {
  const response = await axios.post(`${base_url}store/`, store, config);

  return response.data;
};

const deleteStoreInfo = async (id) => {
  const response = await axios.delete(`${base_url}store/`, config);

  return response.data;
};

const storeInfoService = {
  getStoreInfo,
  addOrUpdateStoreInfo,
  deleteStoreInfo,
};

export default storeInfoService;
