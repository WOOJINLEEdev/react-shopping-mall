/* eslint-disable func-names */
import axios from "axios";
import { getToken, removeToken } from "utils/token";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SHOPPING_API_BASE_URL,
  timeout: 5000,
});

instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${getToken()}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "Request failed with status code 401") {
      removeToken();
    }
    return Promise.reject(error);
  },
);
