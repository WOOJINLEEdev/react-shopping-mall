import useSWR from "swr";

import useHttpClient from "hooks/useHttpClient";

const useCheckout = (checkoutId: string | number) => {
  const instance = useHttpClient();

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
