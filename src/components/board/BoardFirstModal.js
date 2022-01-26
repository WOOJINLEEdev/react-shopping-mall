import Modal from "react-modal";
import styled from "styled-components";
import BoardModalCloseBtn from "components/board/BoardModalCloseBtn";

Modal.setAppElement("#root");

const BoardItemModal = ({ isOpen, onRequestClose, postList, boardItemNo }) => {
  const boardItemNumber = boardItemNo;
  const boardItem = postList.find((post) => post.no === boardItemNumber);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="boardFirstItemModal"
      overlayClassName="modalOverlay"
    >
      <BoardModalCloseBtn handleModalClose={onRequestClose} />

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
    </Modal>
  );
};

export default BoardItemModal;

const BoardContent = styled.div`
  height: 300px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #d4d4d4;
  text-align: left;
`;
