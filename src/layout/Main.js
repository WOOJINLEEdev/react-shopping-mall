import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ListGroup from "components/home/ListGroup.js";
import ItemDetail from "pages/ItemDetail";
import LogIn from "pages/LogIn.js";
import Cart from "pages/Cart.js";
import Join from "pages/Join.js";
import Order from "pages/Order.js";
import MyPage from "pages/MyPage.js";
import Banner from "components/home/Banner.js";
import Clock from "components/home/Clock.js";
import BoardFirst from "pages/BoardFirst";
import BoardFirstItem from "pages/BoardFirstItem";
import BoardSecond from "pages/BoardSecond";
import BoardItem from "pages/BoardItem.js";
import BoardEditor from "pages/BoardEditor.js";
import SelectBoardPage from "pages/SelectBoardPage";
import SearchWrap from "components/search/SearchWrap.js";
import OrderCompletion from "pages/OrderCompletion.js";
import SearchResult from "pages/SearchResult.js";
import MyOrderCheck from "pages/MyOrderCheck.js";
import AboutMe from "pages/AboutMe.js";
import useSearchLocation from "hooks/useSearchLocation.js";
import useSearch from "hooks/useSearch.js";
import useActiveHeaderItem from "hooks/useActiveHeaderItem.js";

const Main = ({ location }) => {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const [searchClassName, setSearchClassName] = useState("header_search_style");
  const [SearchInputClassName, setSearchInputClassName] = useState(
    "header_search_input"
  );
  const [SearchBtnClassName, setSearchBtnClassName] =
    useState("header_search_btn");
  const [mainPathName, setMainPathName] = useState();

  const { searchData, searchMutate } = useSearch();
  const { searchLocationData, searchLocationMutate } = useSearchLocation();
  const { clickedData, clickedMutate } = useActiveHeaderItem();

  useEffect(() => {
    console.log("Main 테스트중:", mainPathName);
    console.log("새로운 훅 useSearchLocation:", searchLocationData);

    setMainPathName(location.pathname);
    window.scrollTo(0, 0);

    return () => {
      if (location.pathname !== searchLocationData) {
        searchMutate(false);
      }
    };
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
    </main>
  );
};

export default withRouter(Main);
