import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import TopBtn from "components/common/TopBtn";
import CommonAsyncBoundary from "components/common/CommonAsyncBoundary";

const Menu = lazy(() => import("components/common/Menu"));

interface IDefaultLayoutProps {
  isApplyAsyncBoundary?: boolean;
}

const DefaultLayout = ({ isApplyAsyncBoundary }: IDefaultLayoutProps) => {
  return (
    <>
      <CommonAsyncBoundary>
        <Header />
      </CommonAsyncBoundary>
      <main>{isApplyAsyncBoundary ? <CommonAsyncBoundary /> : <Outlet />}</main>
      <Footer />
      <TopBtn />

      <Suspense fallback={<Loading />}>
        <Menu />
      </Suspense>
    </>
  );
};

export default DefaultLayout;
