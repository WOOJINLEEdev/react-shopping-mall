export function formatPriceWithUnit(price: string | number, unit?: "+") {
  if (unit) {
    return `${price !== "0" ? "+" : ""} ${formatPrice(price.toString())}`;
  }

  return `${price > 0 ? "-" : ""} ${formatPrice(price.toString())}`;
}

export function formatPrice(value: string, replaceValue?: string) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue || ",");
}
