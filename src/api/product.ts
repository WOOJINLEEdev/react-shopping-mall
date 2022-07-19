import { instance } from "utils/http-client";

interface IGetProductsPayload {
  searchInput: string;
  limit?: number;
  offset?: number;
  count?: boolean;
}

export function getProductsApi({
  searchInput,
  limit,
  offset,
  count,
}: IGetProductsPayload) {
  const searchParams = new URLSearchParams();
  if (searchInput) {
    searchParams.append("name", searchInput);
  }
  if (limit) {
    searchParams.append("limit", String(limit));
  }
  if (offset) {
    searchParams.append("offset", String(offset));
  }
  if (count) {
    searchParams.append("count", "true");
  }

  return instance.get(`/v1/products?${searchParams.toString()}`);
}
