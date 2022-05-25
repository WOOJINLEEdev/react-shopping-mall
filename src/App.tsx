import { lazy, Suspense } from "react";
import "focus-visible";
import "App.css";

import Main from "layout/Main";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import TopBtn from "components/common/TopBtn";

const Menu = lazy(() => import("components/common/Menu"));

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Suspense fallback={<Loading />}>
        <Menu />
      </Suspense>
      <Footer />
      <TopBtn />
    </div>
  );
};

export default App;
