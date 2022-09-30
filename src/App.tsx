import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { atom, useSetRecoilState } from "recoil";
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

  useEffect(() => {
    async function createAccessToken() {
      try {
        const res = await createAccessTokenApi({ instance });
        setToken(res.data);
      } catch (err) {
        Sentry.captureException(new SentryError(err as Error));
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
