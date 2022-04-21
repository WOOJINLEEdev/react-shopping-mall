import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import ListItem from "components/home/ListItem";
import ListGroupSkeleton from "components/home/ListGroupSkeleton";
import MoreViewBtn from "components/common/MoreViewBtn";
import { instance } from "utils/http-client";
import { Product } from "types";

const PAGE_LIMIT = 8;
let firstLoaded = false;

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/v1/products?limit=${PAGE_LIMIT}&offset=${pageIndex * PAGE_LIMIT}`;
};

function ListGroup() {
  const fetcher = (url: string) => {
    return new Promise((resolve, reject) => {
      const timeout = !firstLoaded ? 3000 : 0;
      setTimeout(async () => {
        const res = await instance.get(url).then((response) => response.data);
        firstLoaded = true;
        resolve(res);
      }, timeout);
    });
  };
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  if (error) return <div>에러 발생...</div>;
  if (!data) return <ListGroupSkeleton />;

  const products = data.flat(Infinity) as Product[];

  function handleMoreViewBtnClick() {
    setSize(size + 1);
  }

  return (
    <>
      <ul className="list_group">
        {products.map((product: Product) => {
          return <ListItem key={product.id} item={product} />;
        })}
      </ul>

      <MoreViewBtn onClick={handleMoreViewBtnClick} margin={"0 0 30px"} />
    </>
  );
}

export default ListGroup;
