import styled from "styled-components";
import { SWRInfiniteKeyLoader } from "swr/infinite";

import useSearchCount from "hooks/api/useSearchCount";
import usePagingQuery from "hooks/api/usePagingQuery";

import ProductItem from "components/home/ProductItem";
import MoreViewBtn from "components/common/MoreViewBtn";
import { IProductItem } from "components/home/types";

const SearchResult = () => {
  const searchKeyword = new URLSearchParams(location.search).get("q");

  const { searchCount } = useSearchCount({
    searchInput: searchKeyword || "",
    count: true,
  });

  const PAGE_LIMIT = 8;
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (searchKeyword === "") {
      return null;
    }

    if (previousPageData && !previousPageData.length) {
      return null;
    }

    return `/v1/products?limit=${PAGE_LIMIT}&offset=${
      pageIndex * PAGE_LIMIT
    }&name=${searchKeyword}`;
  };

  const { data, size, setSize } = usePagingQuery(getKey);

  const products = data?.flat(Infinity) ?? [];
  const isVisibility = searchCount > 9 && size * PAGE_LIMIT < searchCount;

  function handleMoreViewBtnClick() {
    setSize(size + 1);
  }

  return (
    <ResultWrap>
      <SearchResultTitle>
        <SearchWord>{searchKeyword}</SearchWord>
        <span>검색결과 {searchCount}건</span>
      </SearchResultTitle>
      <ul className="list_group">
        {products.length === 0 ? (
          <NoSearchWord>검색 결과가 없습니다.</NoSearchWord>
        ) : (
          products.map((product: IProductItem) => {
            return <ProductItem key={product.id} item={product} />;
          })
        )}
      </ul>

      <MoreViewBtn
        onClick={handleMoreViewBtnClick}
        margin={"0 0 30px"}
        isVisibility={isVisibility}
      />
    </ResultWrap>
  );
};

export default SearchResult;

const ResultWrap = styled.div`
  padding: 20px 0;
  min-height: calc(100vh - 211px);

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
  width: 100%;
  min-height: calc(100% - 40px);
  line-height: calc(100vh - 259px);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
