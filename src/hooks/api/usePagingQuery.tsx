import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { instance } from "utils/http-client";

const usePagingQuery = (getKey: SWRInfiniteKeyLoader) => {
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
  });

  return {
    data: data,
    error: error,
    size: size,
    setSize: setSize,
  };
};

export default usePagingQuery;
