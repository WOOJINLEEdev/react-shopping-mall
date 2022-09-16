import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import useHttpClient from "hooks/useHttpClient";

const usePagingQuery = (getKey: SWRInfiniteKeyLoader) => {
  const instance = useHttpClient();

  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    persistSize: true,
    suspense: true,
  });

  return {
    data: data,
    error: error,
    size: size,
    setSize: setSize,
  };
};

export default usePagingQuery;
