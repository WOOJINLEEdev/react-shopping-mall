import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import ListItem from "components/home/ListItem";
import Loading from "components/common/Loading";
import MoreViewBtn from "components/common/MoreViewBtn";
import { instance } from "utils/http-client";
import { getProductsApi } from "api";

const SearchResult = () => {
  const matchParams = useParams();
  const [resultCount, setResultCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    setSearchWord(matchParams.searchWord || "");

    async function searchProduct() {
      try {
        setLoading(true);
        const res = await getProductsApi({
          searchInput: matchParams.searchWord || "",
          count: true,
        });
        setResultCount(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (matchParams.searchWord !== searchWord) {
      searchProduct();
    }
  }, [matchParams]);

  const PAGE_LIMIT = 8;

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (searchWord === "") {
      return null;
    }

    if (previousPageData && !previousPageData.length) {
      return null;
    }

    return `/v1/products?limit=${PAGE_LIMIT}&offset=${
      pageIndex * PAGE_LIMIT
    }&name=${searchWord}`;
  };

  const fetcher = async (url: string) => {
    const res = await instance.get(url);
    return res.data;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  if (error) return <div>에러 발생...</div>;
  if (!data) return <Loading />;

  if (loading) return <Loading />;

  const products = data.flat(Infinity);

  function handleClick() {
    console.log("더보기 클릭");
    setSize(size + 1);
  }

  interface Product {
    id: number;
    images: Images[];
    name: string;
    variants: Variants[];
  }

  interface Images {
    id: number;
    product_id: number;
    src: string;
  }

  interface Variants {
    price: string;
  }

  return (
    <ResultWrap>
      <SearchResultTitle>
        <SearchWord>{searchWord}</SearchWord>
        <span>검색결과 {resultCount}건</span>
      </SearchResultTitle>
      <ul className="list_group">
        {products.length === 0 ? (
          <NoSearchWord>검색 결과가 없습니다.</NoSearchWord>
        ) : (
          products.map((product: Product) => {
            return <ListItem key={product.id} item={product} />;
          })
        )}
      </ul>
      {resultCount > 9 && size * PAGE_LIMIT < resultCount ? (
        <MoreViewBtn onClick={handleClick} margin={"0 0 30px"} />
      ) : (
        ""
      )}
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
