import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchInputBtn from "components/search/SearchInputBtn";
import useMenuCollapsed from "hooks/useMenuCollapsed";
import useSearchResult from "hooks/useSearchResult";

const Menu = ({ show }) => {
  const [searchClassName, setSearchClassName] = useState("menu_search");
  const [SearchInputClassName, setSearchInputClassName] =
    useState("menu_search_input");
  const [SearchBtnClassName, setSearchBtnClassName] =
    useState("menu_search_btn");
  const [searchInputId, setSearchInputId] = useState("menuSearchInput");
  const history = useHistory();

  const { data, mutate } = useMenuCollapsed();
  const { searchResultData, searchResultMutate } = useSearchResult();

  const handleSearchBtn = (searchInput) => {
    console.log(".....", searchInput);
    if (searchInput === "") {
      alert("검색어를 입력해주세요.");
      return false;
    }

    history.push(`/searchResult/${searchInput}`);
    searchResultMutate(searchInput);
    mutate(!data);
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
      <nav aria-labelledby="aside_menu">
        <MenuTitle id="aside_menu">MENU</MenuTitle>
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
              searchInputId={searchInputId}
              handleSearchBtn={handleSearchBtn}
            />
          </MenuItem>
        </MenuList>
      </nav>
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

const MenuTitle = styled.h2`
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
    color: green;
  }
`;
