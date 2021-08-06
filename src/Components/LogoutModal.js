import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const LogoutModal = ({ isOpen, onRequestClose }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("delivery");
    localStorage.removeItem("board");
    window.location.replace("/");
  };

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
    >
      <h2
        style={{
          padding: "50px 20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "rgb(126, 126, 126)",
        }}
      >
        정말 로그아웃 하시겠습니까?
      </h2>
      <div style={{ display: "flex", width: "100%" }}>
        <button className="modal_btn" onClick={logout}>
          예
        </button>
        <button className="modal_btn" onClick={onRequestClose}>
          아니오
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
