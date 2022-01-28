import { instance } from "utils/http-client";

export function createLogoutApi() {
  return instance.post("/v1/auth/logout");
}
