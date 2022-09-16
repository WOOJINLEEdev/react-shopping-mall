import { AxiosInstance } from "axios";

interface ICreateSocialLoginPayload {
  instance: AxiosInstance;
  socialType: string;
  accessToken?: string;
  profile?: ISocialProfile;
}

interface ISocialProfile {
  id: string;
  name: string;
  email: string;
}

export function createSocialLoginApi({
  instance,
  socialType,
  accessToken,
  profile,
}: ICreateSocialLoginPayload) {
  if (profile) {
    return instance.post(
      "/v1/auth/social-login",
      {
        social_type: socialType,
        profile: profile,
      },
      {
        withCredentials: true,
      },
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
    },
  );
}
