import React, { useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import styled from "styled-components";

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

const StarRating = () => {
  const stars = [1, 2, 3, 4, 5];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [point, setPoint] = useState("0");

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

      <div class="star-rating">
        <input type="radio" id="5-stars" name="rating" value="5" />
        <label for="5-stars" class="star">
          &#9733;
        </label>
        <input type="radio" id="4-stars" name="rating" value="4" />
        <label for="4-stars" class="star">
          &#9733;
        </label>
        <input type="radio" id="3-stars" name="rating" value="3" />
        <label for="3-stars" class="star">
          &#9733;
        </label>
        <input type="radio" id="2-stars" name="rating" value="2" />
        <label for="2-stars" class="star">
          &#9733;
        </label>
        <input type="radio" id="1-star" name="rating" value="1" />
        <label for="1-star" class="star">
          &#9733;
        </label>
      </div>
    </StarWrap>
  );
};

export default StarRating;
