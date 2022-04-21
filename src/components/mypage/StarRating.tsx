import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiTwotoneStar } from "@react-icons/all-files/ai/AiTwotoneStar";
import { updateStarRatingApi } from "api";
import { StarRatingProps } from "types";

const StarRating = ({ myRating }: StarRatingProps) => {
  const stars = [1, 2, 3, 4, 5];
  const [starRatings, setStarRatings] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    myRating && setStarRatings(updatedStarRatings(myRating));
  }, [myRating]);

  const handleStarClick = async (
    e: React.MouseEvent<SVGElement> | React.KeyboardEvent<SVGElement>,
    selectedStar: number
  ) => {
    e.preventDefault();

    const selectedStarRatings = updatedStarRatings(selectedStar);

    try {
      const res = await updateStarRatingApi(
        countClickedStarsNumber(selectedStarRatings)
      );
      console.log(res);
      setStarRatings(selectedStarRatings);
    } catch (err) {
      console.log(err);
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
  & svg {
    color: #c7c7c7;
    cursor: pointer;
  }

  & .star_content_box {
    display: flex;
    flex-direction: column;
  }

  & .star_rating_box {
    display: flex;
    width: 140px;
    padding: 20px 0 0;
    line-height: 27px;
  }

  & .star_count {
    margin-left: 10px;
  }

  @media (hover: hover) {
    & div:hover > svg {
      color: orange;
    }

    & svg:hover ~ svg {
      color: #c7c7c7;
    }
  }

  .clickedstar {
    color: gold;
  }
`;
