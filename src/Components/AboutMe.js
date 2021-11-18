import React from "react";
import styled from "styled-components";
import cupImg from "../images/table_cup.jpg";

const AboutMe = () => {
  return (
    <MeWrap>
      <MeTitle>ABOUT ME</MeTitle>
      <MeContentWrap>
        <MeContentItem>
          <p>안녕하세요! WOOJINLEEdev 의 홈페이지입니다.</p>
        </MeContentItem>
        <MeContentItem>
          <p>github :</p>
          <GitHubLink href="https://github.com/WOOJINLEEdev" target="_black">
            https://github.com/WOOJINLEEdev
          </GitHubLink>
        </MeContentItem>
        <MeContentItem center>
          <MeImage src={cupImg} alt="cup_image" />
        </MeContentItem>
      </MeContentWrap>
    </MeWrap>
  );
};

export default AboutMe;

const MeWrap = styled.div`
  padding: 30px 20px;
  height: 100%;
  min-height: 500px;
`;

const MeTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
`;

const MeContentWrap = styled.ul`
  padding: 15px 0;
`;

const MeContentItem = styled.li`
  display: flex;
  padding: 10px 0;
  font-size: 18px;
  color: #333;
  // justify-content: ${(props) => (props.center ? "center" : "")};

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const GitHubLink = styled.a`
  margin-left: 10px;
  color: #333;
  font-weight: bold;
`;

const MeImage = styled.img`
  width: 50%;
  height: 100%;
  min-height: 200px;
  max-height: 500px;
  border-radius: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`;
