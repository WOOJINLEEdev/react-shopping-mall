export interface BoardFilterProps {
  handleSelectOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
}

// BoardFirstModal
export interface BoardFirstModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  postList: Post[];
  boardItemNo: number;
}

export interface Post {
  content: string;
  createDate: string;
  no: number;
  readCount: number;
  title: string;
  type: string;
  user: string;
}

// BoardItemModal
export interface BoardItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  boardItemId: number;
}

// BoardModalCloseBtn
export interface BoardModalCloseBtnProps {
  handleModalClose: () => void;
}

// BoardPagination
export interface BoardPaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: Function;
}

export interface ButtonProps {
  disabled?: boolean;
  ["aria-current"]?: any;
}

// BoardTable
export interface BoardTableProps {
  headersName: string[];
  children?: React.ReactNode;
  loading?: any;
  boardLocal?: "first" | "second";
}

// BoardTableColumn
export interface BoardTableColumnProp {
  children?: React.ReactNode;
  title?: string;
}

// BoardTableRow
export interface BoardTableRowProps {
  children?: React.ReactNode;
  background?: string;
}

export interface TableRowProps {
  background?: string;
}
