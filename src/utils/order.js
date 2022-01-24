import { formatDate } from "utils/formatDate";

export function getOrderNumber(orderCreatedAt, checkoutId) {
  return `${formatDate(new Date(orderCreatedAt)).replaceAll("-", "")} -
    ${String(checkoutId).padStart(6, "0")}`;
}
