import styled from "styled-components";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";

interface IMoreViewBtnProps {
  onClick: () => void;
  margin?: string;
  isVisibility: boolean;
}

const MoreViewBtn = ({ onClick, margin, isVisibility }: IMoreViewBtnProps) => {
  return (
    <MoreBtn
      aria-label="list_more_view"
      onClick={onClick}
      margin={margin}
      isVisibility={isVisibility}
    >
      더보기 <IoIosArrowDown />
    </MoreBtn>
  );
};

export default MoreViewBtn;

type MoreBtnProps = Omit<IMoreViewBtnProps, "onClick">;

const MoreBtn = styled.button<MoreBtnProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
  color: #333;
  font-size: 15px;
  font-weight: bold;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  box-shadow: 0 3px 15px 3px rgba(0, 0, 0, 0.1);
  margin: ${(props) => props.margin || "30px 0 0"};
  cursor: pointer;
  visibility: ${(props) => (props.isVisibility ? "visibility" : "hidden")};

  svg {
    width: 15px;
    height: 15px;
    margin: 15.5px 0 15.5px 3px;
  }

  @media (hover: hover) {
    &:hover {
      border: 2px solid #333;
    }
  }
`;
