import React, { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

interface CommonModalProps {
  isOpen: any;
  onRequestClose: any;
  modalText: string;
  btnText1: string;
  btnText2: string;
  btnClick1: any;
  btnClick2: any;
  btnWidth?: string;
  contentPadding?: string;
}

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
}: CommonModalProps) => {
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
      shouldCloseOnOverlayClick={true}
      className="common_modal"
      overlayClassName="modal_overlay"
    >
      <ModalText contentPadding={contentPadding}>{modalText}</ModalText>
      <ModalBtnWrap>
        <ModalBtn type="button" width={btnWidth} onClick={btnClick2} name="no">
          {btnText2}
        </ModalBtn>
        <ModalBtn
          type="button"
          width={btnWidth}
          backgroundColor={"green"}
          border={"3px solid green"}
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

interface ModalTextProps {
  contentPadding?: string;
}

const ModalText = styled.p<ModalTextProps>`
  padding: ${(props) => props.contentPadding || "50px 20px"};
  font-size: 18px;
  font-weight: bold;
  color: #333;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const ModalBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

interface ModalBtnProps {
  type: any;
  width: any;
  color?: any;
  border?: any;
  backgroundColor?: any;
  onClick: any;
  name: any;
}

const ModalBtn = styled.button<ModalBtnProps>`
  width: ${(props) => props.width || "30%"};
  height: 60px;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.color || "rgb(126, 126, 126)"};
  border: ${(props) => props.border || "3px solid rgb(172, 172, 172)"};
  background-color: ${(props) => props.backgroundColor || "white"};
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin: 0 5px;
  cursor: pointer;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;
