import { instance } from "utils/http-client";

interface IGetMyVisitCountPayload {
  visitStartDate: string;
  visitEndDate: string;
}

export function getMyVisitCountApi({
  visitStartDate,
  visitEndDate,
}: IGetMyVisitCountPayload) {
  return instance.get(
    `/v1/me/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
  );
}

interface IGetShopVisitCountPayload {
  visitStartDate: string;
  visitEndDate: string;
}

export function getShopVisitCountApi({
  visitStartDate,
  visitEndDate,
}: IGetShopVisitCountPayload) {
  return instance.get(
    `/v1/shop/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
  );
}
