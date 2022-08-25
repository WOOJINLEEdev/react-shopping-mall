import useSWR from "swr";
import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";

import { instance } from "utils/http-client";
import { isLogin } from "utils/auth";

import { ICartItem } from "components/cart/types";

const useMyCart = () => {
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
        items: res.data.items.map((cartItem: ICartItem) => ({
          ...cartItem,
          checked: true,
        })),
      };
    } catch (err: any | AxiosError) {
      Sentry.captureException(`Catched Error : ${err}`);
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
    suspense: true,
  });

  return {
    cart: data ?? { items: [] },
    loadingCart: !error && !data,
    cartError: error,
    mutateCart: mutate,
  };
};

export default useMyCart;
