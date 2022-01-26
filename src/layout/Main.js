import { useState, useEffect, lazy, Suspense } from "react";
import { Route, withRouter } from "react-router-dom";
import SearchWrap from "components/search/SearchWrap.js";
import useSearchLocation from "hooks/useSearchLocation.js";
import useSearch from "hooks/useSearch.js";
import useActiveHeaderItem from "hooks/useActiveHeaderItem.js";
import useSearchResult from "hooks/useSearchResult";
import { useDevice } from "hooks/useDevice";
import Loading from "components/common/Loading";

const ListGroup = lazy(() => import("components/home/ListGroup.js"));
const ItemDetail = lazy(() => import("pages/ItemDetail.js"));
const LogIn = lazy(() => import("pages/LogIn.js"));
const Cart = lazy(() => import("pages/Cart.js"));
const Join = lazy(() => import("pages/Join.js"));
const Order = lazy(() => import("pages/Order.js"));
const MyPage = lazy(() => import("pages/MyPage.js"));
const Banner = lazy(() => import("components/home/Banner.js"));
const Clock = lazy(() => import("components/home/Clock.js"));
const BoardFirst = lazy(() => import("pages/BoardFirst"));
const BoardFirstItem = lazy(() => import("pages/BoardFirstItem"));
const BoardSecond = lazy(() => import("pages/BoardSecond"));
const BoardItem = lazy(() => import("pages/BoardItem.js"));
const BoardEditor = lazy(() => import("pages/BoardEditor.js"));
const SelectBoardPage = lazy(() => import("pages/SelectBoardPage"));
const OrderCompletion = lazy(() => import("pages/OrderCompletion.js"));
const MyOrderCheck = lazy(() => import("pages/MyOrderCheck.js"));
const AboutMe = lazy(() => import("pages/AboutMe.js"));
const SearchResult = lazy(() => import("pages/SearchResult.js"));

const Main = ({ location }) => {
  const { isPc } = useDevice();
  const [searchClassName, setSearchClassName] = useState("header_search_style");
  const [SearchInputClassName, setSearchInputClassName] = useState(
    "header_search_input"
  );
  const [SearchBtnClassName, setSearchBtnClassName] =
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
          SearchInputClassName={SearchInputClassName}
          SearchBtnClassName={SearchBtnClassName}
        />
      )}
      <Suspense fallback={<Loading />}>
        <Route path="/" component={Clock} exact />
        <Route path="/" component={Banner} exact />
        <Route path="/" component={ListGroup} exact />
        <Route path="/products/:productId" component={ItemDetail} exact />
        <Route path="/login" component={LogIn} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/join" component={Join} exact />
        <Route path={"/checkout/:checkoutId"} component={Order} exact />
        <Route path="/mypage" component={MyPage} exact />
        <Route path={"/postView/:id"} component={BoardItem} exact />
        <Route path={"/post/:no"} component={BoardFirstItem} exact />
        <Route path="/boardPost" component={BoardEditor} exact />
        <Route path="/selectBoard" component={SelectBoardPage} exact />
        <Route path="/selectBoard1" component={BoardFirst} exact />
        <Route path="/selectBoard2" component={BoardSecond} exact />
        <Route
          path={"/orderCheck/:checkoutId"}
          component={OrderCompletion}
          exact
        />
        <Route path={"/myOrderCheck"} component={MyOrderCheck} exact />
        <Route
          path={"/searchResult/:searchWord"}
          component={SearchResult}
          exact
        />
        <Route path={"/aboutMe"} component={AboutMe} exact />
      </Suspense>
    </main>
  );
};

export default withRouter(Main);
