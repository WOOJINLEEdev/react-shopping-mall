import { SWRInfiniteKeyLoader } from "swr/infinite";

import usePagingQuery from "hooks/api/usePagingQuery";

import ProductItem from "components/home/ProductItem";
import MoreViewBtn from "components/common/MoreViewBtn";
import { IProductItem } from "components/home/types";

const PAGE_LIMIT = 8;

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/v1/products?limit=${PAGE_LIMIT}&offset=${pageIndex * PAGE_LIMIT}`;
};

const ProductList = () => {
  const { data, size, setSize } = usePagingQuery(getKey);

  const products = data?.flat(Infinity) as IProductItem[];
  const isVisibility = size * PAGE_LIMIT < 100;

  function handleMoreViewBtnClick() {
    setSize(size + 1);
  }

  return (
    <>
      <ul className="list_group">
        {products.map((product: IProductItem) => {
          return (
            <ProductItem key={`product_item_${product.id}`} item={product} />
          );
        })}
      </ul>

      <MoreViewBtn
        onClick={handleMoreViewBtnClick}
        margin={"0 0 30px"}
        isVisibility={isVisibility}
      />
    </>
  );
};

export default ProductList;
