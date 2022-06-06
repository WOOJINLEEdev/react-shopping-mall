import { MouseEvent } from "react";

// CommonModal
export interface CommonModalProps {
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

export interface ModalTextProps {
  contentPadding?: string;
}

export interface ModalBtnProps {
  width?: string;
  color?: string;
  border?: string;
  backgroundColor?: string;
}

// QuantityCounter
export interface QuantityCounterProps {
  quantity: number;
  onIncrement: (event: MouseEvent<HTMLInputElement>) => void;
  onDecrement: (event: MouseEvent<HTMLInputElement>) => void;
  margin?: boolean;
  flexEnd?: boolean;
  productId?: number;
}

export interface QuantityAreaProps {
  margin?: boolean;
  flexEnd?: boolean;
}

// SnackBar
export interface SnackBarProps {
  open: boolean;
  autoHideDuration: number;
  message?: string;
  onClose: () => void;
}

// MoreViewBtn
export interface MoreViewBtnProps {
  onClick: () => void;
  margin?: string;
}

export interface MoreBtnProps {
  margin?: string;
}
