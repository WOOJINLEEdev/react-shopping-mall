import { useState, useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import "focus-visible";
import "App.css";
import Main from "layout/Main";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import { ReactComponent as UpArrow } from "images/up.svg";

const Menu = lazy(() => import("components/common/Menu"));

const App = () => {
  const [scrollY, setScrollY] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);
    window.addEventListener("scroll", throttle(handleScroll, 1000));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function throttle(fn: Function, delay: number) {
    let timer: any;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, arguments);
        }, delay);
      }
    };
  }

  function handleScroll() {
    console.log("handleScroll window.pageYOffset: ", window.pageYOffset);
  }

  function handleScrollY() {
    if (window.pageYOffset > 299) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  }

  const handleTopBtnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Header />
      <Main />
      <Suspense fallback={<Loading />}>
        <Menu />
      </Suspense>
      <Footer />
      <TopBtn
        type="button"
        className={scrollY ? "top_btn" : "hidden"}
        onClick={handleTopBtnClick}
      >
        <UpArrow fill="gray" width="20" height="20" />
        <span className="visually_hidden">Top 버튼</span>
      </TopBtn>
    </div>
  );
};

export default App;

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
  cursor: pointer;

  svg {
    margin: 15px 0;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #efefef;
    }

    &:hover > svg {
      fill: #333;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 1023px) {
    width: 36px;
    height: 36px;
    bottom: 100px;

    svg {
      width: 16px;
      height: 16px;
      margin: 10px 0;
    }
  }
`;
