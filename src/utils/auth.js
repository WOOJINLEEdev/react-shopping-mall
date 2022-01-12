import { getToken } from "utils/token";

export function isLogin() {
  return Boolean(getToken());
}
