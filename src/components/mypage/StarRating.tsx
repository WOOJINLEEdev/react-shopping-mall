import { useState, useEffect } from "react";
import { AiTwotoneStar } from "@react-icons/all-files/ai/AiTwotoneStar";
import styled from "styled-components";
import { updateStarRatingApi } from "api";

const StarRating = ({ myRating }: any) => {
  const stars = [1, 2, 3, 4, 5];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    if (myRating) {
      setPoint(myRating);
      let clickStates = [...clicked];
      for (let i = 0; i < myRating; i++) {
        clickStates[i] = true;
      }

      setClicked(clickStates);
    }
  }, [myRating]);

  const handleStarClick = async (e: any, index: number) => {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 0; i < stars.length; i++) {
      if (i <= index) {
        clickStates[i] = true;
      } else {
        clickStates[i] = false;
      }
    }
    const point = clickStates.filter(Boolean).length;

    setClicked(clickStates);
    setPoint(point);

    try {
      const res = await updateStarRatingApi(point);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StarWrap>
      <div className="star_content_box">
        <h3>별점 등록</h3>
        <div className="star_rating_box">
          {stars.map((star, i) => (
            <AiTwotoneStar
              key={star.toString()}
              className={clicked[i] ? "clickedstar" : undefined}
              onClick={(e) => handleStarClick(e, i)}
              size="27px"
              tabIndex={0}
              onKeyPress={(e) => handleStarClick(e, i)}
            />
          ))}
          <div className="star_count">{point}</div>
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
