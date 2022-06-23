import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Loading from "components/common/Loading";

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

const Main = () => {
  const location = useLocation();

  const setHeaderItemState = useSetRecoilState(headerItemState);

  useEffect(() => {
    setHeaderItemState(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname, setHeaderItemState]);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/:productId" element={<ItemDetail />} />
          <Route path="login" element={<LogIn />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="join" element={<Join />} />
          <Route path="checkout/:checkoutId" element={<Order />} />
          <Route path="postView/:id" element={<BoardItem />} />
          <Route path="post/:no" element={<BoardFirstItem />} />
          <Route path="boardPost" element={<BoardEditor />} />
          <Route path="selectBoard" element={<SelectBoard />} />
          <Route path="selectBoard1" element={<BoardFirst />} />
          <Route path="selectBoard2" element={<BoardSecond />} />
          <Route path="orderCheck/:checkoutId" element={<OrderCompletion />} />
          <Route path="myOrderCheck" element={<MyOrderCheck />} />
          <Route path="searchResult/:searchWord" element={<SearchResult />} />
          <Route path="aboutMe" element={<AboutMe />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
