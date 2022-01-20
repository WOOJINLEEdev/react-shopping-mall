import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useCurrentBoardPage from "hooks/useCurrentBoardPage";

const SelectBoardPage = () => {
  const { resetBoardData } = useCurrentBoardPage();
  const onClickBoardSelect = (boardType) => {
    resetBoardData(boardType);
  };

  return (
    <SelectWrapper>
      <SelectBoard>
        <Link
          to="/selectBoard1"
          className="select_board_link"
          onClick={() => onClickBoardSelect("first")}
        >
          <p className="select_board_text">데이터를 작성하여 만든 게시판</p>
        </Link>
      </SelectBoard>
      <SelectBoard>
        <Link
          to="/selectBoard2"
          className="select_board_link"
          onClick={() => onClickBoardSelect("second")}
        >
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
  flex-direction: row;
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
  position: relative;
  width: 45%;
  height: 100%;
  border-radius: 5px;
  line-height: 48vh;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    line-height: 45%;
  }

  & p {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid green;
    border-radius: 5px;

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90%;
      max-height: 400px;
    }

    @media (hover: hover) {
      &:hover {
        background: rgba(255, 255, 0, 0.1);
        font-weight: bold;
      }
    }
  }
`;
