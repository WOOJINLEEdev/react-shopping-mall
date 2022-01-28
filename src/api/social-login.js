import { instance } from "utils/http-client";

export function createSocialLoginApi({ socialType, accessToken, profile }) {
  if (profile) {
    return instance.post(
      "/v1/auth/social-login",
      {
        social_type: socialType,
        profile: profile,
      },
      {
        withCredentials: true,
      }
    );
  }

  return instance.post(
    "/v1/auth/social-login",
    {
      social_type: socialType,
      access_token: accessToken,
    },
    {
      withCredentials: true,
    }
  );
}
