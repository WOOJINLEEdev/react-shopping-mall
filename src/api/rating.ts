import { instance } from "utils/http-client";

export function updateStarRatingApi(starRating: number) {
  return instance.put("/v1/me/rating", {
    rating: starRating,
  });
}
