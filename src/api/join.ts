import { instance } from "utils/http-client";

interface CreateJoinPayload {
  userId: string;
  userPassword: string;
  name: string;
  email: string;
}

export function createJoinApi({
  userId,
  userPassword,
  name,
  email,
}: CreateJoinPayload) {
  return instance.post("/v1/auth/join", {
    user_id: userId,
    user_password: userPassword,
    name: name,
    email: email,
  });
}
