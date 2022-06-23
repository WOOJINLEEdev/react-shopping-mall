import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface ISearchInputBtnProps {
  searchClassName?: string;
  handleSearchBtnClick: Function;
  handleSearchInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchInputClassName?: string;
  searchBtnClassName?: string;
  searchPlaceHolder?: string;
  searchInputId?: string;
  handleRemoveBtnClick?: (setState: Dispatch<SetStateAction<string>>) => void;
}

export interface ISearchWrapProps {
  show: boolean;
  searchClassName: string;
  searchInputClassName: string;
  searchBtnClassName: string;
}
