import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { instance } from "utils/http-client";
import Loading from "components/common/Loading";
import Chart from "components/common/Chart";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [year, month, day].join("-");
}

const MyPageChart = ({ userName }) => {
  const [series, setSeries] = useState();
  const [options, setOptions] = useState();

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  useEffect(() => {
    const now = new Date();

    const visitStartDate = formatDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)
    );
    const visitEndDate = formatDate(now);

    instance
      .get(
        `/v1/me/daily-visits?visit_start_date=${visitStartDate}&visit_end_date=${visitEndDate}`
      )
      .then(function (response) {
        const visitDate = response.data.map((item) => item.visit_date);
        const visitCount = response.data.map((item) => item.visit_count);

        setSeries([
          {
            name: "방문 수",
            data: visitCount.reverse(),
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
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: `${year}년 ${month}월 ${userName} 님의 방문 수`,
            align: "center",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: visitDate.slice(0, 7).reverse(),
            labels: {
              formatter: function (value) {
                return value?.substring(5);
              },
            },
          },
          markers: {
            size: 5,
            strokeColors: "#fff",
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            showNullDataPoints: true,
            hover: {
              size: 10,
              sizeOffset: 3,
            },
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!series || !options) {
    return <Loading />;
  }

  return (
    <ChartWrap>
      <Chart
        type={"line"}
        options={options}
        series={series}
        chartHeight={350}
      />
    </ChartWrap>
  );
};

export default MyPageChart;

const ChartWrap = styled.div`
  padding-top: 15px;
`;
