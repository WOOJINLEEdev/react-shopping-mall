import useSWR from "swr";
import { instance } from "utils/http-client";
import { isLogin } from "utils/auth";

export default function useMyCart() {
  const cartUrl = "/v1/me/cart";
  const fetcher = async (url) => {
    if (!isLogin()) {
      return {
        items: [],
      };
    }
    try {
      const res = await instance.get(url);
      return {
        ...res.data,
        items: res.data.items.map((cartItem) => ({
          ...cartItem,
          checked: true,
        })),
      };
    } catch (error) {
      console.error("cart e: ", error.response);
      if (error.response && [401, 404].includes(error.response.status)) {
        return {
          items: [],
        };
      }
      throw error;
    }
  };
  const { data, error, mutate } = useSWR(cartUrl, fetcher);

  return {
    cart: data,
    loadingCart: !error && !data,
    cartError: error,
    mutateCart: mutate,
  };
}
