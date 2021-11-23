import React, { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");
const CommonModal = ({
  isOpen,
  onRequestClose,
  modalText,
  btnText1,
  btnText2,
  btnClick1,
  btnClick2,
  btnWidth,
  contentPadding,
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
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyle}
      shouldCloseOnOverlayClick={true}
    >
      <ModalText contentPadding={contentPadding}>{modalText}</ModalText>
      <ModalBtnWrap>
        <ModalBtn width={btnWidth} onClick={btnClick2} name="no">
          {btnText2}
        </ModalBtn>
        <ModalBtn
          width={btnWidth}
          backgroundColor={"black"}
          color={"white"}
          onClick={btnClick1}
          name="yes"
        >
          {btnText1}
        </ModalBtn>
      </ModalBtnWrap>
    </Modal>
  );
};

export default CommonModal;

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

const ModalText = styled.p`
  padding: ${(props) => props.contentPadding || "50px 20px"};
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
  width: ${(props) => props.width || "30%"};
  height: 60px;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.color || "rgb(126, 126, 126)"};
  border: 1px solid #dadada;
  background-color: ${(props) => props.backgroundColor || "rgb(236, 236, 236)"};
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin: 0 5px;
  cursor: pointer;
`;
