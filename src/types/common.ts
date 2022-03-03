// CommonModal
export interface CommonModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  modalText: string;
  btnText1: string;
  btnText2: string;
  btnClick1: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnClick2: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  onIncrement: (event: React.MouseEvent<HTMLInputElement>) => void;
  onDecrement: (event: React.MouseEvent<HTMLInputElement>) => void;
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
  name?: string;
  text?: string;
}
