export interface SearchInputBtnProps {
  show?: any;
  searchClassName?: string;
  handleSearchBtn: Function;
  handleSearchInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputClassName?: string;
  searchBtnClassName?: string;
  searchPlaceHolder?: string;
  searchInputId?: string;
}

export interface SearchWrapProps {
  searchData: boolean;
  searchClassName: string;
  searchInputClassName: string;
  searchBtnClassName: string;
}
