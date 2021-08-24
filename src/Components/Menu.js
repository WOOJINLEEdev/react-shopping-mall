import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchInputBtn from "./SearchInputBtn";

const Menu = ({ show }) => {
  const [searchClassName, setSearchClassName] = useState("menu_search");
  const history = useHistory();

  const handleItemClick = () => {
    history.push("/selectBoard");
  };

  return (
    <MenuWrap className={show ? "" : "menu_hidden"}>
      <MenuList>
        <MenuItem>About Me</MenuItem>
        <MenuItem key="" onClick={handleItemClick}>
          커뮤니티
        </MenuItem>
        <MenuItem>
          <SearchInputBtn searchClassName={searchClassName} />
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

const MenuList = styled.ul``;

const MenuItem = styled.li`
  height: 50px;
  line-height: 50px;
  padding: 30px;
  vertical-align: middle;
  border: 2px solid #efefef;

  & + & {
    border-top: none;
  }
`;
