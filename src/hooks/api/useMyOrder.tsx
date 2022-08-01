import useSWR from "swr";

import { instance } from "utils/http-client";

interface IUseMyOrder {
  checkoutId?: number;
  count?: boolean;
}

function getOrderUrl({ checkoutId, count }: IUseMyOrder) {
  const searchParams = new URLSearchParams();

  if (checkoutId) {
    searchParams.append("checkoutId", String(checkoutId));
  }

  if (count) {
    searchParams.append("count", "true");
  }

  return `/v1/orders?${searchParams.toString()}`;
}

const useMyOrder = ({ checkoutId, count }: IUseMyOrder) => {
  const orderUrl = getOrderUrl({ checkoutId, count });
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(orderUrl, fetcher, {
    suspense: true,
  });

  return {
    myOrderData: data,
    loadingOrderData: !error && !data,
    orderError: error,
    mutateOrderData: mutate,
  };
};

export default useMyOrder;
