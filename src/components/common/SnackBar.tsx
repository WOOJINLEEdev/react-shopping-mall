import { useEffect, useState } from "react";
import styled from "styled-components";

export interface ISnackBarProps {
  open: boolean;
  autoHideDuration: number;
  message?: string;
  onClose: () => void;
}

const SnackBar = ({
  open,
  autoHideDuration,
  message,
  onClose,
}: ISnackBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);

      const timeoutRef = setTimeout(() => {
        onClose();
        return setIsOpen(false);
      }, autoHideDuration);

      return () => clearTimeout(timeoutRef);
    }
  }, [autoHideDuration, onClose, open]);

  return <Bar isOpen={isOpen}>{message}</Bar>;
};

export default SnackBar;

const Bar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: calc(100% - 100px);
  max-width: 924px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  text-align: center;
  transition: ${(props) => (props.isOpen ? "all 0.3s" : " all 2s")}
  z-index: 100;


  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 60px);
    top: 60px;
  }

  @media only screen and (min-width: 768px) {
    top: 105px;
  }
`;
