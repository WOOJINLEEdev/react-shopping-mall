import { formatDate } from "utils/formatDate";

export function getOrderNumber(orderCreatedAt: any, orderId: any) {
  return `${formatDate(new Date(orderCreatedAt)).replaceAll("-", "")} -
    ${String(orderId).padStart(6, "0")}`;
}
