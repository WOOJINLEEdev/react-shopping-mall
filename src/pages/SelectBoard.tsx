import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { curBoardState } from "state";

const SelectBoardPage = () => {
  const setBoardFirstState = useSetRecoilState(curBoardState("first"));
  const setBoardSecondState = useSetRecoilState(curBoardState("second"));

  const handleSelectBoardClick = (boardType: string) => {
    boardType === "first"
      ? setBoardFirstState((prevState) => ({ ...prevState, pageNumber: 1 }))
      : setBoardSecondState((prevState) => ({ ...prevState, pageNumber: 1 }));
  };

  return (
    <SelectWrapper>
      <SelectBoard>
        <Link
          to="/boardFirst"
          className="select_board_link"
          onClick={() => handleSelectBoardClick("first")}
        >
          <p className="select_board_text">데이터를 작성하여 만든 게시판</p>
        </Link>
      </SelectBoard>
      <SelectBoard>
        <Link
          to="/boardSecond"
          className="select_board_link"
          onClick={() => handleSelectBoardClick("second")}
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
  min-height: calc(100vh - 211px);
  height: 100%;
  padding: 20px;
  text-align: center;
  font-size: 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    min-height: calc(100vh - 181px);
    height: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const SelectBoard = styled.div`
  position: relative;
  width: 48%;
  line-height: 400px;
  min-height: calc(100vh - 211px);
  height: 100%;
  border-radius: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    min-height: calc(50vh - 105.5px);
    line-height: 50%;
  }

  p {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid green;
    border-radius: 5px;

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      max-width: 400px;
      max-height: 400px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      width: 100%;
      height: 100%;
      max-width: 400px;
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
