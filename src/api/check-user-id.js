import { instance } from "utils/http-client";

export function checkUserIdExistenceApi({ userId }) {
  return instance.get(`v1/auth/check-user-id?user_id=${userId}`);
}
