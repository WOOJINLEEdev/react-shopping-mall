import { AxiosInstance } from "axios";

interface ICreateAccessTokenApi {
  instance: AxiosInstance;
}

export function createAccessTokenApi({ instance }: ICreateAccessTokenApi) {
  return instance.post("/v1/auth/access-token", null);
}
