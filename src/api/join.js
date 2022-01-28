import { instance } from "utils/http-client";

export function createJoinApi({ userId, userPassword, name, email }) {
  return instance.post("/v1/auth/join", {
    user_id: userId,
    user_password: userPassword,
    name: name,
    email: email,
  });
}
