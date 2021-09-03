import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchInputBtn from "./SearchInputBtn";
import useMenuCollapsed from "../Hooks/useMenuCollapsed";

const Menu = ({ show }) => {
  const [searchClassName, setSearchClassName] = useState("menu_search");
  const [SearchInputClassName, setSearchInputClassName] =
    useState("menu_search_input");
  const [SearchBtnClassName, setSearchBtnClassName] =
    useState("menu_search_btn");
  const history = useHistory();
  const { data, mutate } = useMenuCollapsed();

  const handleItemClick = () => {
    history.push("/selectBoard");
    mutate(!data);
  };

  return (
    <MenuWrap className={show ? "" : "menu_hidden"}>
      <MenuTitle>MENU</MenuTitle>
      <MenuList>
        <MenuItem>ABOUT ME</MenuItem>
        <MenuItem onClick={handleItemClick}>COMMUNITY</MenuItem>
        <MenuItem>
          <SearchInputBtn
            searchClassName={searchClassName}
            SearchInputClassName={SearchInputClassName}
            SearchBtnClassName={SearchBtnClassName}
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

  & + & {
    border-top: none;
  }

  &:active {
    font-weight: bold;
    color: #f8b739;
  }
`;
