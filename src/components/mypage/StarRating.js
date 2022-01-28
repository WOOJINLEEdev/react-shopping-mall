import React, { useState, useEffect } from "react";
import { AiTwotoneStar } from "@react-icons/all-files/ai/AiTwotoneStar";
import styled from "styled-components";
import { updateStarRatingApi } from "api";

const StarRating = ({ myRating }) => {
  const stars = [1, 2, 3, 4, 5];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [point, setPoint] = useState("0");

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

  const handleStarClick = async (e, index) => {
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>별점 등록</h3>
        <div
          style={{
            display: "flex",
            width: "140px",
            padding: "20px 0 0",
            lineHeight: "27px",
          }}
        >
          {stars.map((star, i) => (
            <AiTwotoneStar
              key={star.toString()}
              className={clicked[i] ? "clickedstar" : null}
              onClick={(e) => handleStarClick(e, i)}
              size="27px"
              tabIndex="0"
              onKeyPress={(e) => handleStarClick(e, i)}
            />
          ))}
          <div style={{ marginLeft: "10px" }}>{point}</div>
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
