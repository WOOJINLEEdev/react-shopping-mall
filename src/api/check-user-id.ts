import { instance } from "utils/http-client";

interface CheckUserIdExistencePayload {
  userId: string;
}

export function checkUserIdExistenceApi({
  userId,
}: CheckUserIdExistencePayload) {
  return instance.get(`v1/auth/check-user-id?user_id=${userId}`);
}
