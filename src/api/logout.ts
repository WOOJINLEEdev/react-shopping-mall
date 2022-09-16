import { AxiosInstance } from "axios";

interface ICreateLogoutApi {
  instance: AxiosInstance;
}

export function createLogoutApi({ instance }: ICreateLogoutApi) {
  return instance.post("/v1/auth/logout");
}
