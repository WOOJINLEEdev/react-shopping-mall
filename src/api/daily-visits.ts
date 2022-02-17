import { instance } from "utils/http-client";

interface GetMyVisitCountPayload {
  visitStartDate: string;
  visitEndDate: string;
}

export function getMyVisitCountApi({
  visitStartDate,
  visitEndDate,
}: GetMyVisitCountPayload) {
  return instance.get(
    `/v1/me/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
  );
}

interface GetShopVisitCountPayload {
  visitStartDate: string;
  visitEndDate: string;
}

export function getShopVisitCountApi({
  visitStartDate,
  visitEndDate,
}: GetShopVisitCountPayload) {
  return instance.get(
    `/v1/shop/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
  );
}
