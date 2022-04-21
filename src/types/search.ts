import { Dispatch, SetStateAction } from "react";

export interface SearchInputBtnProps {
  show?: any;
  searchClassName?: string;
  handleSearchBtnClick: Function;
  handleSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputClassName?: string;
  searchBtnClassName?: string;
  searchPlaceHolder?: string;
  searchInputId?: string;
  handleRemoveBtnClick?: (setState: Dispatch<SetStateAction<string>>) => void;
}

export interface SearchWrapProps {
  searchData: boolean;
  searchClassName: string;
  searchInputClassName: string;
  searchBtnClassName: string;
}
