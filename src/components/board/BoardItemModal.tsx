import Modal from "react-modal";
import useBoardItem from "hooks/useBoardItem";
import Loading from "components/common/Loading";
import { formatDate } from "utils/formatDate";
import BoardModalCloseBtn from "components/board/BoardModalCloseBtn";
import { BoardItemModalProps } from "types";

Modal.setAppElement("#root");

const BoardItemModal = ({
  isOpen,
  onRequestClose,
  boardItemId,
}: BoardItemModalProps) => {
  const { boardItem, boardItemError } = useBoardItem(boardItemId);
  const date = new Date();

  if (boardItemError) return <div>failed to load</div>;
  if (!boardItem) return <Loading />;

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
              <td className="item_table_td">{formatDate(date)}</td>
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
