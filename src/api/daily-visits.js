import { instance } from "utils/http-client";

export function getMyVisitCountApi({ visitStartDate, visitEndDate }) {
  return instance.get(
    `/v1/me/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
  );
}

export function getShopVisitCountApi({ visitStartDate, visitEndDate }) {
  return instance.get(
    `/v1/shop/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
  );
}
