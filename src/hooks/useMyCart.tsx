import useSWR from "swr";
import { instance } from "utils/http-client";
import { isLogin } from "utils/auth";
import axios, { AxiosError } from "axios";

export default function useMyCart() {
  const cartUrl = "/v1/me/cart";
  const fetcher = async (url: any) => {
    if (!isLogin()) {
      return {
        items: [],
      };
    }
    try {
      const res = await instance.get(url);
      return {
        ...res.data,
        items: res.data.items.map((cartItem: any) => ({
          ...cartItem,
          checked: true,
        })),
      };
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        err = err as AxiosError;

        if ([401, 404].includes(err.response.status)) {
          return {
            items: [],
          };
        }
      }
      throw err;
    }
  };
  const { data, error, mutate } = useSWR(cartUrl, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    cart: data,
    loadingCart: !error && !data,
    cartError: error,
    mutateCart: mutate,
  };
}
