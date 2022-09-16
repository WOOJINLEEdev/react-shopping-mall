import { AxiosInstance } from "axios";

interface IUpdateStarRatingApiPayload {
  instance: AxiosInstance;
  starRating: number;
}

export function updateStarRatingApi({
  instance,
  starRating,
}: IUpdateStarRatingApiPayload) {
  return instance.put("/v1/me/rating", {
    rating: starRating,
  });
}
