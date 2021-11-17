import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchInputBtn from "./SearchInputBtn";
import useMenuCollapsed from "../Hooks/useMenuCollapsed";
import useSearchResult from "../Hooks/useSearchResult";
import { instance } from "../utils/http-client";

const Menu = ({ show }) => {
  const [searchClassName, setSearchClassName] = useState("menu_search");
  const [SearchInputClassName, setSearchInputClassName] =
    useState("menu_search_input");
  const [SearchBtnClassName, setSearchBtnClassName] =
    useState("menu_search_btn");
  const history = useHistory();
  const ref = useRef();

  useEffect(() => {
    if (show) {
      ref.current.focus();
    }
  }, [show]);

  const { data, mutate } = useMenuCollapsed();
  const { searchResultData, searchResultMutate } = useSearchResult();

  const handleSearchBtn = async (searchInput) => {
    console.log(".....", searchInput);
    if (searchInput === "") {
      alert("검색어를 입력해주세요.");
      return false;
    }

    await instance
      .get(`/v1/products?limit=8&offset=10&name=${searchInput}`)
      .then(function (response) {
        console.log(response);
        console.log("ddddd", searchInput);
        history.push(`/searchResult/${searchInput}`);

        searchResultMutate(searchInput);

        mutate(!data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleItemClick = (e) => {
    console.log("itemclick", e.target.dataset.name);
    const itemName = e.target.dataset.name;

    if (itemName === "ABOUT ME") {
      history.push("/aboutMe");
    }

    if (itemName === "COMMUNITY") {
      history.push("/selectBoard");
    }
    mutate(!data);
  };

  return (
    <MenuWrap className={show ? "" : "menu_hidden"}>
      <MenuTitle>MENU</MenuTitle>
      <MenuList>
        <MenuItem
          data-name="ABOUT ME"
          onClick={handleItemClick}
          onKeyPress={handleItemClick}
          tabIndex="0"
        >
          ABOUT ME
        </MenuItem>
        <MenuItem
          data-name="COMMUNITY"
          onClick={handleItemClick}
          onKeyPress={handleItemClick}
          tabIndex="0"
        >
          COMMUNITY
        </MenuItem>
        <MenuItem>
          <SearchInputBtn
            show={show}
            searchClassName={searchClassName}
            SearchInputClassName={SearchInputClassName}
            SearchBtnClassName={SearchBtnClassName}
            handleSearchBtn={handleSearchBtn}
            ref={ref}
          />
        </MenuItem>
      </MenuList>
    </MenuWrap>
  );
};

export default Menu;

const MenuWrap = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  z-index: 101;
  transition: transform 0.3s ease;
  background-color: #fff;
  margin: 0;
  top: 0;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
`;

const MenuTitle = styled.p`
  height: 80px;
  line-height: 80px;
  padding: 30px 20px;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 2px 2px 2px grey;
`;

const MenuList = styled.ul``;

const MenuItem = styled.li`
  height: 50px;
  line-height: 50px;
  padding: 20px 30px;
  vertical-align: middle;
  border: 2px solid #efefef;
  border-left: 0;
  border-right: 0;

  & + & {
    border-top: 0;
  }

  &:active {
    font-weight: bold;
    color: #f8b739;
  }
`;
