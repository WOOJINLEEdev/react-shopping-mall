import React, { useState, useEffect } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import styled from "styled-components";
import { instance } from "../utils/http-client";

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

  const handleStarClick = (e, index) => {
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

    instance
      .put("/v1/me/rating", {
        rating: point,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              onClick={(e) => handleStarClick(e, i)}
              className={clicked[i] ? "clickedstar" : null}
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

  & div:hover svg {
    color: orange;
  }

  & svg:hover ~ svg {
    color: #c7c7c7;
  }

  .clickedstar {
    color: gold;
  }
`;
