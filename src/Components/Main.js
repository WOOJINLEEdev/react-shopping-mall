import React, { useState, useEffect } from "react";
import ListGroup from "./ListGroup.js";
import ItemDetail from "./ItemDetail";
import { Route, withRouter } from "react-router-dom";
import LogIn from "./LogIn.js";
import Cart from "./Cart.js";
import Join from "./Join.js";
import Order from "./Order.js";
import MyPage from "./MyPage.js";
import Banner from "./Banner.js";
import Clock from "./Clock.js";
import BoardFirst from "./BoardFirst";
import BoardSecond from "./BoardSecond";
import BoardEditor from "./BoardEditor.js";
import BoardItem from "./BoardItem.js";
import SelectBoardPage from "./SelectBoardPage";
import BoardFirstItem from "./BoardFirstItem";
import useSearch from "../Hooks/useSearch.js";
import { useMediaQuery } from "react-responsive";
import SearchWrap from "./SearchWrap.js";
import useSearchLocation from "../Hooks/useSearchLocation.js";
import OrderCompletion from "./OrderCompletion.js";
import SearchResult from "./SearchResult.js";
import MyOrderCheck from "./MyOrderCheck.js";
import AboutMe from "./AboutMe.js";
import useActiveHeaderItem from "../Hooks/useActiveHeaderItem.js";

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
