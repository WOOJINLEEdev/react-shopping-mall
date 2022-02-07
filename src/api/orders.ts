import { instance } from "utils/http-client";

interface GetOrdersPayload {
  checkoutId?: number;
  count?: boolean;
}

export function getOrdersApi({ checkoutId, count }: GetOrdersPayload) {
  const searchParams = new URLSearchParams();

  if (checkoutId) {
    searchParams.append("checkoutId", String(checkoutId));
  }

  if (count) {
    searchParams.append("count", "true");
  }

  return instance.get(`/v1/orders?${searchParams.toString()}`);
}
