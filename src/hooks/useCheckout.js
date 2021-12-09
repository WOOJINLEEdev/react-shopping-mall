import useSWR from "swr";
import { instance } from "utils/http-client";

export default function useCheckout(checkoutId) {
  const cartUrl = `/v1/checkouts/${checkoutId}`;
  const fetcher = (url) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(cartUrl, fetcher);

  return {
    checkoutData: data,
    loadingCheckout: !error && !data,
    checkoutError: error,
    mutateCheckout: mutate,
  };
}
