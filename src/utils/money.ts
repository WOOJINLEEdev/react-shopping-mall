export function formatPrice(value: string, replaceValue?: string) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue || ",");
}
