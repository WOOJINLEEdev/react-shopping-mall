import Modal from "react-modal";

import useBoardItem from "hooks/api/useBoardItem";
import { formatDate } from "utils/date";

import BoardModalCloseBtn from "components/board/BoardModalCloseBtn";

Modal.setAppElement("#root");

interface IBoardItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  boardItemId?: number;
}

const BoardItemModal = ({
  isOpen,
  onRequestClose,
  boardItemId,
}: IBoardItemModalProps) => {
  const date = new Date();

  const { boardItem } = useBoardItem(boardItemId);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="board_item_modal"
      overlayClassName="modal_overlay"
    >
      <BoardModalCloseBtn handleModalClose={onRequestClose} />
      <div>
        <table className="board_item_table">
          <thead>
            <tr>
              <th className="item_table_th">제목</th>
              <td className="item_table_td">{boardItem?.title}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="item_table_th">작성자</th>
              <td className="item_table_td">{boardItem?.userId}</td>
            </tr>
            <tr>
              <th className="item_table_th">작성일</th>
              <td className="item_table_td">{formatDate(date)}</td>
            </tr>
            <tr>
              <th className="item_table_th">조회수</th>
              <td className="item_table_td">{boardItem?.id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="board_item_textarea">{boardItem?.body}</div>
      </div>
    </Modal>
  );
};

export default BoardItemModal;
