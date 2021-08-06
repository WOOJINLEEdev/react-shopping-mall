import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import useBoardItem from "../Hooks/useBoardItem";
import Loading from "./Loading";

const ListItemWrap = styled.div`
  padding: 50px;
`;

const ListButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BoardItem = ({ match, item }) => {
  const history = useHistory();
  const date = new Date();

  const boardItemId = match.params.id;
  const { boardItem, boardItemError } = useBoardItem(boardItemId);

  if (boardItemError) return <div>failed to load</div>;
  if (!boardItem) return <Loading />;

  console.log("게시판 테스트2: boardItem ", boardItem);
  console.log("게시판 테스트3: item ", item);

  const moveBoard = () => {
    history.goBack();
  };

  return (
    <ListItemWrap>
      <div
        style={{
          border: "2px solid #acacac",
          borderRadius: "5px",
          height: "100%",
          padding: "20px",
        }}
      >
        <ListButtonWrap>
          <button type="button" className="board_item_back" onClick={moveBoard}>
            목록
          </button>
        </ListButtonWrap>

        <div>
          <table className="board_item_table">
            <thead>
              <tr>
                <th className="item_table_th">제목</th>
                <td className="item_table_td">{boardItem.title}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="item_table_th">작성자</th>
                <td className="item_table_td">{boardItem.userId}</td>
              </tr>
              <tr>
                <th className="item_table_th">작성일</th>
                <td className="item_table_td">
                  {date.getFullYear()}-
                  {date.getMonth() < 9
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1}
                  -{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
                </td>
              </tr>
              <tr>
                <th className="item_table_th">조회수</th>
                <td className="item_table_td">{boardItem.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="board_item_textarea">{boardItem.body}</div>
        </div>
      </div>
    </ListItemWrap>
  );
};

export default BoardItem;
