import { instance } from "utils/http-client";

interface ICreateLoginPayload {
  userId: string;
  userPassword: string;
}

export function createLoginApi({ userId, userPassword }: ICreateLoginPayload) {
  return instance.post(
    "/v1/auth/login",
    {
      user_id: userId,
      user_password: userPassword,
    },
    {
      withCredentials: true,
    },
  );
}
