import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../src/Components/Header.js";
import Footer from "../src/Components/Footer.js";
import Main from "../src/Components/Main";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ReactComponent as UpArrow } from "./images/up.svg";
import styled from "styled-components";
import Menu from "../src/Components/Menu";
import useMenuCollapsed from "./Hooks/useMenuCollapsed";

function debounce(fn, delayMs) {
  let ref = null;
  return () => {
    if (ref) {
      clearTimeout(ref);
    }
    ref = setTimeout(() => {
      fn();
      ref = null;
    }, delayMs);
  };
}

const App = () => {
  const [ScrollActive, setScrollActive] = useState(false);

  const { data, mutate } = useMenuCollapsed();

  function handleScroll() {
    console.log("handleScroll window.pageYOffset: ", window.pageYOffset);
    if (window.pageYOffset > 299) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 100));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleTopBtn = () => {
    window.scrollTo(0, 0);
  };

  const handleDimClick = () => {
    mutate(!data);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <DimmedLayer className={data ? "" : "hide"} onClick={handleDimClick} />
        <Menu show={data} />
        <Main />
        <Footer />
        <TopBtn
          className={ScrollActive ? "top_btn" : "hidden"}
          onClick={handleTopBtn}
        >
          <UpArrow fill="gray" width="20" height="20" />
        </TopBtn>
      </div>
    </Provider>
  );
};

export default App;

const DimmedLayer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1);
`;

const TopBtn = styled.button`
  position: fixed;
  bottom: 50px;
  right: 2%;
  width: 50px;
  height: 50px;
  text-align: center;
  border: 1px solid #d4d4d4;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 0;
  z-index: 100;

  svg {
    margin: 15px 0;
  }

  &:hover,
  &:focus {
    background-color: #efefef;
  }

  svg:hover,
  svg:focus {
    fill: #333;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 36px;
    height: 36px;
    bottom: 80px;

    svg {
      width: 16px;
      height: 16px;
      margin: 10px 0;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 36px;
    height: 36px;
    bottom: 40px;

    svg {
      width: 16px;
      height: 16px;
      margin: 10px 0;
    }
  }
`;
