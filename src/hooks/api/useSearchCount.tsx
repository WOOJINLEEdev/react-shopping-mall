import useSWR from "swr";

import useHttpClient from "hooks/useHttpClient";

interface IUseSearchCount {
  searchInput: string;
  limit?: number;
  offset?: number;
  count?: boolean;
}

function getProductUrl({ searchInput, limit, offset, count }: IUseSearchCount) {
  const searchParams = new URLSearchParams();
  if (searchInput) {
    searchParams.append("name", searchInput);
  }
  if (limit) {
    searchParams.append("limit", String(limit));
  }
  if (offset) {
    searchParams.append("offset", String(offset));
  }
  if (count) {
    searchParams.append("count", "true");
  }

  return `/v1/products?${searchParams.toString()}`;
}

const useSearchCount = ({
  searchInput,
  limit,
  offset,
  count,
}: IUseSearchCount) => {
  const instance = useHttpClient();

  const productUrl = getProductUrl({
    searchInput,
    limit,
    offset,
    count,
  });
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(productUrl, fetcher, {
    revalidateOnFocus: false,
    suspense: true,
  });

  return {
    searchCount: data,
    loadingSearchCount: !error && !data,
    searchCountError: error,
    mutateSearchCount: mutate,
  };
};

export default useSearchCount;
