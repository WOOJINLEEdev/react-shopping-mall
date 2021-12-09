import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSWRInfinite } from "swr";
import ListItem from "components/home/ListItem";
import { instance } from "utils/http-client";
import useSearchResult from "hooks/useSearchResult";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "components/common/Loading";

const SearchResult = () => {
  const [result, setResult] = useState([]);
  const [resultCount, setResultCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [pageOffset, setPageOffset] = useState(0);

  const { searchResultData, searchResultMutate } = useSearchResult();

  useEffect(() => {
    console.log("검색 결과:::", searchResultData);
    setSearchWord(searchResultData);
    setLoading(true);

    instance
      .get(`/v1/products?count=true&name=${searchResultData}`)
      .then(function (response) {
        console.log("result count", response);
        setResultCount(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    instance
      .get(`/v1/products?limit=9&offset=0&name=${searchResultData}`)
      .then(function (response) {
        console.log("result", response.data);
        setResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchResultData]);

  const PAGE_LIMIT = 8;
  const pageLimit = 8;

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }

    return `/v1/products?limit=${PAGE_LIMIT}&offset=${
      pageIndex * PAGE_LIMIT
    }&name=${searchResultData}`;
  };

  const url = `/v1/products?limit=${pageLimit}&offset=${pageOffset}&name=${searchResultData}`;
  const fetcher = async (url) => {
    const res = await instance.get(url);
    return res.data;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (error) return "에러 발생";
  if (!data) return <Loading />;

  if (!searchResultData)
    return <NoSearchWord>검색 결과가 없습니다.</NoSearchWord>;
  if (loading) return <NoSearchWord>검색 중입니다...</NoSearchWord>;
  if (result.length === 0)
    return (
      <>
        {" "}
        <SearchResultTitle>
          <SearchWord>{searchWord}</SearchWord>
          <span>검색결과 {resultCount}건</span>
        </SearchResultTitle>
        <NoSearchWord>검색 결과가 없습니다.</NoSearchWord>
      </>
    );

  function handleClick() {
    console.log("더보기 클릭");
    setSize(size + 1);
  }

  return (
    <ResultWrap>
      <SearchResultTitle>
        <SearchWord>{searchWord}</SearchWord>
        <span>검색결과 {resultCount}건</span>
      </SearchResultTitle>
      <ul className="list_group">
        {data.map((products) => {
          return products.map((product) => (
            <ListItem key={product.id} item={product} />
          ));
        })}
      </ul>
      {resultCount > 9 && size * pageLimit < resultCount ? (
        <ResultMoreBtn onClick={handleClick}>
          더보기 <IoIosArrowDown />
        </ResultMoreBtn>
      ) : (
        ""
      )}
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
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 500px;
`;

const ResultMoreBtn = styled.button`
  width: 100%;
  height: 50px;
  color: #333;
  font-size: 15px;
  font-weight: bold;
  background-color: #fff;
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  outline: none;
  box-shadow: 0 3px 15px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border: 2px solid #333;
    }
  }
`;
