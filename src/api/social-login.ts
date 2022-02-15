import { instance } from "utils/http-client";

interface CreateSocialLoginPayload {
  socialType: string;
  accessToken?: string;
  profile?: SocialProfile;
}

interface SocialProfile {
  id: string;
  name: string;
  email: string;
}

export function createSocialLoginApi({
  socialType,
  accessToken,
  profile,
}: CreateSocialLoginPayload) {
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
