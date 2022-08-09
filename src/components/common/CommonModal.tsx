import { useEffect, MouseEvent } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { fixOverlay } from "utils/fix-overlay";

Modal.setAppElement("#root");

interface ICommonModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  modalText: string;
  yesBtnText: string;
  noBtnText: string;
  yesBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  noBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  btnWidth?: string;
  contentPadding?: string;
  onOverlayClick?: boolean;
  onEsc?: boolean;
}

const CommonModal = ({
  isOpen,
  onRequestClose,
  modalText,
  yesBtnText,
  noBtnText,
  yesBtnClick,
  noBtnClick,
  btnWidth,
  contentPadding,
  onOverlayClick,
  onEsc,
}: ICommonModalProps) => {
  useEffect(() => {
    if (isOpen) {
      return fixOverlay();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={onOverlayClick}
      shouldCloseOnEsc={onEsc}
      className="common_modal"
      overlayClassName="modal_overlay"
    >
      <ModalText contentPadding={contentPadding}>{modalText}</ModalText>
      <ModalBtnWrap>
        <ModalBtn type="button" width={btnWidth} onClick={noBtnClick} name="no">
          {noBtnText}
        </ModalBtn>
        <ModalBtn
          type="button"
          width={btnWidth}
          backgroundColor="#008000"
          border="3px solid #008000"
          color="#fff"
          onClick={yesBtnClick}
          name="yes"
        >
          {yesBtnText}
        </ModalBtn>
      </ModalBtnWrap>
    </Modal>
  );
};

export default CommonModal;

interface IModalTextProps {
  contentPadding?: string;
}

const ModalText = styled.p<IModalTextProps>`
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

interface IModalBtnProps {
  width?: string;
  color?: string;
  border?: string;
  backgroundColor?: string;
}

const ModalBtn = styled.button<IModalBtnProps>`
  width: ${(props) => props.width || "30%"};
  height: 60px;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.color || "rgb(126, 126, 126)"};
  border: ${(props) => props.border || "3px solid rgb(172, 172, 172)"};
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin: 0 5px;
  cursor: pointer;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;
