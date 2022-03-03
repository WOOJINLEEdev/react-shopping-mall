import styled from "styled-components";
import { SnackBarProps } from "types";

const SnackBar = ({ name, text }: SnackBarProps) => {
  return <Bar className={name}>{text}</Bar>;
};

export default SnackBar;

const Bar = styled.div`
  position: fixed;
  width: 85%;
  max-width: 1000px;
  height: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s;
  z-index: 100;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    top: 60px;
  }

  @media only screen and (min-width: 768px) {
    top: 105px;
  }
`;
