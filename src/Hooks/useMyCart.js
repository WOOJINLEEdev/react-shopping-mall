import useSWR from "swr";
import { instance } from "../utils/http-client";

export default function useMyCart() {
  const cartUrl = "/v1/me/cart";
  const fetcher = (url) => {
    return instance
      .get(url)
      .then((res) => ({
        ...res.data,
        items: res.data.items.map((cartItem) => ({
          ...cartItem,
          checked: true,
        })),
      }))
      .catch((error) => {
        if (error.response && [401, 404].includes(error.response.status)) {
          return {
            items: [],
          };
        }
        console.error("cart e: ", error.response);
        throw error;
      });
  };
  const { data, error, mutate } = useSWR(cartUrl, fetcher);

  return {
    cart: data,
    loadingCart: !error && !data,
    cartError: error,
    mutateCart: mutate,
  };
}
