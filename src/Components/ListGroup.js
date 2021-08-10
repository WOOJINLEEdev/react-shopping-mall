import React, { useState } from "react";
import { useSWRInfinite } from "swr";
import ListItem from "./ListItem";
import ListGroupSkeleton from "./ListGroupSkeleton";
import { useMediaQuery } from "react-responsive";

const PAGE_LIMIT = 8;
let firstLoaded = false;

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `http://localhost:8282/v1/products?limit=${PAGE_LIMIT}&offset=${
    pageIndex * PAGE_LIMIT
  }`;
};

function ListGroup() {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  const pageLimit = 8;

  const [test, setTest] = useState("loading");
  const [products, setProducts] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);

  const url = `http://localhost:8282/v1/products?limit=${pageLimit}&offset=${pageOffset}`;
  const fetcher = (url) => {
    return new Promise((resolve, reject) => {
      const timeout = !firstLoaded ? 3000 : 0;
      setTimeout(async () => {
        const res = await fetch(url).then((res) => res.json());
        firstLoaded = true;
        resolve(res);
      }, timeout);
    });
  };
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (error) return "에러 발생";
  if (!data) return <ListGroupSkeleton />;

  function handleClick(e) {
    console.log("더보기 클릭");
    setSize(size + 1);
  }

  return (
    <ul className="list_group">
      {data.map((products) => {
        return products.map((product) => <ListItem item={product} />);
      })}
      <input
        type="button"
        className="more_btn"
        value="더보기"
        onClick={handleClick}
      />
    </ul>
  );
}

export default ListGroup;
