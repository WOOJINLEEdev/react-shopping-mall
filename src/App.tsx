/* eslint-disable func-names */
import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { atom, useSetRecoilState } from "recoil";
import axios, { AxiosError } from "axios";
import "focus-visible";
import "App.css";

import useHttpClient from "hooks/useHttpClient";
import { SentryError } from "utils/error";
import { createAccessTokenApi } from "api";

import Router from "routes";

export const tokenState = atom<string>({
  key: "#tokenState",
  default: "",
});

const App = () => {
  const instance = useHttpClient();

  const setToken = useSetRecoilState(tokenState);

  const handleAxiosError = (error: AxiosError) => {
    const { method, url, params, data: requestData, headers } = error.config;
    console.log("url", url);

    Sentry.setContext("API Request Detail", {
      method,
      url,
      params,
      requestData,
      headers,
    });

    if (error.response) {
      const { data, status } = error.response;
      Sentry.setContext("API Response Detail", {
        status,
        data,
      });
    }
  };

  useEffect(() => {
    async function createAccessToken() {
      try {
        const res = await createAccessTokenApi({ instance });
        setToken(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          handleAxiosError(err);
        }
        Sentry.captureException(new SentryError(err as Error));
        console.error(err);
      }
    }

    createAccessToken();
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
