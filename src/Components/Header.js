import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import signInImg from "../images/user.png";
import useMyCart from "../Hooks/useMyCart";
import useMenuCollapsed from "../Hooks/useMenuCollapsed";
import useSearch from "../Hooks/useSearch";
import useSearchLocation from "../Hooks/useSearchLocation";
import useSearchResult from "../Hooks/useSearchResult";
import { ReactComponent as MenuImg } from "../images/menu.svg";
import { GoSearch } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { instance } from "../utils/http-client";

const Header = ({ location }) => {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    instance
      .put("/v1/me/visit", null)
      .then(function (response) {
        console.log(response);
        console.log("visit", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { cart, loadingCart, cartError, mutateCart } = useMyCart();
  const { data, mutate } = useMenuCollapsed();
  const { searchData, searchMutate } = useSearch();
  const { searchLocationData, searchLocationMutate } = useSearchLocation();
  const { searchResultData, searchResultMutate } = useSearchResult();

  if (cartError) return "에러 발생...";
  if (loadingCart) return "로딩중...";

  const cartAmount = cart.items.length;

  const handleMenuClick = () => {
    mutate(!data);
  };

  const handleSearchClick = () => {
    searchMutate(!searchData);

    console.log("검색버튼클릭", location.pathname);
    searchLocationMutate(location.pathname);
  };

  return (
    <header className="header">
      <MenuHomeWrap>
        <MenuWrap
          onClick={handleMenuClick}
          tabIndex="0"
          onKeyPress={handleMenuClick}
        >
          <MenuImg fill="#333" width="20" height="20" margin="20px" />
        </MenuWrap>

        <Link to="/" className="header_link">
          <h1 className="header_title">WJ Shop</h1>
        </Link>
      </MenuHomeWrap>

      <SignCartWrap>
        {isPc && (
          <Link to="/aboutMe" className="about_link">
            <HeaderAbout>
              <span>ABOUT</span>
              <span>ME</span>
            </HeaderAbout>
          </Link>
        )}
        {isPc && (
          <HeaderSearch
            onClick={handleSearchClick}
            onKeyPress={handleSearchClick}
            tabIndex="0"
          >
            <GoSearch />
            <span className="visually_hidden">검색</span>
          </HeaderSearch>
        )}
        <Link to={!token ? "/login" : "/mypage"} className="signin_link">
          <HeaderSignIn>
            <img src={signInImg} className="signin_img" alt="sign_in"></img>
            <span className="visually_hidden">로그인</span>
          </HeaderSignIn>
        </Link>
        <Link to="/cart" className="cart_link">
          <HeaderCart>
            <FiShoppingCart />
            <span className="visually_hidden">장바구니</span>
            {token && cartAmount > 0 ? (
              <CartAmount>{cartAmount}</CartAmount>
            ) : null}
          </HeaderCart>
        </Link>
      </SignCartWrap>
    </header>
  );
};

export default withRouter(Header);

const MenuHomeWrap = styled.div`
  display: flex;
  width: 210px;
  height: 80px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    width: 180px;
    margin: 0;
  }
`;

const MenuWrap = styled.div`
  display: none;
  width: 90px;
  height: 80px;
  text-align: center;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin: 0;
    text-align: center;

    svg {
      margin: 20px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    display: inline-block;

    svg {
      width: 30px;
      height: 30px;
      margin: 25px 30px;
    }
  }
`;

const HeaderAbout = styled.div`
  display: flex;
  width: 90px;
  height: 80px;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  justify-content: center;

  &:hover {
    border-bottom: 3px solid #333;
  }
`;

const HeaderSearch = styled.div`
  display: inline-block;
  width: 90px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  & svg {
    width: 32px;
    height: 32px;
    margin: 24px 29px;
  }

  &:hover {
    border-bottom: 3px solid #333;
  }
`;

const HeaderSignIn = styled.div`
  display: inline-block;
  width: 90px;
  height: 80px;
  line-height: 80px;
  color: #333;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  & img {
    width: 32px;
    height: 32px;
    margin: 24px 29px;
  }

  &:hover {
    border-bottom: 3px solid #333;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 60px;
    height: 60px;

    & img {
      width: 20px;
      height: 20px;
      margin: 20px;
    }

    &:hover {
      border-bottom: 0;
    }
  }
`;

const HeaderCart = styled.div`
  display: inline-block;
  width: 90px;
  height: 80px;
  color: #333;
  line-height: 80px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  & svg {
    width: 32px;
    height: 32px;
    margin: 24px 29px;
  }

  &:hover {
    border-bottom: 3px solid #333;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 60px;
    height: 60px;

    & svg {
      width: 20px;
      height: 20px;
      margin: 20px;
    }

    &:hover {
      border-bottom: 0;
    }
  }
`;

const SignCartWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 360px;
  height: 80px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 120px;
    height: 60px;
  }
`;

const CartAmount = styled.div`
  position: absolute;
  top: 15px;
  right: 18px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  background-color: rgb(255, 0, 0, 0.7);
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  line-height: 22px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 18px;
    height: 18px;
    font-size: 12px;
    line-height: 18px;
    top: 10px;
    right: 10px;
  }

  @media only screen and (min-width: 768) and (max-width: 1023px) {
  }
`;
