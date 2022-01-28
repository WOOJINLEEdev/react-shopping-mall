import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "components/common/Loading";
import Chart from "components/common/Chart";
import { formatDate } from "utils/formatDate";
import { getMyVisitCountApi } from "api";

const MyPageChart = ({ userName }) => {
  const [series, setSeries] = useState();
  const [options, setOptions] = useState();

  const date = new Date();
  const year = formatDate(date, "YYYY");
  const month = formatDate(date, "MM");

  useEffect(() => {
    const visitStartDate = formatDate(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6)
    );
    const visitEndDate = formatDate(date);

    async function getMyVisitCount() {
      try {
        const res = await getMyVisitCountApi({
          visitStartDate,
          visitEndDate,
        });
        const visitDate = res.data.map((item) => item.visit_date);
        const visitCount = res.data.map((item) => item.visit_count);

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
      } catch (err) {
        console.log(err);
      }
    }

    getMyVisitCount();
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
