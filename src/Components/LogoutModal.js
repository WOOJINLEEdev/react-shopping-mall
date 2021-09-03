import React, { useEffect } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import useMyCart from "../Hooks/useMyCart";
import styled from "styled-components";

Modal.setAppElement("#root");
const LogoutModal = ({
  isOpen,
  onRequestClose,
  modalText,
  btnText1,
  btnText2,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = `position: ""; top: "";`;
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, []);

  const history = useHistory();
  const { cart, loadingCart, cartError, mutateCart } = useMyCart();

  if (cartError) return <div>에러 발생...</div>;
  if (loadingCart) return <div>로딩 중...</div>;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("delivery");
    localStorage.removeItem("board");

    mutateCart(
      {
        items: [],
      },
      false
    );
    history.push("/");
  };

  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0, 0.5)",
      overflow: "hidden",
      position: "fixed",
      width: "100%",
      height: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "300px",
      height: "200px",
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
      <ModalText>{modalText}</ModalText>
      <ModalBtnWrap>
        <ModalBtn black white onClick={logout}>
          {btnText1}
        </ModalBtn>
        <ModalBtn onClick={onRequestClose}>{btnText2}</ModalBtn>
      </ModalBtnWrap>
    </Modal>
  );
};

export default LogoutModal;

const ModalText = styled.p`
  padding: 50px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ModalBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalBtn = styled.button`
  width: 30%;
  height: 60px;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => (props.white ? "white" : "rgb(126, 126, 126)")};
  border: 1px solid #dadada;
  background-color: ${(props) =>
    props.black ? "black" : "rgb(236, 236, 236)"};
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin: 0 5px;
`;
