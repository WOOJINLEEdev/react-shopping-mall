import { AxiosInstance } from "axios";

export function updateMyVisitCountsApi({
  instance,
}: {
  instance: AxiosInstance;
}) {
  return instance.put("/v1/me/visit", null);
}

export function updateShopVisitCountsApi({
  instance,
}: {
  instance: AxiosInstance;
}) {
  return instance.put("/v1/shop/visit", null);
}
