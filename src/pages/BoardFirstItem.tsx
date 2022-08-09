import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { postList } from "components/board/board-first-data";
import { IFirstPostItem } from "components/board/types";

const BoardFirstItem = () => {
  const navigate = useNavigate();
  const matchParams = useParams();

  const boardItemNo = Number(matchParams.no);
  const boardItem: IFirstPostItem | undefined = postList.find(
    (post) => post.no === boardItemNo,
  );

  if (!boardItem) {
    return <div>해당 데이터를 찾지 못하였습니다.</div>;
  }

  const handleMoveBoardBtn = () => {
    navigate(-1);
  };

  return (
    <ListItemWrap>
      <ItemWrap>
        <ListButtonWrap>
          <button
            type="button"
            className="board_item_back"
            onClick={handleMoveBoardBtn}
          >
            목록
          </button>
        </ListButtonWrap>

        <div>
          <table className="board_item_table">
            <thead>
              <tr>
                <th className="item_table_th">구분</th>
                <td className="item_table_td">
                  <Span>{boardItem.type}</Span>
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

const BoardContent = styled.div`
  height: 300px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
`;

const Span = styled.span`
  color: blue;
  font-weight: bold;
`;
