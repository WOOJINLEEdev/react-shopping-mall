import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchWrap from "components/search/SearchWrap";
import Loading from "components/common/Loading";
import useSearchLocation from "hooks/useSearchLocation";
import useSearch from "hooks/useSearch";
import useActiveHeaderItem from "hooks/useActiveHeaderItem";
import useSearchResult from "hooks/useSearchResult";
import { useDevice } from "hooks/useDevice";

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
const SelectBoardPage = lazy(() => import("pages/SelectBoardPage"));
const OrderCompletion = lazy(() => import("pages/OrderCompletion"));
const MyOrderCheck = lazy(() => import("pages/MyOrderCheck"));
const AboutMe = lazy(() => import("pages/AboutMe"));
const SearchResult = lazy(() => import("pages/SearchResult"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));

const Main = () => {
  const location = useLocation();
  const { isPc } = useDevice();
  const [searchClassName, setSearchClassName] = useState("header_search_style");
  const [searchInputClassName, setsearchInputClassName] = useState(
    "header_search_input"
  );
  const [searchBtnClassName, setsearchBtnClassName] =
    useState("header_search_btn");

  const { searchData, searchMutate } = useSearch();
  const { searchLocationData, searchLocationMutate } = useSearchLocation();
  const { clickedData, clickedMutate } = useActiveHeaderItem();
  const { searchResultData, searchResultMutate } = useSearchResult();

  useEffect(() => {
    if (
      location.pathname.split("/").length === 3 &&
      location.pathname.split("/")[1] === "searchResult"
    ) {
      searchResultMutate(location.pathname.split("/")[2]);
    }

    searchLocationMutate(location.pathname);
    window.scrollTo(0, 0);

    if (location.pathname !== searchLocationData) {
      searchMutate(false);
    }
  }, [location.pathname]);

  clickedMutate(location.pathname);

  return (
    <main>
      {isPc && (
        <SearchWrap
          searchData={searchData}
          searchClassName={searchClassName}
          searchInputClassName={searchInputClassName}
          searchBtnClassName={searchBtnClassName}
        />
      )}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ItemDetail />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/join" element={<Join />} />
          <Route path="/checkout/:checkoutId" element={<Order />} />
          <Route path="/postView/:id" element={<BoardItem />} />
          <Route path="/post/:no" element={<BoardFirstItem />} />
          <Route path="/boardPost" element={<BoardEditor />} />
          <Route path="/selectBoard" element={<SelectBoardPage />} />
          <Route path="/selectBoard1" element={<BoardFirst />} />
          <Route path="/selectBoard2" element={<BoardSecond />} />
          <Route path="/orderCheck/:checkoutId" element={<OrderCompletion />} />
          <Route path="/myOrderCheck" element={<MyOrderCheck />} />
          <Route path="/searchResult/:searchWord" element={<SearchResult />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
