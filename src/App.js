import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// import Home from "../src/inc/home.js";
// import Test from "../src/inc/test.js";
// import { Home, Test } from "../src/inc";
// import { ItemDetail } from "../src/Components";
import Header from "../src/Components/Header.js";
import Footer from "../src/Components/Footer.js";
import Main from "../src/Components/Main";
// import Loading from "./Components/Loading";
import { Provider } from "react-redux";
import store from "./redux/store";
// import Banner from "./Components/Banner";
// import Content from "./Components/Content";
// import Clock from "./Components/Clock";

// import Subscribers from "./Components/Subscribers";
// import Display from "./Components/Display";

// rafce 함수형 컴포넌트 틀 불러올때
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hi: "hello",
      hello: "welcome",
    };
    console.log(this.state);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
