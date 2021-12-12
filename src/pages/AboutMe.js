import { useState, useEffect } from "react";
import styled from "styled-components";
import { ImGithub } from "react-icons/im";
import { instance } from "utils/http-client";
import { BsTriangleFill } from "react-icons/bs";

const AboutMe = () => {
  const [total, setTotal] = useState();
  const [today, setToday] = useState();
  const [yesterday, setYesterday] = useState();

  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const yyyymm = [year + "-" + month];
  const yyyymmdd = [year + "-" + month + "-" + day];

  const dateGain = () => {
    const arr = [];
    for (let i = 1; i <= day; i++) {
      if (i < 10) {
        arr.push(month + "-" + 0 + i);
      }
      if (i >= 10) {
        arr.push(month + "-" + i);
      }
    }

    return arr;
  };

  useEffect(() => {
    dateGain();

    const visitStartDate = `${yyyymm}-01`;
    const visitEndDate = `${yyyymmdd}`;

    console.log("visitStart", visitStartDate);
    console.log("visitsEnd", visitEndDate);

    instance
      .get(
        `/v1/shop/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
      )
      .then(function (res) {
        let visitCount =
          dateGain()
            .slice(-7)
            .map((v) => {
              const dailyVisit = res.data.find(
                (t) => t.visit_date === `2021-${v}`
              );
              if (dailyVisit) {
                return dailyVisit.visit_count;
              }

              return 0;
            }) || [];

        console.log("visitCount ", visitCount);
        console.log("type ", typeof visitCount.slice(5, 6)[0]);

        setToday(visitCount.slice(6, 7));
        setYesterday(visitCount.slice(5, 6));

        const totalVisitCount = visitCount.reduce((a, b) => a + b, 0);
        setTotal(totalVisitCount);
      });
  }, []);

  return (
    <MeWrap>
      <MeTitle>ABOUT ME</MeTitle>
      <MeContentWrap>
        <MeContentItem>
          <p>안녕하세요! WOOJINLEEdev 의 홈페이지입니다.</p>
        </MeContentItem>
        <MeContentItem>
          <ImGithub />
          <GitHubLink href="https://github.com/WOOJINLEEdev" target="_blank">
            https://github.com/WOOJINLEEdev
          </GitHubLink>
        </MeContentItem>

        <VisitCountWrap>
          <VisitCountTitle>방문자 수</VisitCountTitle>

          <ListWrap>
            <TotalVisitCount>
              <ListTitle>총 방문자</ListTitle>
              <ListItem>{total}</ListItem>
            </TotalVisitCount>

            <Ul>
              <CountList>
                <ListTitle>오늘</ListTitle>
                <ListItem>
                  {today > 0 ? <BsTriangleFill /> : ""}
                  {today}
                </ListItem>
              </CountList>
              <CountList>
                <ListTitle>어제</ListTitle>
                <ListItem>
                  {yesterday > 0 ? <BsTriangleFill /> : ""}
                  {yesterday}
                </ListItem>
              </CountList>
            </Ul>
          </ListWrap>
        </VisitCountWrap>
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

  & svg {
    margin-right: 5px;
    fill: green;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const GitHubLink = styled.a`
  margin-left: 10px;
  color: #333;
  font-weight: bold;
`;

const VisitCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 64px);
  padding: 30px;
  border: 2px solid #d4d4d4;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin-top: 30px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 34px);
    padding: 15px;
  }
`;

const VisitCountTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  font-size: 20px;
  font-weight: bold;
`;

const ListWrap = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const TotalVisitCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
  max-width: 400px;
  height: 100px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #efefef;
  border-radius: 10px;
  box-shadow: 9px 10px 20px -5px rgb(0 0 0 / 13%);
  text-align: center;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 42px);
    max-width: calc(100% - 42px);
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 400px;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 50%;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
  }
`;

const CountList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
  max-width: 150px;
  height: 100px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #efefef;
  border-radius: 10px;
  box-shadow: 9px 10px 20px -5px rgb(0 0 0 / 13%);
  text-align: center;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 40%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 100px;
  }
`;

const ListTitle = styled.div`
  color: #333;
  font-weight: bold;
`;

const ListItem = styled.div`
  position: relative;
  font-size: 25px;
  color: green;

  & svg {
    position: absolute;
    width: 10px;
    height: 10px;
    line-height: 25px;
    top: 40%;
    left: 0;
    fill: rgb(0, 94, 150);
  }
`;
