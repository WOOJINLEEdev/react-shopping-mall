import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import SearchInputBtn from "components/search/SearchInputBtn";

import { searchWrapState } from "state";

interface ISearchWrapProps {
  show: boolean;
  searchClassName: string;
  searchInputClassName: string;
  searchBtnClassName: string;
}

const SearchWrap = ({
  show,
  searchClassName,
  searchInputClassName,
  searchBtnClassName,
}: ISearchWrapProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pathName, setPathName] = useState("");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search");
  const [searchInputId, setSearchInputId] = useState("mainSearchInput");
  const ref = useRef<HTMLInputElement>(null);

  const setSearchWrapState = useSetRecoilState<boolean>(searchWrapState);

  useEffect(() => {
    setPathName(location.pathname);

    if (show) {
      return ref?.current?.focus();
    }
  }, [location.pathname, show]);

  const handleSearchBtnClick = async (searchInput: string) => {
    const trimmedSearchInput = searchInput?.trim() ?? "";

    if (trimmedSearchInput === "") {
      alert("검색어를 입력해주세요.");
      ref?.current?.focus();
      return false;
    }

    navigate(`/search?q=${trimmedSearchInput}`);
    setSearchWrapState(false);
    ref?.current?.focus();
  };

  const handleRemoveBtnClick = (setState: Dispatch<SetStateAction<string>>) => {
    setState("");
    ref?.current?.focus();
  };

  return (
    <SearchWrapper className={show ? "" : "search_hidden"}>
      <SearchInputBtn
        searchClassName={searchClassName}
        searchInputClassName={searchInputClassName}
        searchBtnClassName={searchBtnClassName}
        handleSearchBtnClick={handleSearchBtnClick}
        searchPlaceHolder={searchPlaceHolder}
        searchInputId={searchInputId}
        handleRemoveBtnClick={handleRemoveBtnClick}
        ref={ref}
      />
    </SearchWrapper>
  );
};

export default SearchWrap;

const SearchWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 80px;
  margin: 0 auto;
  box-shadow: 0 5px 5px -5px #333;
  z-index: 100;
`;
