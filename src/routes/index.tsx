import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import DefaultLayout from "layout/DefaultLayout";

import Loading from "components/common/Loading";
import HomeSkeleton from "components/home/HomeSkeleton";

import { headerItemState } from "state";

const Home = lazy(() => import("pages/Home"));
const ItemDetail = lazy(() => import("pages/ItemDetail"));
const LogIn = lazy(() => import("pages/LogIn"));
const Cart = lazy(() => import("pages/Cart"));
const Join = lazy(() => import("pages/Join"));
const Order = lazy(() => import("pages/Order"));
const MyPage = lazy(() => import("pages/MyPage"));
const BoardFirst = lazy(() => import("pages/BoardFirst"));
const BoardFirstItem = lazy(() => import("pages/BoardFirstItem"));
const BoardSecond = lazy(() => import("pages/BoardSecond"));
const BoardItem = lazy(() => import("pages/BoardItem"));
const BoardEditor = lazy(() => import("pages/BoardEditor"));
const SelectBoard = lazy(() => import("pages/SelectBoard"));
const OrderCompletion = lazy(() => import("pages/OrderCompletion"));
const MyOrderCheck = lazy(() => import("pages/MyOrderCheck"));
const AboutMe = lazy(() => import("pages/AboutMe"));
const SearchResult = lazy(() => import("pages/SearchResult"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));

const Router = () => {
  const location = useLocation();

  const setHeaderItemState = useSetRecoilState(headerItemState);

  useEffect(() => {
    setHeaderItemState(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname, setHeaderItemState]);

  return (
    <Suspense
      fallback={location.pathname === "/" ? <HomeSkeleton /> : <Loading />}
    >
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="selectBoard" element={<SelectBoard />} />
          <Route path="boardFirst" element={<BoardFirst />} />
          <Route path="boardFirst/posts/:no" element={<BoardFirstItem />} />
          <Route path="boardPost" element={<BoardEditor />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<LogIn />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route element={<DefaultLayout isApplyAsyncBoundary />}>
          <Route path="aboutMe" element={<AboutMe />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:productId" element={<ItemDetail />} />
          <Route path="boardSecond" element={<BoardSecond />} />
          <Route path="boardSecond/posts/:id" element={<BoardItem />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="checkout/:checkoutId" element={<Order />} />
          <Route path="myOrderCheck" element={<MyOrderCheck />} />
          <Route path="orderCheck/:checkoutId" element={<OrderCompletion />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
