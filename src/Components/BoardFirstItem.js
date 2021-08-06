import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { postList } from "./BoardFirstData";

const ListItemWrap = styled.div`
  padding: 50px;
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

const BoardFirstItem = ({ match, item }) => {
  const history = useHistory();

  const boardItemNo = Number(match.params.no);
  const boardItem = postList.find((post) => post.no === boardItemNo);

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
      </div>
    </ListItemWrap>
  );
};

export default BoardFirstItem;
