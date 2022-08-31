import { lazy, Suspense, useEffect } from "react";
import * as Sentry from "@sentry/react";
import "focus-visible";
import "App.css";

import useTokenStatus from "hooks/useTokenStatus";
import { createAccessTokenApi } from "api";

import Main from "layout/Main";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import TopBtn from "components/common/TopBtn";
import CommonAsyncBoundary from "components/common/CommonAsyncBoundary";

const Menu = lazy(() => import("components/common/Menu"));

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
      <CommonAsyncBoundary>
        <Header />
      </CommonAsyncBoundary>
      <Main />
      <Footer />
      <TopBtn />

      <Suspense fallback={<Loading />}>
        <Menu />
      </Suspense>
    </div>
  );
};

export default App;
