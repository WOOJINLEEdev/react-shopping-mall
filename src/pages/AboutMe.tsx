import { useState, useEffect } from "react";
import styled from "styled-components";
import { ApexOptions } from "apexcharts";
import { ImGithub } from "@react-icons/all-files/im/ImGithub";
import { BsTriangleFill } from "@react-icons/all-files/bs/BsTriangleFill";

import useVisitCount from "hooks/api/useVisitCount";
import { formatDate } from "utils/date";

import Loading from "components/common/Loading";
import Chart from "components/common/Chart";
import { IDailyVisit } from "components/mypage/types";

const AboutMe = () => {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [yesterday, setYesterday] = useState(0);
  const [series, setSeries] = useState<ApexOptions["series"]>();
  const [options, setOptions] = useState<ApexOptions>();

  const now = new Date();
  const formattedToday = formatDate(now);
  const formattedYesterday = formatDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
  );

  const year = formatDate(now, "YYYY");
  const month = formatDate(now, "MM");

  const visitStartDate = "2021-12-01";
  const visitEndDate = formattedToday;

  const { data } = useVisitCount({
    visitStartDate,
    visitEndDate,
    division: "shop",
  });

  useEffect(() => {
    const visitDate: string[] = data.map(
      (item: IDailyVisit) => item.visit_date,
    );
    const visitCount: number[] = data.map(
      (item: IDailyVisit) => item.visit_count,
    );
    const sum = visitCount.reduce((a: number, b: number) => a + b);

    const todayVisit = data.find(
      (t: IDailyVisit) => t.visit_date === formattedToday,
    ) || {
      visit_count: 0,
    };
    const yesterdayVisit = data.find(
      (t: IDailyVisit) => t.visit_date === formattedYesterday,
    ) || {
      visit_count: 0,
    };

    setToday(todayVisit.visit_count);
    setYesterday(yesterdayVisit.visit_count);
    setTotal(sum);
    setSeries([
      {
        name: "방문 수",
        data: [...visitCount].reverse().slice(-7),
      },
    ]);

    setOptions({
      colors: ["#228B22", "#228B22"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          opacityFrom: 0.7,
          opacityTo: 0.9,
          colorStops: [
            { offset: 0, color: "#81c147", opacity: 1 },
            { offset: 100, color: "#008000", opacity: 1 },
          ],
        },
      },
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: string | number) {
          return val;
        },
        offsetY: -20,
        style: {
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: visitDate.slice(0, 7).reverse(),
        position: "bottom",
        labels: {
          show: true,
          formatter: function (val: string) {
            return val?.slice(-5);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        tickAmount: 5,
        max: 15,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val: number) {
            return String(val);
          },
        },
      },
      title: {
        text: `${year}년 ${month}월 방문자 현황`,
        floating: true,
        offsetY: 0,
        align: "center",
        style: {
          color: "#444",
        },
      },
    });
  }, []);

  if (!series || !options) {
    return <Loading />;
  }

  return (
    <MeWrap>
      <MeTitle>ABOUT ME</MeTitle>
      <MeContentWrap>
        <MeContentItem>
          <p>안녕하세요! WOOJINLEEdev 의 홈페이지입니다.</p>
        </MeContentItem>
        <MeContentItem>
          <ImGithub />
          <GitHubLink
            href="https://github.com/WOOJINLEEdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://github.com/WOOJINLEEdev
          </GitHubLink>
        </MeContentItem>
      </MeContentWrap>
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

      <ChartWrap>
        <Chart type="bar" series={series} options={options} chartHeight={350} />
      </ChartWrap>
    </MeWrap>
  );
};

export default AboutMe;

const MeWrap = styled.div`
  padding: 30px 20px;
  min-height: calc(100vh - 231px);
`;

const MeTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

const MeContentWrap = styled.ul`
  padding: 15px 0;
`;

const MeContentItem = styled.li`
  display: flex;
  padding: 10px 0;
  font-size: 18px;
  color: #333;

  svg {
    margin-right: 5px;
    fill: green;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
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
    width: calc(100% - 64px);
    padding: 20px 30px;
    margin-top: 0;
  }
`;

const VisitCountTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  font-size: 20px;
  font-weight: bold;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
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
    height: 80px;
    box-shadow: 3px 5px 10px -2px rgb(0 0 0 / 13%);
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
    width: 30%;
    height: 80px;
    max-width: 45%;
    box-shadow: 3px 5px 10px -2px rgb(0 0 0 / 13%);
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 100px;
  }
`;

const ListTitle = styled.div`
  color: #333;
  font-weight: bold;
  font-size: 13px;
`;

const ListItem = styled.div`
  position: relative;
  font-size: 25px;
  color: green;

  svg {
    position: absolute;
    width: 10px;
    height: 10px;
    line-height: 25px;
    top: 40%;
    left: 0;
    fill: rgb(0, 94, 150);
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 20px;
  }
`;

const ChartWrap = styled.div`
  padding: 20px 0;
  margin-top: 30px;
  border: 2px solid #d4d4d4;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  vertical-align: middle;
`;
