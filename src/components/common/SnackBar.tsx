import { useEffect, useState } from "react";
import styled from "styled-components";

import { SnackBarProps } from "types";

const SnackBar = ({
  open,
  autoHideDuration,
  message,
  onClose,
}: SnackBarProps) => {
  const [barClassName, setBarClassName] = useState("hidden");

  useEffect(() => {
    if (open) {
      setBarClassName("snack_bar");

      setTimeout(() => {
        onClose();
        return setBarClassName("hidden");
      }, autoHideDuration);
    }
  }, [autoHideDuration, onClose, open]);

  return <Bar className={barClassName}>{message}</Bar>;
};

export default SnackBar;

const Bar = styled.div`
  position: fixed;
  width: calc(100% - 100px);
  max-width: 924px;
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

  &.hidden {
    display: none;
    transition: all 2s;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 60px);
    top: 60px;
  }

  @media only screen and (min-width: 768px) {
    top: 105px;
  }
`;
