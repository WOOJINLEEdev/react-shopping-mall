import { instance } from "utils/http-client";

export function getProductsApi({ searchInput, limit, offset, count }) {
  const searchParams = new URLSearchParams();
  if (searchInput) {
    searchParams.append("name", searchInput);
  }
  if (limit) {
    searchParams.append("limit", limit);
  }
  if (offset) {
    searchParams.append("offset", offset);
  }
  if (count) {
    searchParams.append("count", true);
  }

  return instance.get(`/v1/products?${searchParams.toString()}`);
}
