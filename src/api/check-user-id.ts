import { instance } from "utils/http-client";

interface ICheckUserIdExistencePayload {
  userId: string;
}

export function checkUserIdExistenceApi({
  userId,
}: ICheckUserIdExistencePayload) {
  return instance.get(`v1/auth/check-user-id?user_id=${userId}`);
}
