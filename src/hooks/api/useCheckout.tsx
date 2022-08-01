import useSWR from "swr";

import { instance } from "utils/http-client";

const useCheckout = (checkoutId: string | number) => {
  const cartUrl = `/v1/checkouts/${checkoutId}`;
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(cartUrl, fetcher, { suspense: true });

  return {
    checkoutData: data,
    loadingCheckout: !error && !data,
    checkoutError: error,
    mutateCheckout: mutate,
  };
};

export default useCheckout;
