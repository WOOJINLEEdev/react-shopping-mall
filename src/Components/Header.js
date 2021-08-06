import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import shoppingCartImg from "../images/shopping-cart.png";
import signInImg from "../images/user.png";
import searchImg from "../images/search2.png";

const Header = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const cartUrl = "http://localhost:8282/v1/me/cart";
  const fetcher = (url) => axios.get(url, config).then((res) => res.data);
  const { data, error } = useSWR(cartUrl, fetcher);

  if (error)
    return (
      <header className="header">
        <h1 className="header_title">
          <a href="/" className="header_link">
            <span className="visually_hidden">LOGO</span>
          </a>
        </h1>
        <div className="sign_and_cart">
          <div className="header_search">
            <img src={searchImg} className="search_img" alt="search"></img>
            <span className="visually_hidden">검색</span>
          </div>

          <Link to={!token ? "/login" : "/mypage"} className="signin_link">
            <div className="signin">
              <img src={signInImg} className="signin_img" alt="로그인"></img>
              <span className="visually_hidden">로그인</span>
            </div>
          </Link>
          <Link to="/cart" className="cart_link">
            <div className="header_cart">
              <img src={shoppingCartImg} className="cart_img" alt="cart"></img>
              <span className="visually_hidden">장바구니</span>
            </div>
          </Link>
        </div>
      </header>
    );
  if (!data) return "로딩중...";

  const cartAmount = data.items.length;
  const cartAmountStyle = {
    position: "absolute",
    top: "15px",
    right: "18px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    color: "#fff",
    backgroundColor: "rgb(255, 0, 0, 0.7)",
    fontWeight: "bold",
    fontSize: "15px",
    textAlign: "center",
    lineHeight: "22px",
  };

  const handleSearchClick = () => {
    console.log("검색클릭");
  };

  return (
    <header className="header">
      <h1 className="header_title">
        <Link to="/" className="header_link">
          WOOJINLEE
        </Link>
      </h1>
      <div className="sign_and_cart">
        <div className="header_search" onClick={handleSearchClick}>
          <img src={searchImg} className="search_img" alt="search"></img>
          <span className="visually_hidden">검색</span>
        </div>
        <Link to={!token ? "/login" : "/mypage"} className="signin_link">
          <div className="signin">
            <img src={signInImg} className="signin_img" alt="로그인"></img>
            <span className="visually_hidden">로그인</span>
          </div>
        </Link>
        <Link to="/cart" className="cart_link">
          <div className="header_cart">
            <img src={shoppingCartImg} className="cart_img" alt="cart"></img>
            <span className="visually_hidden">장바구니</span>
            {token && cartAmount > 0 ? (
              <div style={cartAmountStyle}>{cartAmount}</div>
            ) : null}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
