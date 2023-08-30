import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { atom, useSetRecoilState } from "recoil";
import "focus-visible";
import "App.css";

import useHttpClient from "hooks/useHttpClient";
import { SentryError } from "utils/error";
import { createAccessTokenApi } from "api";

import Router from "routes";
import Loading from "components/common/Loading";

export const tokenState = atom<string>({
  key: "#tokenState",
  default: "",
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const instance = useHttpClient();

  const setToken = useSetRecoilState(tokenState);

  useEffect(() => {
    async function createAccessToken() {
      try {
        const res = await createAccessTokenApi({ instance });
        setToken(res.data);
      } catch (err) {
        Sentry.captureException(new SentryError(err as Error));
      } finally {
        setIsLoading(false);
      }
    }

    createAccessToken();
  }, []);

  return <div className="App">{isLoading ? <Loading /> : <Router />}</div>;
};

export default App;
