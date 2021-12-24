import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SelectBoardPage = () => {
  return (
    <SelectWrapper>
      <SelectBoard>
        <Link to="/selectBoard1" className="select_board_link">
          <p className="select_board_text">데이터를 작성하여 만든 게시판</p>
        </Link>
      </SelectBoard>
      <SelectBoard>
        <Link to="/selectBoard2" className="select_board_link">
          <p className="select_board_text">
            JSONPlaceholder의 API를 이용하여 만든 게시판
          </p>
        </Link>
      </SelectBoard>
    </SelectWrapper>
  );
};

export default SelectBoardPage;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  text-align: center;
  font-size: 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const SelectBoard = styled.div`
  width: 100%;
  border-radius: 5px;
  line-height: 48vh;
  background: linear-gradient(to right top, #fff, #d4d4d4);

  @media (hover: hover) {
    &:hover {
      border: 1px solid #efefef;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
      background: linear-gradient(to left bottom, #fff, #d4d4d4);
      transition: all 0.25s;
      transform: translateY(-2px);
      font-weight: bold;
    }
  }
`;
