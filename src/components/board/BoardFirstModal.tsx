import Modal from "react-modal";
import styled from "styled-components";

import BoardModalCloseBtn from "components/board/BoardModalCloseBtn";

import { IFirstPostItem } from "components/board/types";

Modal.setAppElement("#root");

interface IBoardFirstModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  postList: IFirstPostItem[];
  boardItemNo: number;
}

const BoardItemModal = ({
  isOpen,
  onRequestClose,
  postList,
  boardItemNo,
}: IBoardFirstModalProps) => {
  const boardItemNumber = boardItemNo;
  const boardItem = postList.find(
    (postItem: IFirstPostItem) => postItem.no === boardItemNumber,
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className="board_first_item_modal"
      overlayClassName="modal_overlay"
    >
      <BoardModalCloseBtn handleModalClose={onRequestClose} />

      <Div>
        <table className="board_item_table">
          <thead>
            <tr>
              <th className="item_table_th">구분</th>
              <td className="item_table_td">
                <span className="item_table_text">{boardItem?.type}</span>
              </td>
            </tr>
            <tr>
              <th className="item_table_th">제목</th>
              <td className="item_table_td">{boardItem?.title}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="item_table_th">작성자</th>
              <td className="item_table_td">{boardItem?.user}</td>
            </tr>
            <tr>
              <th className="item_table_th">작성일</th>
              <td className="item_table_td">{boardItem?.createDate}</td>
            </tr>
            <tr>
              <th className="item_table_th">조회수</th>
              <td className="item_table_td">{boardItem?.readCount}</td>
            </tr>
          </tbody>
        </table>
      </Div>
      <div>
        <BoardContent>{boardItem?.content}</BoardContent>
      </div>
    </Modal>
  );
};

export default BoardItemModal;

const Div = styled.div`
  .item_table_text {
    color: #0000ff;
    font-weight: bold;
  }
`;

const BoardContent = styled.div`
  height: 300px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #d4d4d4;
  text-align: left;
`;
