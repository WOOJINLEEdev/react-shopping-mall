import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IBoardFilterProps {
  handleSelectOption: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
}

// BoardFirstModal
export interface IBoardFirstModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  postList: IPostItem[];
  boardItemNo: number;
}

export interface IPostItem {
  content: string;
  createDate: string;
  no: number;
  readCount: number;
  title: string;
  type: string;
  user: string;
}

// BoardItemModal
export interface IBoardItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  boardItemId: number;
}

// BoardModalCloseBtn
export interface IBoardModalCloseBtnProps {
  handleModalClose: () => void;
}

// BoardPagination
export interface IBoardPaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface IButtonProps {
  disabled?: boolean;
  ["aria-current"]?: "page";
}

// BoardTable
export interface IBoardTableProps {
  headersName: string[];
  children?: React.ReactNode;
  loading?: any;
  boardLocal?: "first" | "second";
}

// BoardTableColumn
export interface IBoardTableColumnProp {
  children?: React.ReactNode;
  title?: string;
}

// BoardTableRow
export interface IBoardTableRowProps {
  children?: React.ReactNode;
  background?: string;
}

export interface ITableRowProps {
  background?: string;
}

// board-first-data
export interface IPosts {
  no: number;
  type: string;
  title: string;
  content: string | string[];
  user: string;
  createDate: string;
  readCount: number;
}

// SelectBoard
export interface ICurBoardState {
  pageNumber: number;
}
