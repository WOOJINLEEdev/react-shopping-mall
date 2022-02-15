import { formatDate } from "utils/formatDate";

export function getOrderNumber(orderCreatedAt: string, orderId: number) {
  return `${formatDate(new Date(orderCreatedAt)).replaceAll("-", "")} -
    ${String(orderId).padStart(6, "0")}`;
}
