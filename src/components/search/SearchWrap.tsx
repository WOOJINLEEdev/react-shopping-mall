import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import SearchInputBtn from "components/search/SearchInputBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchWrapProps } from "types";

const SearchWrap = ({
  searchData,
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

  useEffect(() => {
    setPathName(location.pathname);

    if (searchData) {
      return ref?.current?.focus();
    }
  }, [searchData]);

  const handleSearchBtnClick = async (searchInput: string) => {
    searchInput = searchInput?.trim() ?? "";

    if (searchInput === "") {
      alert("검색어를 입력해주세요.");
      ref?.current?.focus();
      return false;
    }

    navigate(`/searchResult/${searchInput}`);
    ref?.current?.focus();
  };

  const handleRemoveBtnClick = (setState: Dispatch<SetStateAction<string>>) => {
    setState("");
    ref?.current?.focus();
  };

  return (
    <SearchWrapper className={searchData ? "" : "search_hidden"}>
      <SearchInputBtn
        show={searchData}
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
`;
