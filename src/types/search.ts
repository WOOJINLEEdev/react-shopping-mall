import { Dispatch, SetStateAction } from "react";

export interface SearchInputBtnProps {
  show?: boolean;
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
  show: boolean;
  searchClassName: string;
  searchInputClassName: string;
  searchBtnClassName: string;
}
