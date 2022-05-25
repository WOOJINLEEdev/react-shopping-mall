import useSWR from "swr";
import axios, { AxiosError } from "axios";

import { instance } from "utils/http-client";
import { isLogin } from "utils/auth";

interface CartItem {
  cart_id: number;
  id: number;
  product_id: number;
  product_image_src: string;
  product_name: string;
  quantity: number;
  variant_id: number;
  variant_name: string;
  variant_price: string;
}

export default function useMyCart() {
  const cartUrl = "/v1/me/cart";
  const fetcher = async (url: string) => {
    if (!isLogin()) {
      return {
        items: [],
      };
    }
    try {
      const res = await instance.get(url);
      return {
        ...res.data,
        items: res.data.items.map((cartItem: CartItem) => ({
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
