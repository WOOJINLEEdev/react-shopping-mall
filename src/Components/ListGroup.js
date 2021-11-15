import React, { useState } from "react";
import { useSWRInfinite } from "swr";
import ListItem from "./ListItem";
import ListGroupSkeleton from "./ListGroupSkeleton";
import downArrow from "../images/down-arrow.png";
import { instance } from "../utils/http-client";

const PAGE_LIMIT = 8;
let firstLoaded = false;

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/v1/products?limit=${PAGE_LIMIT}&offset=${pageIndex * PAGE_LIMIT}`;
};

function ListGroup() {
  const pageLimit = 8;

  const [test, setTest] = useState("loading");
  const [products, setProducts] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);

  const url = `/v1/products?limit=${pageLimit}&offset=${pageOffset}`;
  const fetcher = (url) => {
    return new Promise((resolve, reject) => {
      const timeout = !firstLoaded ? 3000 : 0;
      setTimeout(async () => {
        const res = await instance.get(url).then((res) => res.data);
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
        return products.map((product) => (
          <ListItem key={product.id} item={product} />
        ));
      })}
      <button type="button" className="more_btn" onClick={handleClick}>
        더보기
        <img
          src={downArrow}
          alt="button_arrow_img"
          className="more_btn_arrow"
        />
      </button>
    </ul>
  );
}

export default ListGroup;
