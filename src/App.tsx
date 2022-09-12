import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import "focus-visible";
import "App.css";

import useTokenStatus from "hooks/useTokenStatus";
import { createAccessTokenApi } from "api";

import Router from "routes";

const App = () => {
  const { mutateToken } = useTokenStatus();

  useEffect(() => {
    async function createAccessToken() {
      try {
        const res = await createAccessTokenApi();
        mutateToken(res.data);
      } catch (err) {
        Sentry.captureException(`Catched Error : ${err}`);
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
