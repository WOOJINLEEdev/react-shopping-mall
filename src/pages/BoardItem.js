import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import useBoardItem from "hooks/useBoardItem";
import Loading from "components/common/Loading";

const BoardItem = ({ match, item }) => {
  const history = useHistory();
  const date = new Date();

  const boardItemId = match.params.id;
  const { boardItem, boardItemError } = useBoardItem(boardItemId);

  if (boardItemError) return <div>failed to load</div>;
  if (!boardItem) return <Loading />;

  const moveBoard = () => {
    history.goBack();
  };

  return (
    <ListItemWrap>
      <ItemWrap>
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
      </ItemWrap>
    </ListItemWrap>
  );
};

export default BoardItem;

const ListItemWrap = styled.div`
  padding: 50px;
  min-height: calc(100vh - 271px);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 20px;
  }
`;

const ItemWrap = styled.div`
  height: 100%;
  padding: 20px;
  border: 2px solid #acacac;
  border-radius: 5px;
`;

const ListButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
