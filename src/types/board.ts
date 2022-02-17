export interface BoardFilterProps {
  handleSelectOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
}

// BoardFirstModal
export interface BoardFirstModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
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
  onRequestClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
  boardItemId: number;
}

// BoardModalCloseBtn
export interface BoardModalCloseBtnProps {
  handleModalClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
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
  children?: Object;
  loading?: any;
  boardLocal?: "first" | "second";
}

// BoardTableColumn
export interface BoardTableColumnProp {
  children?: Object;
  title?: string;
}

// BoardTableRow
export interface BoardTableRowProps {
  children?: Object;
  background?: string;
}

export interface TableRowProps {
  background?: string;
}
