export function isNumberCheck(value: string) {
  let numberRegex = /^[0-9]+$/;
  if (!numberRegex.test(value) && value !== "") return false;
}
