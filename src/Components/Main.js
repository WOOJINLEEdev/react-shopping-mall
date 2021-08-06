import React, { useState } from "react";
import ListGroup from "./ListGroup.js";
import ItemDetail from "./ItemDetail";
import { Route } from "react-router-dom";
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

const Main = () => {
  return (
    <main>
      <Route path="/" component={Clock} exact />
      <Route path="/" component={Banner} exact />
      <Route path="/" component={ListGroup} exact />
      <Route path="/products/:productId" component={ItemDetail} exact />
      <Route path="/login" component={LogIn} exact />
      <Route path="/cart" component={Cart} exact />
      <Route path="/join" component={Join} exact />
      <Route path="/order" component={Order} exact />
      <Route path="/mypage" component={MyPage} exact />
      <Route path={"/postView/:id"} component={BoardItem} exact />
      <Route path={"/post/:no"} component={BoardFirstItem} exact />
      <Route path="/boardPost" component={BoardEditor} exact />
      <Route path="/selectBoard" component={SelectBoardPage} exact />
      <Route path="/selectBoard1" component={BoardFirst} exact />
      <Route path="/selectBoard2" component={BoardSecond} exact />
    </main>
  );
};

export default Main;
