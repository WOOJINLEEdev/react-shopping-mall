import { AxiosInstance } from "axios";

interface ICreateJoinPayload {
  instance: AxiosInstance;
  userId: string;
  userPassword: string;
  name: string;
  email: string;
}

export function createJoinApi({
  instance,
  userId,
  userPassword,
  name,
  email,
}: ICreateJoinPayload) {
  return instance.post("/v1/auth/join", {
    user_id: userId,
    user_password: userPassword,
    name: name,
    email: email,
  });
}
