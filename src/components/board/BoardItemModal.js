import React from "react";
import Modal from "react-modal";
import useBoardItem from "hooks/useBoardItem";
import Loading from "components/common/Loading";

Modal.setAppElement("#root");

const BoardItemModal = ({ isOpen, onRequestClose, boardItemId }) => {
  const { boardItem, boardItemError } = useBoardItem(boardItemId);
  const date = new Date();

  if (boardItemError) return <div>failed to load</div>;
  if (!boardItem) return <Loading />;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="boardItemModal"
      overlayClassName="modalOverlay"
    >
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
    </Modal>
  );
};

export default BoardItemModal;
