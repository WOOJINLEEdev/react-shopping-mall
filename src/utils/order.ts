import { formatDate } from "utils/date";
import { lpad } from "utils/string";

export function getOrderNumber(orderCreatedAt: string, orderId: number) {
  return `${formatDate(new Date(orderCreatedAt)).replaceAll("-", "")} -
    ${lpad(orderId, 6, "0")}`;
}
