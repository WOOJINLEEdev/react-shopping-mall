import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MouseEvent,
  KeyboardEvent,
} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import SearchInputBtn from "components/search/SearchInputBtn";

export const menuState = atom<boolean>({
  key: "menuState",
  default: false,
});

const Menu = () => {
  const [searchClassName, setSearchClassName] = useState<string>("menu_search");
  const [searchInputClassName, setsearchInputClassName] =
    useState<string>("menu_search_input");
  const [searchBtnClassName, setsearchBtnClassName] =
    useState<string>("menu_search_btn");
  const [searchInputId, setSearchInputId] = useState<string>("menuSearchInput");
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(menuState);

  const handleSearchBtnClick = (searchInput: string) => {
    searchInput = searchInput?.trim() ?? "";

    if (searchInput === "") {
      alert("검색어를 입력해주세요.");
      return false;
    }

    navigate(`/searchResult/${searchInput}`);
    ref?.current?.blur();

    setShow(false);
  };

  const handleItemClick = (
    e: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
  ) => {
    const itemName = (e.target as HTMLLIElement).dataset.name;

    itemName === "ABOUT ME" && navigate("/aboutMe");
    itemName === "COMMUNITY" && navigate("/selectBoard");

    setShow(false);
  };

  const handleRemoveBtnClick = (setState: Dispatch<SetStateAction<string>>) => {
    setState("");
    ref?.current?.focus();
  };

  const handleDimClick = () => {
    setShow(false);
  };

  return (
    <>
      <DimmedLayer className={show ? "" : "hide"} onClick={handleDimClick} />
      <MenuWrap className={show ? "" : "menu_hidden"}>
        <nav aria-labelledby="aside_menu">
          <MenuTitle id="aside_menu">MENU</MenuTitle>
          <MenuList>
            <MenuItem
              data-name="ABOUT ME"
              onClick={handleItemClick}
              onKeyPress={handleItemClick}
              tabIndex={0}
            >
              ABOUT ME
            </MenuItem>
            <MenuItem
              data-name="COMMUNITY"
              onClick={handleItemClick}
              onKeyPress={handleItemClick}
              tabIndex={0}
            >
              COMMUNITY
            </MenuItem>
            <MenuItem>
              <SearchInputBtn
                searchClassName={searchClassName}
                searchInputClassName={searchInputClassName}
                searchBtnClassName={searchBtnClassName}
                searchInputId={searchInputId}
                handleSearchBtnClick={handleSearchBtnClick}
                handleRemoveBtnClick={handleRemoveBtnClick}
                ref={ref}
              />
            </MenuItem>
          </MenuList>
        </nav>
      </MenuWrap>
    </>
  );
};

export default Menu;

const DimmedLayer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1);
`;

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
