import styled from "styled-components";

interface IBoardModalCloseBtnProps {
  handleModalClose: () => void;
}

const BoardModalCloseBtn = ({ handleModalClose }: IBoardModalCloseBtnProps) => {
  return (
    <BtnWrap>
      <ModalCloseBtn type="button" onClick={handleModalClose}>
        창닫기
      </ModalCloseBtn>
    </BtnWrap>
  );
};

export default BoardModalCloseBtn;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalCloseBtn = styled.button`
  display: block;
  width: 80px;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  color: #757575;
  font-weight: bold;
  outline: none;
  cursor: pointer;
`;
