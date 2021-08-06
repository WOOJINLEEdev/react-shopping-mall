import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 500px;
  padding: 20px;
  text-align: center;
  font-size: 20px;
`;

const SelectBoardFirst = styled.div`
  width: 48%;
  border-radius: 5px;
  line-height: 500px;
  background: linear-gradient(to right top, #fff, #d4d4d4);

  &:hover {
    border: 1px solid #efefef;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
    transition: all 0.25s;
    transform: translateY(-2px);
    font-weight: bold;
  }
`;

const SelectBoardSecond = styled.div`
  width: 48%;
  border-radius: 5px;
  background: linear-gradient(to right bottom, #fff, #d4d4d4);

  &:hover {
    border: 1px solid #efefef;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
    transition: all 0.25s;
    transform: translateY(-2px);
    font-weight: bold;
  }
`;

const SelectBoardPage = () => {
  return (
    <SelectWrapper>
      <SelectBoardFirst>
        <Link to="/selectBoard1" className="select_board_link">
          <p>데이터를 작성하여 만든 게시판</p>
        </Link>
      </SelectBoardFirst>
      <SelectBoardSecond>
        <Link to="/selectBoard2" className="select_board_link">
          <p
            style={{
              height: "100%",
              lineHeight: "500px",
              verticalAlign: "middle",
            }}
          >
            JSONPlaceholder의 API를 이용하여 만든 게시판
          </p>
        </Link>
      </SelectBoardSecond>
    </SelectWrapper>
  );
};

export default SelectBoardPage;
