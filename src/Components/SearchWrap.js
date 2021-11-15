import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchInputBtn from "./SearchInputBtn";
import { withRouter, useHistory } from "react-router";
import { instance } from "../utils/http-client";

const SearchWrap = ({
  searchData,
  searchClassName,
  SearchInputClassName,
  SearchBtnClassName,
  location,
}) => {
  const history = useHistory();
  const [pathName, setPathName] = useState();

  useEffect(() => {
    setPathName(location.pathname);
  }, []);

  const handleSearchBtn = (searchInput) => {
    if (searchInput === "") {
      alert("검색어를 입력해주세요.");
      return false;
    }

    instance
      .get(`/v1/products?limit=8&offset=10&name=${searchInput}`)
      .then(function (response) {
        console.log(response);
        history.push("/searchResult");
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
  transition: transform 1.5s easy-in-out;
`;
