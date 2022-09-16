import useSWR from "swr";

import useHttpClient from "hooks/useHttpClient";

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
  const instance = useHttpClient();

  const orderUrl = getOrderUrl({ checkoutId, count });
  const fetcher = (url: string) => {
    return instance.get(url).then((res) => res.data);
  };

  const { data, error, mutate } = useSWR(orderUrl, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  return {
    myOrderData: data,
    loadingOrderData: !error && !data,
    orderError: error,
    mutateOrderData: mutate,
  };
};

export default useMyOrder;
