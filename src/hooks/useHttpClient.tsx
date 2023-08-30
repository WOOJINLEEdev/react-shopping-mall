/* eslint-disable func-names */
import { useMemo } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRecoilState } from "recoil";

import { tokenState } from "App";

const useHttpClient = () => {
  const [token, setToken] = useRecoilState(tokenState);

  const instance = useMemo(() => {
    const newInstance = axios.create({
      baseURL: process.env.REACT_APP_SHOPPING_API_BASE_URL,
      timeout: 5000,
    });

    newInstance.defaults.withCredentials = true;

    newInstance.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        if (config.headers === undefined) {
          config.headers = {};
        }

        config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    newInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (token && error.message === "Request failed with status code 401") {
          setToken("");
        }
        return Promise.reject(error);
      },
    );

    return newInstance;
  }, [token]);

  return instance;
};

export default useHttpClient;
