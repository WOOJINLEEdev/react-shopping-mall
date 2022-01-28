import { instance } from "utils/http-client";

export function createLoginApi({ userId, userPassword }) {
  return instance.post(
    "/v1/auth/login",
    {
      user_id: userId,
      user_password: userPassword,
    },
    {
      withCredentials: true,
    }
  );
}
