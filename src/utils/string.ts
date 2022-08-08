export function lpad(
  value: number | string,
  maxLength: number,
  fillString?: string,
) {
  return String(value).padStart(maxLength, fillString);
}
