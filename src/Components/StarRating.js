import React, { useState, useEffect } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";

const StarRating = ({ myRating }) => {
  const stars = [1, 2, 3, 4, 5];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [point, setPoint] = useState("0");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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

    axios
      .put(
        "http://localhost:8282/v1/me/rating",
        {
          rating: point,
        },
        config
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <StarWrap>
      <div style={{ display: "flex" }}>
        <div
          style={{ display: "inline-block", width: "140px", padding: "5px" }}
        >
          {stars.map((star, i) => (
            <AiTwotoneStar
              key={i}
              onClick={(e) => handleStarClick(e, i)}
              className={clicked[i] ? "clickedstar" : null}
              size="27px"
            />
          ))}
        </div>
        <div style={{ lineHeight: "27px", padding: "5px" }}>{point}</div>
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
