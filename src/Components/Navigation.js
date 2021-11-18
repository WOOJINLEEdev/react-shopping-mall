import React from "react";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Container>
      <NavItem>
        <ItemText>메뉴</ItemText>
      </NavItem>
      <NavItem>검색</NavItem>
      <NavItem>커뮤니티</NavItem>
      <NavItem>마이페이지</NavItem>
    </Container>
  );
};

export default Navigation;

const Container = styled.ul`
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
  }
`;

const NavItem = styled.li`
  width: 20%;
  height: 60px;
  // line-height: 60px;
  text-align: center;
`;

const ItemText = styled.span`
  &::before {
    background: url("./images/add-user.png") no-repeat 0 0;
    content: "";
    display: block;
    height: 20px;
    width: 20px;
    padding: 10px;
    text-align: center;
  }
`;
