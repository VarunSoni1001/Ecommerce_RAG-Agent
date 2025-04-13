import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

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
