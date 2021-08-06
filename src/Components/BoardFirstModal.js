import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const BoardItemModal = ({
  isOpen,
  onRequestClose,
  postList,
  boardItemNo,
  ModalClose,
}) => {
  const boardItemNumber = boardItemNo;
  const boardItem = postList.find((post) => post.no === boardItemNumber);

  const BoardContent = styled.div`
    height: 300px;
    padding: 20px;
    margin-top: 20px;
    border: 1px solid #d4d4d4;
    text-align: left;
  `;

  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0, 0.5)",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "70%",
      height: "500px",
      textAlign: "center",
      padding: "20px",
      boxShadow: "10px 10px 35px 20px rgb(0 0 0 / 36%)",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyle}
      shouldCloseOnOverlayClick={true}
    >
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
        <button type="button" className="modal_close_btn" onClick={ModalClose}>
          창닫기
        </button>
      </div>
    </Modal>
  );
};

export default BoardItemModal;
