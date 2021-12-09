import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SearchInputBtn from "./SearchInputBtn";
import { withRouter, useHistory } from "react-router";
import { instance } from "utils/http-client";
import useSearchResult from "hooks/useSearchResult";

const SearchWrap = ({
  searchData,
  searchClassName,
  SearchInputClassName,
  SearchBtnClassName,
  location,
}) => {
  const history = useHistory();
  const [pathName, setPathName] = useState();
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search");
  const [searchInputId, setSearchInputId] = useState("mainSearchInput");
  const ref = useRef();

  const { searchResultData, searchResultMutate } = useSearchResult();

  useEffect(() => {
    setPathName(location.pathname);

    if (searchData) {
      return ref.current.focus();
    }
  }, [searchData]);

  const handleSearchBtn = async (searchInput) => {
    if (searchInput === "" || searchInput === null) {
      alert("검색어를 입력해주세요.");
      ref.current.focus();
      return false;
    }

    await instance
      .get(`/v1/products?limit=8&offset=10&name=${searchInput}`)
      .then(function (response) {
        console.log(response);
        history.push(`/searchResult/${searchInput}`);
        console.log("ref.current", ref.current.value);
        ref.current.focus();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SearchWrapper className={searchData ? "" : "search_hidden"}>
      <SearchInputBtn
        show={searchData}
        searchClassName={searchClassName}
        SearchInputClassName={SearchInputClassName}
        SearchBtnClassName={SearchBtnClassName}
        handleSearchBtn={handleSearchBtn}
        searchPlaceHolder={searchPlaceHolder}
        searchInputId={searchInputId}
        ref={ref}
      />
    </SearchWrapper>
  );
};

export default withRouter(SearchWrap);

const SearchWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 80px;
  margin: 0 auto;
  box-shadow: 0 5px 5px -5px #333;
`;
