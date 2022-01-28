import { instance } from "utils/http-client";

export function getOrdersApi({ checkout_id, count }) {
  const searchParams = new URLSearchParams();

  if (checkout_id) {
    searchParams.append("checkout_id", checkout_id);
  }

  if (count) {
    searchParams.append("count", true);
  }

  return instance.get(`/v1/orders?${searchParams.toString()}`);
}
