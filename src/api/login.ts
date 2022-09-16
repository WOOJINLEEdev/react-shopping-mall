import { AxiosInstance } from "axios";

interface ICreateLoginPayload {
  instance: AxiosInstance;
  userId: string;
  userPassword: string;
}

export function createLoginApi({
  instance,
  userId,
  userPassword,
}: ICreateLoginPayload) {
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
