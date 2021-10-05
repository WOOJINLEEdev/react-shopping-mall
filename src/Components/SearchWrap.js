import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchInputBtn from "./SearchInputBtn";
import { withRouter, useHistory } from "react-router";
import useSearchResult from "../Hooks/useSearchResult";
import axios from "axios";

const SearchWrap = ({
  searchData,
  searchClassName,
  SearchInputClassName,
  SearchBtnClassName,
  location,
}) => {
  const [pathName, setPathName] = useState();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    setPathName(location.pathname);
  }, []);

  const { searchResultData, searchResultMutate } = useSearchResult();

  const handleSearchBtn = () => {
    axios
      .get(
        `http://localhost:8282/v1/products?limit=8&offset=10&name=${searchResultData}`,
        config
      )
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
  width: 50%;
  height: 80px;
  margin: 0 auto;
  transition: all ease 1s 0s;
`;
