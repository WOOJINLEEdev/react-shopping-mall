import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SearchInputBtn from "components/search/SearchInputBtn";
import { useLocation, useNavigate } from "react-router-dom";
import useSearchResult from "hooks/useSearchResult";
import { getProductsApi } from "api";
import { SearchWrapProps } from "types";

const SearchWrap = ({
  searchData,
  searchClassName,
  searchInputClassName,
  searchBtnClassName,
}: SearchWrapProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState("");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search");
  const [searchInputId, setSearchInputId] = useState("mainSearchInput");
  const ref = useRef<HTMLInputElement>(null);

  const { searchResultData, searchResultMutate } = useSearchResult();

  useEffect(() => {
    setPathName(location.pathname);

    if (searchData) {
      return ref?.current?.focus();
    }
  }, [searchData]);

  const handleSearchBtn = async (searchInput: string) => {
    if (searchInput === "" || searchInput === null) {
      alert("검색어를 입력해주세요.");
      ref?.current?.focus();
      return false;
    }

    try {
      const res = await getProductsApi({ searchInput, limit: 8, offset: 0 });
      console.log(res);
      navigate(`/searchResult/${searchInput}`);
      console.log("ref.current", ref?.current?.value);
      ref?.current?.focus();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchWrapper className={searchData ? "" : "search_hidden"}>
      <SearchInputBtn
        show={searchData}
        searchClassName={searchClassName}
        searchInputClassName={searchInputClassName}
        searchBtnClassName={searchBtnClassName}
        handleSearchBtn={handleSearchBtn}
        searchPlaceHolder={searchPlaceHolder}
        searchInputId={searchInputId}
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
