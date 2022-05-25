import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { SearchWrapProps } from "types";
import { searchWrapState } from "components/search/SearchModal";
import SearchInputBtn from "components/search/SearchInputBtn";

const SearchWrap = ({
  show,
  searchClassName,
  searchInputClassName,
  searchBtnClassName,
}: SearchWrapProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState<string>("");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState<string>("Search");
  const [searchInputId, setSearchInputId] = useState<string>("mainSearchInput");
  const ref = useRef<HTMLInputElement>(null);
  const setSearchWrapState = useSetRecoilState<boolean>(searchWrapState);

  useEffect(() => {
    setPathName(location.pathname);

    if (show) {
      return ref?.current?.focus();
    }
  }, [show]);

  const handleSearchBtnClick = async (searchInput: string) => {
    searchInput = searchInput?.trim() ?? "";

    if (searchInput === "") {
      alert("검색어를 입력해주세요.");
      ref?.current?.focus();
      return false;
    }

    navigate(`/searchResult/${searchInput}`);
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
