import { useState, useEffect, MouseEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { AiTwotoneStar } from "@react-icons/all-files/ai/AiTwotoneStar";
import * as Sentry from "@sentry/react";

import useHttpClient from "hooks/useHttpClient";
import { SentryError } from "utils/error";
import { updateStarRatingApi } from "api";

interface IStarRatingProps {
  myRating: number;
}

const StarRating = ({ myRating }: IStarRatingProps) => {
  const stars = [1, 2, 3, 4, 5];
  const [starRatings, setStarRatings] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const instance = useHttpClient();

  useEffect(() => {
    myRating && setStarRatings(updatedStarRatings(myRating));
  }, [myRating]);

  const handleStarClick = async (
    e: MouseEvent<SVGElement> | KeyboardEvent<SVGElement>,
    selectedStar: number,
  ) => {
    e.preventDefault();

    const selectedStarRatings = updatedStarRatings(selectedStar);

    try {
      await updateStarRatingApi({
        instance,
        starRating: countClickedStarsNumber(selectedStarRatings),
      });

      setStarRatings(selectedStarRatings);
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  function updatedStarRatings(selected: number) {
    return stars.map((star) => star <= selected);
  }

  function countClickedStarsNumber(clickedStars: boolean[]) {
    return clickedStars.filter(Boolean).length;
  }

  return (
    <StarWrap>
      <div className="star_content_box">
        <h3>별점 등록</h3>
        <div className="star_rating_box">
          {stars.map((star, i) => (
            <AiTwotoneStar
              key={star.toString()}
              className={starRatings[i] ? "clickedstar" : undefined}
              onClick={(e) => handleStarClick(e, star)}
              onKeyPress={(e) => handleStarClick(e, star)}
              size="27px"
              tabIndex={0}
            />
          ))}
          <div className="star_count">
            {countClickedStarsNumber(starRatings)}
          </div>
        </div>
      </div>
    </StarWrap>
  );
};

export default StarRating;

const StarWrap = styled.div`
  svg {
    color: #c7c7c7;
    cursor: pointer;
  }

  .star_content_box {
    display: flex;
    flex-direction: column;
  }

  .star_rating_box {
    display: flex;
    width: 140px;
    padding: 20px 0 0;
    line-height: 27px;
  }

  .star_count {
    margin-left: 10px;
  }

  @media (hover: hover) {
    div:hover > svg {
      color: #ffa500;
    }

    svg:hover ~ svg {
      color: #c7c7c7;
    }
  }

  .clickedstar {
    color: #ffd700;
  }
`;
