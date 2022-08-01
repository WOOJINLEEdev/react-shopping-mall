import useSWR from "swr";

import { instance } from "utils/http-client";

const useProductItem = (productId?: string) => {
  const productUrl = `/v1/products/${productId}`;
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(productUrl, fetcher, {
    suspense: true,
    revalidateOnMount: false,
  });

  return {
    productData: data,
    loadingProductData: !error && !data,
    productError: error,
    mutateProductData: mutate,
  };
};

export default useProductItem;
