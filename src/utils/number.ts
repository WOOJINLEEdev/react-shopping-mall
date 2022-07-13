export function isNumberCheck(value: string) {
  let numberRegex = /^[0-9]+$/;

  return value && numberRegex.test(value);
}
