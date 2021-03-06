import axios from "axios";
import { getToken } from "./Auth";

//local
/* const Api = axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1/",
}); */

//production
const Api = axios.create({
  baseURL: "https://sistema-de-caixa.herokuapp.com/api/v1/",
});

Api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;
