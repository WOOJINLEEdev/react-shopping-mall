import { MouseEvent } from "react";

// CommonModal
export interface ICommonModalProps {
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

export interface IModalTextProps {
  contentPadding?: string;
}

export interface IModalBtnProps {
  width?: string;
  color?: string;
  border?: string;
  backgroundColor?: string;
}

// QuantityCounter
export interface IQuantityCounterProps {
  quantity: number;
  onIncrement: (event: MouseEvent<HTMLInputElement>) => void;
  onDecrement: (event: MouseEvent<HTMLInputElement>) => void;
  margin?: boolean;
  flexEnd?: boolean;
  productId?: number;
}

export interface IQuantityAreaProps {
  margin?: boolean;
  flexEnd?: boolean;
}

// SnackBar
export interface ISnackBarProps {
  open: boolean;
  autoHideDuration: number;
  message?: string;
  onClose: () => void;
}

// MoreViewBtn
export interface IMoreViewBtnProps {
  onClick: () => void;
  margin?: string;
}

export interface IMoreBtnProps {
  margin?: string;
}
