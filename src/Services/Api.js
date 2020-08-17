import axios from "axios";
import { getToken } from "./Auth";

const Api = axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1/",
});

Api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;
