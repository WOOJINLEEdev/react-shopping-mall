import React from "react";
import Modal from "react-modal";

const PopupModal = ({ isOpen, onRequestClose, setIsOpen, yesOrNo }) => {
  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0, 0.5)",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "300px",
      height: "200px",
      textAlign: "center",
      padding: "0",
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
      shouldCloseOnOverlayClick={false}
      yesOrNo={yesOrNo}
    >
      <h2
        style={{
          padding: "50px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "rgb(126, 126, 126)",
        }}
      >
        장바구니에 상품이 추가되었습니다.
      </h2>
      <div style={{ display: "flex", width: "100%" }}>
        <button className="modal_btn" name="yes" onClick={yesOrNo}>
          장바구니 이동
        </button>
        <button className="modal_btn" name="no" onClick={yesOrNo}>
          쇼핑 계속하기
        </button>
      </div>
    </Modal>
  );
};

export default PopupModal;
