import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSearchResult from "../Hooks/useSearchResult";
import ListItem from "./ListItem";
import { instance } from "../utils/http-client";

const SearchResult = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const { searchResultData, searchResultMutate } = useSearchResult();

  useEffect(() => {
    console.log("검색 결과:::", searchResultData);
    setSearchWord(searchResultData);

    setLoading(true);
    instance
      .get(`/v1/products?limit=8&offset=10&name=${searchResultData}`)
      .then(function (response) {
        console.log(response);
        setResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchResultData]);

  if (!searchResultData)
    return (
      <NoSearchWord>
        <span>검색 중입니다...</span>
      </NoSearchWord>
    );
  if (loading) return <div>로딩중...</div>;
  if (!result.length === 0) return <div>검색 결과가 없습니다.</div>;
  console.log("결과", result);
  console.log("검색어", searchWord);

  return (
    <ResultWrap>
      <SearchResultTitle>
        <SearchWord>{searchWord}</SearchWord>
        <span>검색결과 {result.length}건</span>
      </SearchResultTitle>
      <ul className="list_group">
        {result.map((product) => {
          return <ListItem key={product.id} item={product} />;
        })}
      </ul>
    </ResultWrap>
  );
};

export default SearchResult;

const ResultWrap = styled.div`
  padding: 20px 0;
  min-height: 500px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 10px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 20px;
  }
`;

const SearchResultTitle = styled.div`
  padding: 10px 0 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 10px 10px 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 10px 10px 20px;
  }
`;

const SearchWord = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const NoSearchWord = styled.div`
  min-height: 500px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;

  & span {
    font-size: 20px;
    line-height: 500px;
  }
`;
