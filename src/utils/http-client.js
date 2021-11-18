import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SHOPPING_API_BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
