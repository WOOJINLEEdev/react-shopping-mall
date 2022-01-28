import { instance } from "utils/http-client";

export function createAccessTokenApi() {
  return instance.post("/v1/auth/access-token", null);
}
