import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { instance } from "../utils/http-client";

const MyPageChart = () => {
  const [series, setSeries] = useState();
  const [options, setOptions] = useState();

  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const yyyymm = [year + "-" + month];
  const yyyymmdd = [year + "-" + month + "-" + day];
  const firstDay = day - 6 < 10 ? "0" + (day - 6) : day - 6;

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
    const visitStartDate = `${yyyymm}-${firstDay}`;
    const visitEndDate = `${yyyymmdd}`;

    instance
      .get(
        `/v1/me/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
      )
      .then(function (response) {
        let visitCount =
          dateGain()
            .slice(-7)
            .map((v) => {
              const dailyVisit = response.data.find(
                (t) => t.visit_date === `2021-${v}`
              );
              if (dailyVisit) {
                return dailyVisit.visit_count;
              }

              return 0;
            }) || [];

        console.log("visitCount ", visitCount);

        setSeries([
          {
            name: "방문 수",
            data: visitCount,
          },
        ]);

        setOptions({
          colors: ["#228B22", "#228B22"],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: `${year}년 ${month}월 회원님의 방문 수`,
            align: "center",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: dateGain().slice(-7),
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!series || !options) {
    return <div>로딩중...</div>;
  }

  return (
    <ChartWrap>
      <Chart
        options={options}
        series={series}
        type="line"
        height={350}
        fill="green"
      />
    </ChartWrap>
  );
};

export default MyPageChart;

const ChartWrap = styled.div`
  padding-top: 15px;
`;
