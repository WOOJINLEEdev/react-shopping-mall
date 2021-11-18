import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { postList } from "./BoardFirstData";

const BoardFirstItem = ({ match, item }) => {
  const history = useHistory();

  const boardItemNo = Number(match.params.no);
  const boardItem = postList.find((post) => post.no === boardItemNo);

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
                <th className="item_table_th">구분</th>
                <td className="item_table_td">
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    {boardItem.type}
                  </span>
                </td>
              </tr>
              <tr>
                <th className="item_table_th">제목</th>
                <td className="item_table_td">{boardItem.title}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="item_table_th">작성자</th>
                <td className="item_table_td">{boardItem.user}</td>
              </tr>
              <tr>
                <th className="item_table_th">작성일</th>
                <td className="item_table_td">{boardItem.createDate}</td>
              </tr>
              <tr>
                <th className="item_table_th">조회수</th>
                <td className="item_table_td">{boardItem.readCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <BoardContent>{boardItem.content}</BoardContent>
        </div>
      </ItemWrap>
    </ListItemWrap>
  );
};

export default BoardFirstItem;

const ListItemWrap = styled.div`
  padding: 50px;

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

const BoardContent = styled.div`
  height: 300px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
`;
