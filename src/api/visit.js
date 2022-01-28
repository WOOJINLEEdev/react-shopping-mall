import { instance } from "utils/http-client";

export function updateMyVisitCountsApi() {
  return instance.put("/v1/me/visit", null);
}

export function updateShopVisitCountsApi() {
  return instance.put("/v1/shop/visit", null);
}
